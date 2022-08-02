import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Head from "next/head";
import { PostMeta } from "pages/api/_types";
import Image from "next/image";
import YouTube from "@/components/Blog/Youtube";
import { GetStaticPaths, GetStaticProps } from "next";
import { getPostFromSlug, getSlugs } from "pages/api/_getAllPosts";
import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";

interface MDXPost {
	source: MDXRemoteSerializeResult<Record<string, unknown>>;
	meta: PostMeta;
}

export default function BlogPage({ post }: { post: MDXPost }) {
	return (
		<>
			<Head>
				<title>{post.meta.title}</title>
			</Head>
			<h1 className="mb-8">{post.meta.title}</h1>
			<div className="prose lg:prose-lg">
				<MDXRemote {...post.source} components={{ YouTube, Image }} />
			</div>
		</>
	);
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug } = params as { slug: string };
	const { content, meta } = getPostFromSlug(slug);
	const mdxSource = await serialize(content, {
		mdxOptions: {
			rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }], rehypeHighlight],
		},
	});

	return { props: { post: { source: mdxSource, meta } } };
};

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = getSlugs().map((slug) => ({ params: { slug } }));

	return {
		paths,
		fallback: false,
	};
};
