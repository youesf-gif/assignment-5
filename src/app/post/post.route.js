import { Router } from "express";
import postController from "./post.controller.js";

const postRouter = Router();

postRouter.post("/", postController.createPost);
postRouter.delete("/:id", postController.deletePost);
postRouter.get("/details", postController.getAllPostsWithDetails);
postRouter.get("/comment-count", postController.getAllPostsWithCommentCount);

export { postRouter };
