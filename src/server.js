import express from "express";
import { Post } from "./db/models/post.model.js";
import { User } from "./db/models/user.model.js";
import { Comment } from "./db/models/comment.model.js";
import { sequelize } from "./db/connection.js";
import { userRouter } from "./app/user/user.route.js";
import { postRouter } from "./app/post/post.route.js";
import { commentRouter } from "./app/comment/comment.route.js";
import { PORT } from "./config/config.js";
const app = express();

sequelize.sync();
app.use(express.json());

app.get("/health", (req, res) => {
    res.json("Hello");
});

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
