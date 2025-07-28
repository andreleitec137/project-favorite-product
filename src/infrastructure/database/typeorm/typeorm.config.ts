import { DataSource, DataSourceOptions } from 'typeorm';

import { env } from 'src/config/env';

const config: DataSourceOptions = {
  type: 'postgres',
  url: env.DATABASE_URL,
  synchronize: false,
  logging: true,
  entities: [],
  migrations: ['src/infrastructure/database/typeorm/**/migrations/*.ts'],
};

export default new DataSource(config);
