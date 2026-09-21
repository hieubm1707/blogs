---
title: "[DART] Building a bank transfer QR code generator"
date: 2024-03-14
---
Wrote a complete library, from scratch, that generates and reads bank transfer QR codes followingthe EMVCo / VietQR standard. **\*\*It uses no third-party QR or CRC library and calls no external API.\*\***The string-building and checksum algorithms are all hand-written.
Capabilities delivered:
- **\*\*Generate a VietQR payload\*\*** from a bank BIN and an account number, with an optional amount and  transfer note.- **\*\*Distinguish one-time and reusable QR codes\*\***: with an amount, the code is one-time; without one,  it can be reused.- **\*\*Parse an existing QR code\*\*** back into bank, account number, amount and note, with a CRC check  that rejects corrupted or tampered codes.- **\*\*Support VNPayQR\*\*** alongside VietQR, sharing the same field-building core.- **\*\*Bank lookup\*\***: a catalogue of Vietnamese banks with BIN, bank code and a deeplink that opens  each bank's app.
---
**\## The flow: from parameters to QR string**
\`\`\`dartfinal qr = QRPay.initVietQR(  bankBin: '970415',  bankNumber: '113366668888',  amount: '500000',  purpose: 'Thanh toan phi dich vu',);final payload = qr.build();\`\`\`
These two steps do **\*\*two completely separate jobs\*\***.
**\### Step 1: \`initVietQR()\` configures the object and produces no output yet**
\`initVietQR\` **\*\*does not generate any QR string\*\***. It is a factory. It creates an empty \`QRPay\`object and fills in the VietQR-specific constants, so that \`build()\` later knows which rulesto follow.
\`\`\`dartstatic QRPay initVietQR({  required String bankBin,  required String bankNumber,  String? amount,  String? purpose,  String? service,}) {  final qr = QRPay();
  qr.provider.fieldId = FieldID.VIETQR;                         // '38'  qr.initMethod = amount != null ? '12' : '11';                 // one-time / reusable  qr.provider.guid = QRProviderGUID.VIETQR;                     // 'A000000727'  qr.provider.name = QRProvider.VIETQR;  qr.provider.service = service ?? VietQRService.BY_ACCOUNT_NUMBER; // 'QRIBFTTA'  qr.consumer.bankBin = bankBin;  qr.consumer.bankNumber = bankNumber;  qr.amount = amount;  qr.additionalData.purpose = purpose;  return qr;}\`\`\`
Four decisions are made here:
| What is set | Value | Meaning ||---|---|---|| \`provider.fieldId\` | \`38\` | The provider block goes in field 38, the slot reserved for VietQR. VNPayQR uses \`26\`. || \`provider.guid\` | \`A000000727\` | VietQR's global identifier, so banking apps recognise this as a VietQR code. || \`provider.service\` | \`QRIBFTTA\` | NAPAS247 transfer **\*\*to an account\*\***. Transfer to a card is \`QRIBFTTC\`. || \`initMethod\` | \`11\` / \`12\` | \`12\` = dynamic QR: the amount is pre-filled on scan and the code is used once. \`11\` = static QR: printed at a counter and scannable any number of times. |
After this step there is only an object in memory. Not a single character of the QR code exists yet.
**\### Step 2: \`build()\` assembles the string by hand, with no library**
\`build()\` returns **\*\*a text string, not an image\*\***. Turning that string into the black-and-whitesquare is the job of a QR rendering library on the client (for example \`qr_flutter\`). This packagedoes no graphics work at all.
Internally, \`build()\` does exactly three things:
1. Calls \`genFieldData\` for **\*\*each field\*\*** to wrap it in a TLV block.2. Concatenates the blocks in the right order, then appends \`6304\`.3. Computes the CRC of the whole string built so far and appends the result.
---
**\## When \`genFieldData\` is used**
\`genFieldData\` is the only building block in the system. \*\*Every field, at every nesting level,goes through it.\*\*
\`\`\`dartstatic String genFieldData(String? id, String? value) {  final fieldId = id ?? '';  final fieldValue = value ?? '';  if (fieldId.length != 2 || fieldValue.isEmpty) return '';   // empty value: drop the field  final fieldValueString = '00${fieldValue.length}';  final length = fieldValueString.substring(fieldValueString.length - 2);  return '$fieldId$length$fieldValue';}\`\`\`
It takes \`(id, value)\` and returns a **\*\*TLV\*\*** block: `<2-digit ID><2-digit length><value>\`:
\`\`\`genFieldData('54', '500000')  ->  '54' + '06' + '500000'  ->  "5406500000"                                   ID     len    value\`\``
Two properties matter:
- **\*\*An empty value returns an empty string\*\***, so the field disappears from the payload instead of  appearing with length 0. This lets \`build()\` call \`genFieldData\` even for unused fields  (merchant name, city, zip code, tip/fee...) and still produce a clean payload.- **\*\*Calls can be nested\*\***, because the output is itself a string. This is how multi-level blocks  are built.
VietQR's provider block is three levels of \`genFieldData\` nested inside each other:
\`\`\`dartfinal guid = QRPay.genFieldData(ProviderFieldID.GUID, this.provider.guid);          // 00 A000000727
final bankBin    = QRPay.genFieldData(VietQRConsumerFieldID.BANK_BIN, this.consumer.bankBin);final bankNumber = QRPay.genFieldData(VietQRConsumerFieldID.BANK_NUMBER, this.consumer.bankNumber);final provider   = QRPay.genFieldData(ProviderFieldID.DATA, bankBin + bankNumber);  // 01 { 00 bin, 01 account }
final service  = QRPay.genFieldData(ProviderFieldID.SERVICE, this.provider.service);// 02 QRIBFTTA
final providerData = QRPay.genFieldData(  this.provider.fieldId,                    // 38  guid + provider + service,                // content of the 3 child blocks);\`\`\`
Output for the example above:
\`\`\`0010A000000727 0126 0006970415 0112113366668888 0208QRIBFTTA└ 00: GUID ──┘ └ 01: account block ──────────┘ └ 02: service ┘
=> wrapped in field 38:3856 0010A0000007270126000697041501121133666688880208QRIBFTTA     └ 56 characters of content ─────────────────────────────┘\`\`\`
---
**\## How \`content\` is assembled**
\`\`\`dartfinal content =    '$version$initMethod$providerData$currency$amountStr$nation$additionalData${FieldID.CRC}04';final crc = QRPay.genCRCCode(content);return content + crc;\`\`\`
Three rules govern this line.
**\*\*1. Blocks are concatenated in ascending ID order\*\***, as EMVCo requires. Reading the variables leftto right is reading the IDs in order:
| Variable | ID | Value | Role ||---|---|---|---|| \`version\` | \`00\` | \`01\` | Payload format version || \`initMethod\` | \`01\` | \`11\` / \`12\` | Static or dynamic QR || \`providerData\` | \`38\` | nested block | VietQR: GUID + account + service || \`currency\` | \`53\` | \`704\` | VND, ISO 4217 currency code || \`amountStr\` | \`54\` | \`500000\` | Amount, empty for a static QR || \`nation\` | \`58\` | \`VN\` | Country code || \`additionalData\` | \`62\` | nested block | Holds the transfer note under child ID \`08\` || \`FieldID.CRC\` | \`63\` | n/a | Starts the checksum field |
**\*\*2. Fields with no data drop out on their own.\*\*** \`build()\` also calls \`genFieldData\` for \`52\`(category), \`55\`–\`57\` (tip/fee), \`59\` (merchant name), \`60\` (city) and \`61\` (zip code). In theVietQR account-transfer flow these values are all null, so \`genFieldData\` returns \`''\` and they addnothing to the string. That is why the description above can be reduced to the 7 fields listed.
**\*\*3. \`6304\` is appended BEFORE the CRC is computed.\*\*** This is the easiest part of EMVCo to getwrong. The checksum is computed over a string that already includes the CRC field's own ID \`63\` andlength \`04\`, and lacks only the 4 hex result characters. Those 4 characters are appended afterthe computation:
\`\`\`dartstatic String genCRCCode(String content) {  final crcCode = crc16ccitt(content).toRadixString(16).toUpperCase();  return '0000$crcCode'.substring(crcCode.length);   // left-pad to 4 characters}\`\`\`
\`crc16ccitt\` is also hand-written. It implements CRC-16/CCITT-FALSE (initial value \`0xffff\`,polynomial \`0x1021\`) over the UTF-8 bytes of the string, using a 256-entry lookup table writtenout in the source:
\`\`\`dartint crc16ccitt(String content) {  final current = utf8.encode(content);  var crc = 0xffff;  for (var index = 0; index < current.length; index++) {    crc = (table\[((crc >> 8) ^ current[index]) & 0xff] ^ (crc << 8)) & 0xffff;  }  return crc;}\`\`\`
In the other direction, \`verifyCRC\` strips the last 4 characters, recomputes the CRC of the restand compares the two. This is how \`parse()\` immediately rejects a tampered or misread code.
**\### Final result**
For the example at the top, \`build()\` returns:
\`\`\`00020101021238560010A0000007270126000697041501121133666688880208QRIBFTTA530370454065000005802VN62260822Thanh toan phi dich vu630463EA\`\`\`
Split up for readability:
\`\`\`0002 01                          version = 010102 12                          dynamic QR (an amount is present)3856 0010A000000727              VietQR GUID     0126 0006970415             bank BIN          0112113366668888       account number     0208QRIBFTTA                NAPAS247 transfer to account5303 704                         VND5406 500000                      500,000 VND5802 VN                          Vietnam6226 0822Thanh toan phi dich vu  transfer note6304 63EA                        CRC-16/CCITT\`\`\`
Feed this string into any QR rendering library and the resulting code can be scanned by everyVietnamese banking app.
The algorithm has been stable since it was written and has needed no bug fixes. The only laterchange (2024-07-03) reformatted the code to the monorepo's standard and left the logic untouched.
\`#backend\` \`#dart\` \`#flutter\` \`#vietqr\` \`#napas247\` \`#emvco\` \`#tlv\` \`#crc16\` \`#payment\` \`#fintech\`
