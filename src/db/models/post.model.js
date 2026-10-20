import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";
import { User } from "./user.model.js";

class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        modelName: "Post",
        sequelize,
        paranoid: true,
        timestamps: true,
        deletedAt: "deleted_at",
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
);

Post.belongsTo(User, {
    onDelete: "CASCADE",
    foreignKey: {
        name: "userId",
        allowNull: false,
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

User.hasMany(Post, {
    foreignKey: {
        name: "userId",
        allowNull: false,
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

export { Post };
