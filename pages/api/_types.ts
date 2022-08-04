export type Post = {
	content: string;
	meta: PostMeta;
};

export type PostMeta = {
	excerpt: string;
	slug: string;
	title: string;
	tags: string[];
	date: string;
	writer: string;
	readingTime: string;
	original: string | null;
};
