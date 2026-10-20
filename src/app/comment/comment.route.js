import { Router } from "express";
import commentController from "./comment.controller.js";

const commentRouter = Router();

commentRouter.post("/", commentController.createManyComments);
commentRouter.patch("/:id", commentController.updateCommentById);
commentRouter.post("/find-or-create", commentController.findOrCreateComment);
commentRouter.get("/search", commentController.searchCommentsByContent);
commentRouter.get("/newest/:id", commentController.getNewestCommentsByPostId);
commentRouter.get("/details/:id", commentController.getCommentDetailsWithPostInfoById);

export { commentRouter };
