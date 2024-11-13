# Changelog

## 7.x

- breaking: Support only `Node >= 10`
- fix: `acquire` not resolving after destroying available resources

## 6.0.0

- change: `destory` (and `destoryAllNow`) are async now, they wait for `factory.destory`

## 5.0.0

- Typescript conversion. API is unchanged.

## 4.0.0

- Flow typed code. API is unchanged.

## v3.1.0

- added `maxUses` options [#18](https://github.com/sequelize/sequelize-pool/pull/18)
