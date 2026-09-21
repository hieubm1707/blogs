---
title: "[DART] Xây dựng bộ sinh mã QR chuyển khoản ngân hàng"
date: 2024-03-14
---
Tự viết trọn bộ thư viện sinh và đọc mã QR chuyển khoản theo chuẩn EMVCo / VietQR.
**Không dùng thư viện QR hay CRC của bên thứ ba, không gọi API ngoài** — toàn bộ thuật toán
dựng chuỗi và tính checksum đều tự code.

Những năng lực đạt được:

- **Sinh payload VietQR** từ mã BIN ngân hàng + số tài khoản, kèm số tiền và nội dung chuyển
  khoản tuỳ chọn.
- **Phân biệt QR một lần và QR tái sử dụng**: có số tiền → mã dùng một lần, không có số tiền →
  mã dùng lại nhiều lần.
- **Đọc ngược (parse) một mã QR có sẵn** để lấy ra ngân hàng, số tài khoản, số tiền, nội dung —
  kèm kiểm tra CRC để bắt mã hỏng hoặc bị sửa.
- **Hỗ trợ thêm VNPayQR** bên cạnh VietQR, dùng chung một bộ khung dựng field.
- **Tra cứu ngân hàng**: danh mục ngân hàng Việt Nam kèm mã BIN, mã định danh và deeplink mở
  app ngân hàng tương ứng.

---

## Luồng chạy: từ tham số đến chuỗi QR

```dart
final qr = QRPay.initVietQR(
  bankBin: '970415',
  bankNumber: '113366668888',
  amount: '500000',
  purpose: 'Thanh toan phi dich vu',
);
final payload = qr.build();
```

Hai bước này làm hai việc **hoàn toàn tách biệt**.

### Bước 1 — `initVietQR()`: chỉ cấu hình, chưa sinh ra gì

`initVietQR` **không tạo ra chuỗi QR nào cả**. Nó là một factory: tạo một object `QRPay` rỗng
rồi điền sẵn các hằng số đặc thù của VietQR vào, để `build()` sau này biết phải dựng theo
luật nào.

```dart
static QRPay initVietQR({
  required String bankBin,
  required String bankNumber,
  String? amount,
  String? purpose,
  String? service,
}) {
  final qr = QRPay();

  qr.provider.fieldId = FieldID.VIETQR;                         // '38'
  qr.initMethod = amount != null ? '12' : '11';                 // một lần / tái sử dụng
  qr.provider.guid = QRProviderGUID.VIETQR;                     // 'A000000727'
  qr.provider.name = QRProvider.VIETQR;
  qr.provider.service = service ?? VietQRService.BY_ACCOUNT_NUMBER; // 'QRIBFTTA'
  qr.consumer.bankBin = bankBin;
  qr.consumer.bankNumber = bankNumber;
  qr.amount = amount;
  qr.additionalData.purpose = purpose;
  return qr;
}
```

Bốn quyết định được chốt ở đây:

| Thứ được set | Giá trị | Ý nghĩa |
|---|---|---|
| `provider.fieldId` | `38` | Khối provider sẽ nằm ở field 38 (chỗ dành cho VietQR). VNPayQR thì là `26`. |
| `provider.guid` | `A000000727` | Định danh toàn cầu của VietQR, để app ngân hàng nhận ra đây là mã VietQR. |
| `provider.service` | `QRIBFTTA` | Dịch vụ NAPAS247 chuyển **đến tài khoản**. Chuyển đến thẻ thì là `QRIBFTTC`. |
| `initMethod` | `11` / `12` | `12` = QR động, quét xong là ra sẵn số tiền, dùng một lần. `11` = QR tĩnh, dán ở quầy, quét bao nhiêu lần cũng được. |

Sau bước này trong bộ nhớ mới chỉ có một object; chưa có ký tự nào của mã QR.

### Bước 2 — `build()`: tự tay ghép chuỗi, không qua thư viện

