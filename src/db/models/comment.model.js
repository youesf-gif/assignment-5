import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";
import { User } from "./user.model.js";
import { Post } from "./post.model.js";

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
);

Comment.belongsTo(User, {
    foreignKey: {
        name: "userId",
        allowNull: false,
    },
    as: "user",
});
User.hasMany(Comment, {
    foreignKey: {
        name: "userId",
        allowNull: false,
    },
});
Comment.belongsTo(Post, {
    foreignKey: {
        name: "postId",
        allowNull: false,
    },
    as: "post",
});
Post.hasMany(Comment, {
    foreignKey: {
        name: "postId",
        allowNull: false,
    },
});

export { Comment };
