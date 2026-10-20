import postService from "./post.service.js";

async function createPost(req, res, next) {
    try {
        const { title, content, userId } = req.body;

        await postService.createPost(title, content, userId);
        res.status(201).json({ message: "Post created successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

async function deletePost(req, res, next) {
    try {
        const { userId } = req.body;
        const { id } = req.params;

        await postService.deletePost(id, userId);

        res.json({ message: "Post deleted." });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

async function getAllPostsWithDetails(req, res, next) {
    try {
        const data = await postService.getAllPostsWithDetails();

        res.json({
            message: "Posts with details retrieved successfully",
            data,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

async function getAllPostsWithCommentCount(req, res, next) {
    try {
        const data = await postService.getAllPostsWithCommentCount();

        res.json({
            message: "Posts with details retrieved successfully",
            data,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default {
    createPost,
    deletePost,
    getAllPostsWithDetails,
    getAllPostsWithCommentCount,
};
