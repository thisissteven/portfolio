// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import path from "path";
import fs from "fs";
import { sync } from "glob";
import matter from "gray-matter";
import { Post } from "./_types";

const POSTS_PATH = path.join(process.cwd(), "/src/posts");

export const getSlugs = (): string[] => {
	const files = fs.readdirSync(POSTS_PATH);

	return files.reduce((slugs: string[], file) => {
		const [slug, _ext] = file.split(".");
		if (_ext === "mdx") {
			slugs.push(slug);
		}
		return slugs;
	}, []);
};

export const getPostFromSlug = (slug: string): Post => {
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
			date: (data?.date ?? new Date()).toString(),
		},
	};
};

const getAllPosts = () => {
	const posts = getSlugs()
		.map((slug) => getPostFromSlug(slug))
		.sort((a, b) => {
			if (a.meta.date > b.meta.date) return 1;
			if (a.meta.date < b.meta.date) return -1;
			return 0;
		})
		.reverse();
	return posts;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	// console.log(req.method);
	try {
		const posts = getAllPosts();
		res.json({ posts });
	} catch (err) {
		console.log(err);
		res.json({ status: 200 });
	}
}
