import Post from "./Post";
import { Request, Response } from "express";
import { ErrorResponse, PostType } from "./types";
import PostService from "./PostService";
import { UploadedFile } from "express-fileupload";
class PostController {
  async create(
    req: Request<{}, {}, PostType>,
    res: Response<PostType | ErrorResponse>
  ) {
    try {
      const { body, files } = req;
      if (!files || !files.picture) {
        return res.status(400).json({ error: "No picture uploaded" });
      }
      const post = await PostService.create(
        body,
        files.picture as UploadedFile
      );
      res.status(200).json(post);
    } catch (e) {
      if (e instanceof Error) {
        return res.status(500).json({ error: e.message });
      } else {
        return res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  async getAll(req: Request, res: Response<PostType[] | ErrorResponse>) {
    try {
      const posts = await PostService.getAll();
      return res.json(posts);
    } catch (e) {
      if (e instanceof Error) {
        return res.status(500).json({ error: e.message });
      } else {
        return res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }
  async getOne(
    req: Request<{ id: string }>,
    res: Response<PostType | ErrorResponse>
  ) {
    try {
      const post = await PostService.getOne(req.params.id);
      if (post) {
        return res.json(post);
      } else {
        return res.status(404).json({ error: "Post not found" });
      }
    } catch (e) {
      if (e instanceof Error) {
        return res.status(500).json({ error: e.message });
      } else {
        return res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  async update(
    req: Request<{}, {}, PostType>,
    res: Response<PostType | ErrorResponse>
  ) {
    try {
      const updatedPost = await PostService.update(req.body);
      if (updatedPost) {
        return res.json(updatedPost);
      } else {
        return res.status(404).json({ error: "Post not found" });
      }
    } catch (e) {
      if (e instanceof Error) {
        return res.status(500).json({ error: e.message });
      } else {
        return res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

  async delete(
    req: Request<{ id: string }>,
    res: Response<PostType | ErrorResponse>
  ) {
    try {
      const post = await PostService.delete(req.params.id);
      if (post) {
        return res.json(post);
      } else {
        return res.status(404).json({ error: "Post not found" });
      }
    } catch (e) {
      if (e instanceof Error) {
        return res.status(500).json({ error: e.message });
      } else {
        return res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }
}

export default new PostController();
