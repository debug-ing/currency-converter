import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

export const DB_CONFIG: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.HOST,
  port: Number(process.env.PORT),
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  autoLoadEntities: true,
};
