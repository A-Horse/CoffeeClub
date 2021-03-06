var AeroMapSetting = {
  development: true,
  port: 5000,
  host: '0.0.0.0',
  backend: 'https://0.0.0.0:5000',
  https: true,
  https_options: {
    port: 5000
  },
  log_level: 'debug',
  db: {
    production: {
      database: 'coffee',
      host: 'localhost',
      port: 'default',
      username: 'coffee',
      passwd: 'coffee',
      charset: 'UTF-8'
    },
    development: {
      database: 'coffee',
      host: 'localhost',
      port: 'default',
      username: 'coffee',
      passwd: 'coffee',
      charset: 'UTF-8'
    }
  },
  redis_session: {
    host: '0.0.0.0',
    port: 6379
  },
  redis: {
    host: '0.0.0.0',
    port: 6379
  },
};

module.exports = AeroMapSetting;
