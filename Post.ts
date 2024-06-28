import mongoose from "mongoose";
import { PostType } from "./types";

//схема Post
const Post = new mongoose.Schema<PostType>({
  author: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  picture: { type: String },
});

export default mongoose.model("Post", Post);