`build()` trả về **một chuỗi text**, không phải hình ảnh. Việc vẽ chuỗi đó thành ô vuông đen
trắng là của thư viện vẽ QR ở phía client (ví dụ `qr_flutter`) — bản thân package này không
đụng gì tới đồ hoạ.

Bên trong, `build()` làm đúng 3 việc:

1. Gọi `genFieldData` cho **từng trường một** để bọc nó thành khối TLV.
2. Nối các khối lại đúng thứ tự, rồi dán thêm `6304` vào đuôi.
3. Tính CRC của toàn bộ chuỗi vừa có và nối kết quả vào cuối.

---

## `genFieldData` được dùng khi nào

Đây là viên gạch duy nhất của cả hệ thống — **mọi trường, ở mọi tầng lồng nhau, đều đi qua nó**.

```dart
static String genFieldData(String? id, String? value) {
  final fieldId = id ?? '';
  final fieldValue = value ?? '';
  if (fieldId.length != 2 || fieldValue.isEmpty) return '';   // rỗng thì bỏ hẳn trường
  final fieldValueString = '00${fieldValue.length}';
  final length = fieldValueString.substring(fieldValueString.length - 2);
  return '$fieldId$length$fieldValue';
}
```

Nó nhận `(id, value)` và trả về một khối **TLV** — `<2 số ID><2 số độ dài><giá trị>`:

```
genFieldData('54', '500000')  ->  '54' + '06' + '500000'  ->  "5406500000"
                                   ID     len    value
```

Hai đặc tính quan trọng:

- **Giá trị rỗng thì trả về chuỗi rỗng**, tức là trường đó biến mất khỏi payload thay vì
  xuất hiện với độ dài 0. Nhờ vậy `build()` có thể gọi `genFieldData` cho cả những trường
  không dùng (tên merchant, thành phố, mã bưu chính, phí/tip...) mà payload vẫn sạch.
- **Gọi lồng nhau được**, vì đầu ra của nó cũng là chuỗi — đây là cách dựng các khối nhiều tầng.

Khối provider của VietQR chính là 3 tầng `genFieldData` lồng vào nhau:

```dart
final guid = QRPay.genFieldData(ProviderFieldID.GUID, this.provider.guid);          // 00 A000000727

final bankBin    = QRPay.genFieldData(VietQRConsumerFieldID.BANK_BIN, this.consumer.bankBin);
final bankNumber = QRPay.genFieldData(VietQRConsumerFieldID.BANK_NUMBER, this.consumer.bankNumber);
final provider   = QRPay.genFieldData(ProviderFieldID.DATA, bankBin + bankNumber);  // 01 { 00 bin, 01 stk }

final service  = QRPay.genFieldData(ProviderFieldID.SERVICE, this.provider.service);// 02 QRIBFTTA

final providerData = QRPay.genFieldData(
  this.provider.fieldId,                    // 38
  guid + provider + service,                // nội dung 3 khối con
);
```

Kết quả cho ví dụ ở trên:

```
0010A000000727 0126 0006970415 0112113366668888 0208QRIBFTTA
└ 00: GUID ──┘ └ 01: khối tài khoản ────────┘ └ 02: dịch vụ ┘

=> gói lại bằng field 38:
3856 0010A0000007270126000697041501121133666688880208QRIBFTTA
     └ 56 ký tự nội dung ────────────────────────────────────┘
```

---

## `content` được ghép theo nguyên tắc nào

```dart
final content =
    '$version$initMethod$providerData$currency$amountStr$nation$additionalData${FieldID.CRC}04';
final crc = QRPay.genCRCCode(content);
return content + crc;
```

Ba nguyên tắc chi phối dòng này:

**1. Các khối nối theo thứ tự ID tăng dần** — đúng quy định EMVCo. Đọc dọc biến là đọc dọc ID:

| Biến | ID | Giá trị | Vai trò |
|---|---|---|---|
| `version` | `00` | `01` | Phiên bản định dạng |
| `initMethod` | `01` | `11` / `12` | QR tĩnh hay động |
| `providerData` | `38` | khối lồng | VietQR: GUID + tài khoản + dịch vụ |
| `currency` | `53` | `704` | Mã tiền tệ VND theo ISO 4217 |
| `amountStr` | `54` | `500000` | Số tiền — rỗng nếu là QR tĩnh |
| `nation` | `58` | `VN` | Mã quốc gia |
| `additionalData` | `62` | khối lồng | Chứa nội dung chuyển khoản ở ID con `08` |
| `FieldID.CRC` | `63` | — | Bắt đầu trường checksum |

**2. Trường nào không có dữ liệu thì tự rụng.** Thực tế `build()` còn gọi `genFieldData` cho
`52` (category), `55`–`57` (tip/phí), `59` (merchant name), `60` (city), `61` (zip code).
Với luồng VietQR chuyển khoản thì các giá trị này đều null nên `genFieldData` trả về `''`,
nối vào chuỗi cũng như không. Vì vậy có thể rút gọn phần mô tả xuống còn 7 trường ở trên.

**3. `6304` được dán vào TRƯỚC khi tính CRC.** Đây là chỗ dễ sai nhất của chuẩn EMVCo:
checksum phải được tính trên chuỗi đã bao gồm cả ID `63` và độ dài `04` của chính trường CRC,
chỉ thiếu đúng 4 ký tự hex kết quả. Tính xong mới nối 4 ký tự đó vào đuôi:

```dart
static String genCRCCode(String content) {
  final crcCode = crc16ccitt(content).toRadixString(16).toUpperCase();
  return '0000$crcCode'.substring(crcCode.length);   // pad trái cho đủ 4 ký tự
}
```

`crc16ccitt` cũng tự code — CRC-16/CCITT-FALSE, khởi tạo `0xffff`, đa thức `0x1021`, chạy trên
byte UTF-8 của chuỗi, dùng bảng tra 256 phần tử viết sẵn trong source:

```dart
int crc16ccitt(String content) {
  final current = utf8.encode(content);
  var crc = 0xffff;
  for (var index = 0; index < current.length; index++) {
    crc = (table[((crc >> 8) ^ current[index]) & 0xff] ^ (crc << 8)) & 0xffff;
  }
  return crc;
}
```

Chiều ngược lại, `verifyCRC` cắt 4 ký tự cuối ra, tính lại CRC của phần còn lại rồi so sánh —
nhờ vậy `parse()` từ chối ngay một mã bị sửa hoặc quét lỗi.

### Kết quả cuối cùng

Với ví dụ đầu bài, `build()` trả về:

```
00020101021238560010A0000007270126000697041501121133666688880208QRIBFTTA5303704540650000058
02VN62260822Thanh toan phi dich vu630463EA
```

Tách ra cho dễ đọc:

```
0002 01                          version = 01
0102 12                          QR động (vì có số tiền)
3856 0010A000000727              GUID VietQR
     0126 0006970415             BIN ngân hàng
          0112113366668888       số tài khoản
     0208QRIBFTTA                NAPAS247 chuyển đến tài khoản
5303 704                         VND
5406 500000                      500.000đ
5802 VN                          Việt Nam
6226 0822Thanh toan phi dich vu  nội dung chuyển khoản
6304 63EA                        CRC-16/CCITT
```

Chuỗi này đưa vào thư viện vẽ QR là ra mã quét được bằng mọi app ngân hàng Việt Nam.

Thuật toán chạy ổn định từ khi viết xong, không phát sinh sửa lỗi; lần đụng tới duy nhất sau đó
(2024-07-03) chỉ là chuẩn hoá format theo monorepo, logic giữ nguyên.

`#backend` `#dart` `#flutter` `#vietqr` `#napas247` `#emvco` `#tlv` `#crc16` `#payment` `#fintech`
