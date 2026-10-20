import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: "hashed_password",
            validate: {
                checkPasswordLength(value) {
                    if (value.length <= 6)
                        throw new Error(
                            "The password length less than 6 characters",
                        );
                },
            },
        },
        role: {
            type: DataTypes.ENUM("user", "admin"),
            allowNull: false,
        },
    },
    {
        hooks: {
            beforeCreate: (user) => {
                if (user.name.length <= 2) {
                    throw new Error(
                        "The name of the user must be greater than 2 characters",
                    );
                }
            },
        },
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
);

export { User };
