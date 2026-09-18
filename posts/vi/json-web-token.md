---
title: JSON Web Token
date: 2026-09-18
---
### Access Token

* TTL (thời gian sống): 15 phút đến 1 giờ
* Lưu ở client: bộ nhớ (memory) hoặc cookie (HttpOnly)
* Lưu trên server: Không (stateless)
* Thu hồi (revoke): Rất khó (phải dùng blacklist)

### Refresh Token

* TTL: 1 tháng hoặc 1 năm (mỗi token chỉ dùng một lần)
* Lưu ở client: cookie (HttpOnly)
* Lưu trên server: Có (stateful, chỉ lưu bản hash trong DB/Redis)
* Thu hồi (revoke): Dễ
