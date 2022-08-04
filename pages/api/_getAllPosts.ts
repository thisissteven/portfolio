import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { Post } from "./_types";
import readingTime from "reading-time";
import dayjs from "dayjs";

export const getSlugs = (type: "blog" | "projects" | "snippets"): string[] => {
	const POSTS_PATH = path.join(process.cwd(), `/src/contents/${type}`);
	const files = fs.readdirSync(POSTS_PATH);

	return files.reduce((slugs: string[], file) => {
		const [slug, _ext] = file.split(".");
		if (_ext === "mdx") {
			slugs.push(slug);
		}
		return slugs;
	}, []);
};

const convertDate = (date: any) => {
	return dayjs(date).format("MMMM D, YYYY");
};

export const getPostFromSlug = (slug: string, type: "blog" | "projects" | "snippets"): Post => {
	const POSTS_PATH = path.join(process.cwd(), `/src/contents/${type}`);
	const postPath = path.join(POSTS_PATH, `${slug}.mdx`);
	const source = fs.readFileSync(postPath);
	const { content, data } = matter(source);

	return {
		content,
		meta: {
			slug,
			excerpt: data?.excerpt ?? "",
			title: data?.title ?? slug,
			tags: (data?.tags ?? []).sort(),
			date: convertDate(data?.date ?? new Date()),
			writer: data?.writer ?? "Steven",
			original: data?.original ?? null,
			readingTime: readingTime(source as unknown as string).text,
		},
	};
};

export const getAllPosts = (type: "blog" | "projects" | "snippets") => {
	const posts = getSlugs(type)
		.map((slug) => getPostFromSlug(slug, type))
		.sort((a, b) => {
			if (a.meta.date > b.meta.date) return 1;
			if (a.meta.date < b.meta.date) return -1;
			return 0;
		})
		.reverse();
	return posts;
};
