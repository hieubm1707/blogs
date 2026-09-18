---
title: Json Web Token
date: 2026-09-18
---
### Access Token: 

* TTL: 15 minutes to 1 hours
* Client Storage: Memory or Cookie (HttpOnly)
* Store on Server: No (stateless)
* Revoke: Very Difficulty (Blacklist)

### Refresh Token

* TTL: 1 month or 1 year (Just only use 1)
* Client Storage: Cookie(HttpOnly)
* Store on Server: Yes (Stateful, Just store hash on DB/Redis)
* Revoke: Easy
