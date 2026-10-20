import { Sequelize } from "sequelize";
import DB from "../config/config.js";

const sequelize = new Sequelize(DB.DB_NAME, DB.DB_USER, DB.DB_PASSWORD, {
    host: DB.DB_HOST,
    port: DB.DB_PORT,
    dialect: "mysql",
});

try {
    await sequelize.authenticate();
    console.log("DB successfully connected");
} catch (err) {
    console.log("faild to connect to DB");
}

export { sequelize };
