---
title: Xây dựng bộ sinh mã QR chuyển khoản ngân hàng sử dụng TypeScript
date: 2026-08-31
---
Trong đợt chuyển backend từ Dart sang TypeScript, [bộ sinh mã QR chuyển khoản](https://hieubm.netlify.app/vi/posts/dart-building-a-bank-transfer-qr-code-generator) được viết lại
nguyên vẹn về mặt hành vi và gắn thẳng vào nghiệp vụ hoá đơn dịch vụ.

Những việc đạt được:

* **Rút gọn đúng phạm vi đang dùng**: chỉ giữ nhánh VietQR chuyển khoản theo số tài khoản,
  bỏ qua VNPayQR và các trường merchant không dùng tới.
* **Có test tự động** cho payload builder.
* **Nối vào nghiệp vụ hoá đơn**: từ một hoá đơn dịch vụ, hệ thống tự dựng mã QR đúng số tiền và
  đúng nội dung chuyển khoản để cư dân quét thanh toán; thiếu ngân hàng hoặc số tài khoản thì
  trả lỗi thiếu tham số thay vì sinh ra mã sai.

Toàn bộ khung payload sau khi port:

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

Bảng CRC nay được dựng runtime thay vì hard-code:

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

Điểm nối vào hoá đơn:

```ts
return buildVietQr({ bankBin: bankId, bankNumber, amount, purpose });
```

## Ví dụ

### 1. QR động — có số tiền, dùng một lần

```ts
const payload = buildVietQr({
  bankBin: '970415',
  bankNumber: '113366668888',
  amount: '500000',
  purpose: 'Thanh toan phi dich vu',
});
```

Kết quả:

```
00020101021238560010A0000007270126000697041501121133666688880208QRIBFTTA530370454065000005802VN62260822Thanh toan phi dich vu630463EA
```

### 2. QR tĩnh — không có số tiền, dùng lại nhiều lần

```ts
const payload = buildVietQr({
  bankBin: '970415',
  bankNumber: '113366668888',
});
```

Kết quả:

```
00020101021138560010A0000007270126000697041501121133666688880208QRIBFTTA53037045802VN6304F443
```

### 3. Sinh QR từ hoá đơn

Service nhận body theo tên trường của API rồi chuyển sang `buildVietQr`:

```ts
billService.appQr({
  bank_id: '970415',
  bank_number: '113366668888',
  amount: '500000',
  purpose: 'Thanh toan phi dich vu',
});
// => '000201010212...630463EA'
```

Thiếu ngân hàng hoặc số tài khoản thì dừng ngay, không sinh ra mã sai:

```ts
billService.appQr({ bank_number: '113366668888', amount: '500000' });
// => throw new SystemCodeError(systemCode.missingParams)
```

`#backend` `#typescript` `#nodejs` `#express` `#sequelize` `#vietqr` `#napas247` `#emvco`
`#crc16` `#payment` `#migration`
