import path from "path";
import { config } from "dotenv";

const env = process.env.NODE_ENV || "development";

const envPath = `.env.${env}`;

config({ path: envPath });

export const PORT = process.env.PORT;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

export default { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME };
