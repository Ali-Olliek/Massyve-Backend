import dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  mode: 'development' | 'production';
  port: number;
  dbConnectionString: string;
  logLevel: 'debug' | 'error';
}

const ENV = process.env.NODE_ENV || 'development';

const config: { [key: string]: IConfig } = {
  development: {
    mode: 'development',
    port: 3000,
    dbConnectionString: process.env.DB_CONNECTION_STRING as string,
    logLevel: 'debug',
  },
  production: {
    mode: 'production',
    port: parseInt(process.env.PORT || '3000', 10),
    dbConnectionString: process.env.DB_CONNECTION_STRING || '',
    logLevel: 'error',
  },
};

const selectedConfig: IConfig = config[ENV];

export default selectedConfig;
