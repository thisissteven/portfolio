import { Tags } from "pages/snippets";

export type Post = {
  content: string;
  meta: PostMeta;
};

export type PostMeta = {
  excerpt: string;
  slug: string;
  title: string;
  tags: Tags[];
  date: string;
  writer: string;
  readingTime: string;
  original: string | null;
  isPublished: boolean;
};

export type PopulatedPost = {
  likes: number | string;
  views: number | string;
} & PostMeta;
