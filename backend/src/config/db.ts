

import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import * as dotenv from 'dotenv';
import * as path from 'path';

//dotenv.config({ path: './config/.env' });
dotenv.config({ path: path.resolve(__dirname, './.env') });
const isTest: boolean = false;

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT as Dialect,
  database: process.env.DB_NAME!,
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT),  

  storage: isTest ? ':memory:' : undefined,
});

export { sequelize };