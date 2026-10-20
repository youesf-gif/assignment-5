import commentService from "./comment.service.js";

async function createManyComments(req, res, next) {
    try {
        const comments = req.body;

        await commentService.createManyComments(comments);

        res.status(201).json({ message: "Comments created." });
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error);
    }
}

async function updateCommentById(req, res, next) {
    try {
        const { id } = req.params;
        const { userId, content } = req.body;

        await commentService.updateCommentById(id, userId, content);

        res.status(200).json({ message: "Comment updated." });
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error);
    }
}

async function findOrCreateComment(req, res, next) {
    try {
        const { content, userId, postId } = req.body;
        const data = await commentService.findOrCreateComment(
            content,
            userId,
            postId,
        );
        res.status(200).json({
            message: "Comment found or created successfully.",
            data,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function searchCommentsByContent(req, res, next) {
    try {
        const { word } = req.query;
        const comments = await commentService.searchCommentsByContent(word);
        res.status(200).json({
            message: "Comments found successfully.",
            data: comments,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function getNewestCommentsByPostId(req, res, next) {
    try {
        const { id } = req.params;
        const { limit } = req.query;
        const comments = await commentService.getNewestCommentsByPostId(
            id,
            limit,
        );
        res.status(200).json({
            message: "Newest comments found successfully.",
            data: comments,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function getCommentDetailsWithPostInfoById(req, res, next) {
    try {
        const { id } = req.params;
        const comment = await commentService.getCommentDetailsWithPostInfoById(id);
        res.status(200).json({
            message: "Comment details found successfully.",
            data: comment,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export default {
    createManyComments,
    updateCommentById,
    findOrCreateComment,
    searchCommentsByContent,
    getNewestCommentsByPostId,
    getCommentDetailsWithPostInfoById,
};
