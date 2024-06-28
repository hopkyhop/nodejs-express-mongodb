import { UploadedFile } from "express-fileupload";
import Post from "./Post";
import FileService from "./fileService";
import { PostType } from "./types";

class PostsService {
  async create(post: PostType, picture: UploadedFile) {
    const fileName = FileService.saveFile(picture);
    if (!fileName) {
      throw new Error('Failed to save file');
    }
    const createdPost = await Post.create({ ...post, picture: fileName });
    return createdPost;
  }
  async getAll() {
    const posts = await Post.find();
    return posts;
  }
  async getOne(id: string) {
    if (!id) {
      throw new Error("Id not specified");
    }
    const post = await Post.findById(id);
    return post;
  }
  async update(post: PostType) {
    if (!post._id) {
      throw new Error("Id not specified");
    }
    const updatedPost = await Post.findByIdAndUpdate(post._id, post, {
      new: true,
    });
    return updatedPost;
  }
  async delete(id: string) {
    if (!id) {
      throw new Error("Id not specified");
    }
    const post = await Post.findByIdAndDelete(id);
    return post;
  }
}

export default new PostsService();
