const ecrequest = require('ecrequest');
const { v4: uuidv4 } = require('uuid');
const { default: BigNumber } = require('bignumber.js');
const Bot = require('./Bot');
const Utils = require('./Utils');

// crawler
const BtcCrawlerManager = require('./BtcCrawlerManager');
const BtcTestnetCrawlerManager = require('./BtcTestnetCrawlerManager');
const BchCrawlerManager = require('./BchCrawlerManager');
const BchTestnetCrawlerManager = require('./BchTestnetCrawlerManager');
const EthCrawlerManager = require('./EthCrawlerManager');
const EthRopstenCrawlerManager = require('./EthRopstenCrawlerManager');
const CfcCrawlerManager = require('./CfcCrawlerManager');
const TtnCrawlerManager = require('./TtnCrawlerManager');
const TtCrawlerManager = require('./TtCrawlerManager');

// parser
const BtcParserManager = require('./BtcParserManager');
const BtcTestnetParserManager = require('./BtcTestnetParserManager');
const BchParserManager = require('./BchParserManager');
const BchTestnetParserManager = require('./BchTestnetParserManager');
const EthParserManager = require('./EthParserManager');
const EthRopstenParserManager = require('./EthRopstenParserManager');
const CfcParserManager = require('./CfcParserManager');
const TtnParserManager = require('./TtnParserManager');
const TtParserManager = require('./TtParserManager');

class Manager extends Bot {
  constructor() {
    super();
    this.name = 'Manager';
    this._crawlerManagers = [];
  }

  init({
    config, database, logger, i18n,
  }) {
    return super
      .init({
        config,
        database,
        logger,
        i18n,
      })
      .then(() => {
        this._crawlerManagers = this.createManager();

        this.fiatCurrencyRateModel = this.database.db.FiatCurrencyRate;
        this.currencyModel = this.database.db.Currency;

        return this;
      });
  }

  start() {
    return super.start().then(() => {
      this.initManager();
      return this;
    });
  }

  createManager() {
    this.logger.log('createManager');
    const result = [];
    const { type } = this.config.blockchain;

    /**
     * 'bitcoin_mainnet',
     * 'bitcoin_testnet',
     * 'bitcoin_cash_mainnet',
     * 'bitcoin_cash_testnet',
     * 'ethereum_mainnet',
     * 'ethereum_ropsten',
     * 'cafeca'
     * 'titan'
     * 'tidetime'
     */
    this.logger.log(type);
    switch (type) {
      case 'bitcoin_mainnet':
        result.push(
          new BtcCrawlerManager(
            this.config,
            this.database.db,
            this.logger,
          ),
        );
        result.push(
          new BtcParserManager(
            this.config,
            this.database.db,
            this.logger,
          ),
        );
        break;
      case 'bitcoin_testnet':
        result.push(
          new BtcTestnetCrawlerManager(
            this.config,
            this.database.db,
            this.logger,
          ),
        );
        result.push(
          new BtcTestnetParserManager(
            this.config,
            this.database.db,
            this.logger,
          ),
        );
        break;
      case 'bitcoin_cash_mainnet':
        result.push(
          new BchCrawlerManager(
            this.config,
            this.database.db,
            this.logger,
          ),
        );
        result.push(
          new BchParserManager(
            this.config,
            this.database.db,
            this.logger,
          ),
        );
        break;
      case 'bitcoin_cash_testnet':
        result.push(
          new BchTestnetCrawlerManager(
            this.config,
            this.database.db,
            this.logger,
          ),
        );
        result.push(
          new BchTestnetParserManager(
            this.config,
            this.database.db,
            this.logger,
          ),
        );
        break;
      case 'ethereum_mainnet':
        result.push(
          new EthCrawlerManager(
            this.config,
            this.database.db,
            this.logger,
          ),
        );
        result.push(
          new EthParserManager(
            this.config,
            this.database.db,
            this.logger,
          ),
        );
        break;
      case 'ethereum_ropsten':
        result.push(
          new EthRopstenCrawlerManager(
            this.config,
            this.database.db,
            this.logger,
          ),
        );
        result.push(
          new EthRopstenParserManager(
            this.config,
            this.database.db,
            this.logger,
          ),
        );
        break;
      case 'cafeca':
        result.push(
          new CfcCrawlerManager(
            this.config,
            this.database.db,
            this.logger,
          ),
        );
        result.push(
          new CfcParserManager(
            this.config,
            this.database.db,
            this.logger,
          ),
        );
        break;
      // temp remove
      // case 'titan':
      //   result.push(
      //     new TtnCrawlerManager(
      //       this.config,
      //       this.database.db,
      //       this.logger,
      //     ),
      //   );
      //   result.push(
      //     new TtnParserManager(
      //       this.config,
      //       this.database.db,
      //       this.logger,
      //     ),
      //   );
      //   break;
      case 'tidetime':
        result.push(
          new TtCrawlerManager(
            this.config,
            this.database.db,
            this.logger,
          ),
        );
        result.push(
          new TtParserManager(
            this.config,
            this.database.db,
            this.logger,
          ),
        );
        break;
      default:
    }
    return result;
  }

  initManager() {
    this._crawlerManagers.forEach((manager) => {
      manager.init();
    });
  }
}

module.exports = Manager;
