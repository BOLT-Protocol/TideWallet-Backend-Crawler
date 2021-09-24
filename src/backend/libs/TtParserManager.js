const EthParserManagerBase = require('./EthParserManagerBase');

class TtParserManager extends EthParserManagerBase {
  constructor(config, database, logger) {
    super('80001F51', config, database, logger);

    this.options = config.blockchain.tidetime;
    this.syncInterval = config.syncInterval.titan ? config.syncInterval.titan : 1500;
  }

  async init() {
    await super.init();
  }
}

module.exports = TtParserManager;
