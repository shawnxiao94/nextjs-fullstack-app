export interface CommentItem {
  id: string;
  contain: string;
  postId: string;
  authorId: string;
  created_time: string;
  updated_time: string;
}
export interface PostItem {
  id: string;
  title: string;
  authorId: string;
  published: boolean;
  comments?: CommentItem[];
  created_time: string;
  updated_time: string;
}

export interface User {
  id?: string;
  email: string;
  name?: string;
  password: string;
  posts?: PostItem[];
  comments?: CommentItem[];
}

export interface TodoItem {
  id: number;
  content: string;
  complete: boolean;
}
