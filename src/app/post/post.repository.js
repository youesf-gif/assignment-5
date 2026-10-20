import { sequelize } from "../../db/connection.js";
import { Comment } from "../../db/models/comment.model.js";
import { Post } from "../../db/models/post.model.js";
import { User } from "../../db/models/user.model.js";

async function findPostById(id) {
    const post = await Post.findByPk(id);
    return post;
}

async function createPost(title, content, userId) {
    const post = new Post({ title, content, userId });

    return await post.save();
}

async function deletePost(id) {
    return await Post.destroy({ where: { id: id } });
}

async function findAllPostsWithDetails() {
    const postsWithDetails = await Post.findAll({
        attributes: ["id", "title"],
        include: [
            { model: User, attributes: ["id", "name"] },
            { model: Comment, attributes: ["id", "content"] },
        ],
    });

    return postsWithDetails;
}

async function findAllPostsWithCommentCount() {
    const postsWithCommentCount = await Post.findAll({
        attributes: [
            "id",
            "title",
            [
                sequelize.fn("COUNT", sequelize.col("comments.id")),
                "commentCount",
            ],
        ],
        include: { model: Comment, attributes: [] },
        group: ["post.id", "post.title"],
    });

    return postsWithCommentCount;
}

sequelize.fn();

export default {
    findPostById,
    createPost,
    deletePost,
    findAllPostsWithDetails,
    findAllPostsWithCommentCount,
};
