---
title: Building a bank transfer QR code generator with TypeScript
date: 2026-08-31
---
During the backend migration from Dart to TypeScript, [the bank transfer QR generator](https://hieubm.netlify.app/posts/dart-building-a-bank-transfer-qr-code-generator) was rewritten
with identical behaviour and wired directly into the service billing flow.

What was achieved:

* **Scoped to what is actually used**: only the VietQR transfer-to-account branch was kept.
  VNPayQR and the unused merchant fields were dropped.
* **Automated tests** for the payload builder.
* **Wired into billing**: from a service bill, the system builds a QR code with the exact amount
  and transfer note for the resident to scan and pay. If the bank or account number is missing,
  it returns a missing-parameter error instead of generating a wrong code.
---
The full payload builder after the port:

```ts
export const buildVietQr = ({ bankBin, bankNumber, amount, purpose }: {
  bankBin: string; bankNumber: string; amount?: string; purpose?: string;
}): string => {
  const providerData =
    field(PROVIDER.guid, VIETQR_GUID) +
    field(PROVIDER.data,
      field(CONSUMER.bankBin, bankBin) + field(CONSUMER.bankNumber, bankNumber)) +
    field(PROVIDER.service, SERVICE_BY_ACCOUNT_NUMBER);

  const content =
    field(FIELD.version, '01') +
    field(FIELD.initMethod, amount ? '12' : '11') +
    field(FIELD.vietQr, providerData) +
    field(FIELD.currency, '704') +
    field(FIELD.amount, amount) +
    field(FIELD.nation, 'VN') +
    field(FIELD.additionalData, field(ADDITIONAL.purpose, purpose)) +
    `${FIELD.crc}04`;

  return content + crcCode(content);
};
```

The CRC table is now built at runtime instead of being hard-coded:

```ts
const CRC_TABLE = (() => {
  const table = new Uint16Array(256);
  for (let index = 0; index < 256; index += 1) {
    let value = index << 8;
    for (let bit = 0; bit < 8; bit += 1) {
      value = (value & 0x8000 ? (value << 1) ^ 0x1021 : value << 1) & 0xffff;
    }
    table[index] = value;
  }
  return table;
})();
```

The hook into billing:

```ts
return buildVietQr({ bankBin: bankId, bankNumber, amount, purpose });
```

## Examples

### 1. Dynamic QR — with an amount, used once

```ts
const payload = buildVietQr({
  bankBin: '970415',
  bankNumber: '113366668888',
  amount: '500000',
  purpose: 'Thanh toan phi dich vu',
});
```

Output:

```
00020101021238560010A0000007270126000697041501121133666688880208QRIBFTTA530370454065000005802VN62260822Thanh toan phi dich vu630463EA
```

### 2. Static QR — no amount, reusable

```ts
const payload = buildVietQr({
  bankBin: '970415',
  bankNumber: '113366668888',
});
```

Output:

```
00020101021138560010A0000007270126000697041501121133666688880208QRIBFTTA53037045802VN6304F443
```

### 3. Generating a QR from a bill

The service takes a body using the API's field names and passes it to `buildVietQr`:

```ts
billService.appQr({
  bank_id: '970415',
  bank_number: '113366668888',
  amount: '500000',
  purpose: 'Thanh toan phi dich vu',
});
// => '000201010212...630463EA'
```

If the bank or account number is missing, it stops immediately instead of generating a wrong code:

```ts
billService.appQr({ bank_number: '113366668888', amount: '500000' });
// => throw new SystemCodeError(systemCode.missingParams)
```

`#backend` `#typescript` `#nodejs` `#express` `#sequelize` `#vietqr` `#napas247` `#emvco`
`#crc16` `#payment` `#migration`
