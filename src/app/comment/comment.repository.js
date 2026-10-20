import { Op } from "sequelize";
import { Comment } from "../../db/models/comment.model.js";
import { User } from "../../db/models/user.model.js";
import { Post } from "../../db/models/post.model.js";

async function bulkCreateComments(comments) {
    return await Comment.bulkCreate(comments, { validate: true });
}

async function getCommentById(commentId) {
    return await Comment.findByPk(commentId);
}

async function updateCommentById(commentId, content) {
    const result = await Comment.update(
        { content },
        { where: { id: commentId } },
    );
    console.log("Update result:", result);
    return result;
}

async function findOrCreateComment(content, userId, postId) {
    const [comment, created] = await Comment.findOrCreate({
        where: { content, userId, postId },
        defaults: { content, userId, postId },
    });

    return { comment, created };
}

async function searchCommentsByContent(word) {
    const { count, rows: comments } = await Comment.findAndCountAll({
        where: {
            content: {
                [Op.like]: `%${word}%`,
            },
        },
    });
    return { count, comments };
}

async function getNewestCommentsByPostId(postId, limit = 3) {
    const comments = await Comment.findAll({
        where: {
            postId,
        },
        attributes: ["id", "content", "created_at"],
        order: [["created_at", "DESC"]],
        limit,
    });
    return comments;
}

async function getCommentDetailsWithPostInfoById(commentId) {
    const comment = await Comment.findByPk(commentId, {
        attributes: ["id", "content"],
        include: [
            {
                model: User,
                as: "user",
                attributes: ["id", "name", "email"],
            },
            { model: Post, as: "post", attributes: ["id", "title", "content"] },
        ],
    });
    
    return comment;
}

export default {
    bulkCreateComments,
    getCommentById,
    updateCommentById,
    findOrCreateComment,
    searchCommentsByContent,
    getNewestCommentsByPostId,
    getCommentDetailsWithPostInfoById,
};
