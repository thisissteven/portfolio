import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Head from "next/head";
import { PostMeta } from "pages/api/_types";
import Image from "next/image";
import YouTube from "@/components/Blog/Youtube";
import Copy from "@/components/Blog/Copy";
import { GetStaticPaths, GetStaticProps } from "next";
import { getPostFromSlug, getSlugs } from "pages/api/_getAllPosts";
import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import { MdAccessTime } from "react-icons/md";
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
			<h1>{post.meta.title}</h1>
			<div className="prose lg:prose-lg">
				<div className="flex justify-between text-primary items-end text-sm">
					<p className="flex flex-col">
						<span className="font-semibold">{post.meta.writer}</span>
						<span className="text-xs">{post.meta.date}</span>
					</p>
					<p className="flex items-center font-semibold">
						<MdAccessTime className="mr-1" />
						{post.meta.readingTime}
					</p>
				</div>
				<MDXRemote {...post.source} components={{ YouTube, Image, Copy }} />
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
