import commentRepo from "./comment.repository.js";

async function createManyComments(comments) {
    if (!Array.isArray(comments) || comments.length === 0) {
        throw new Error("Please provide a non-empty array of comments");
    }
    await commentRepo.bulkCreateComments(comments);
}

async function updateCommentById(commentId, userId, content) {
    const comment = await commentRepo.getCommentById(commentId);
    if (!comment) {
        throw new Error("Comment not found");
    }

    if (comment.userId !== userId) {
        throw new Error("You are not authorized to update this comment");
    }
    return await commentRepo.updateCommentById(commentId, content);
}

async function findOrCreateComment(content, userId, postId) {
    const post = await commentRepo.findOrCreateComment(content, userId, postId);
    return post;
}

async function searchCommentsByContent(word) {
    const CommentsByContent = await commentRepo.searchCommentsByContent(word);

    if (!CommentsByContent.comments || CommentsByContent.comments.length === 0)
        throw new Error("No comments found");

    return CommentsByContent;
}

async function getNewestCommentsByPostId(postId, limit = 3) {
    const comments = await commentRepo.getNewestCommentsByPostId(postId, limit);
    return comments;
}

async function getCommentDetailsWithPostInfoById(commentId) {
    const comment =
        await commentRepo.getCommentDetailsWithPostInfoById(commentId);

    if (!comment) throw new Error("Comment not found");

    return comment;
}

export default {
    createManyComments,
    updateCommentById,
    findOrCreateComment,
    searchCommentsByContent,
    getNewestCommentsByPostId,
    getCommentDetailsWithPostInfoById,
};
