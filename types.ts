export type PostType = {
  _id?: string;
  author: string;
  title: string;
  content: string;
  picture?: string;
};

export interface ErrorResponse {
  error: string;
}