import postRepo from "./post.repository.js";

async function createPost(title, content, userId) {
    return await postRepo.createPost(title, content, userId);
}

async function deletePost(id, userId) {
    const post = await postRepo.findPostById(id);

    if (!post) throw new Error("Post not found");

    if (post.userId !== userId)
        throw new Error("You are not authorized to delete this post.");

    return await postRepo.deletePost(id);
}

async function getAllPostsWithDetails() {
    const posts = await postRepo.findAllPostsWithDetails();

    return posts;
}

async function getAllPostsWithCommentCount() {
    const posts = await postRepo.findAllPostsWithCommentCount();

    return posts;
}

export default {
    createPost,
    deletePost,
    getAllPostsWithDetails,
    getAllPostsWithCommentCount,
};
