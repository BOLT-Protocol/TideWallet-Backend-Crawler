# TideWallet-Backend-Crawler
Blockchain Crawler and parser manager for TideWallet

## Set Config

```
// copy sample config to private folder(if not exist, create it)
cp default.config.toml ./private/config.toml

// set your env
vi ./private/config.toml
```

* if you want to use btc mainnet crawler
```
// if you want to use btc mainnet crawler
[blockchain]
type = 'bitcoin_mainnet'

[database]
dbName = "bitcoin_mainnet"
// ...
```
## Run Crawler
```
cd /path/to/TideWallet-Backend-Crawler
npm install
pm2 start . -n TideWallet-Crawler
```
