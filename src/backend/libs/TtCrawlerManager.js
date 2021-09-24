const EthCrawlerManagerBase = require('./EthCrawlerManagerBase');

class TtCrawlerManager extends EthCrawlerManagerBase {
  constructor(config, database, logger) {
    super('80001F51', database, logger);
    this.options = config.blockchain.tidetime;
    this.syncInterval = config.syncInterval.titan ? config.syncInterval.titan : 1500;
    this.feeSyncInterval = config.syncInterval.fee ? config.syncInterval.fee : 3600000;
    this.pendingTxSyncInterval = config.syncInterval.titan ? config.syncInterval.titan : 1500;
  }
}

module.exports = TtCrawlerManager;
