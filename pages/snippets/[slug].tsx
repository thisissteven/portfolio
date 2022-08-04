import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { PostMeta } from "pages/api/_types";
import Image from "next/image";
import YouTube from "@/components/Blog/Youtube";
import CloudinaryImage from "@/components/CloudinaryImage";
import Copy from "@/components/Blog/Copy";
import { GetStaticPaths, GetStaticProps } from "next";
import { getPostFromSlug, getSlugs } from "pages/api/_getAllPosts";
import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import { MdAccessTime } from "react-icons/md";
import "highlight.js/styles/atom-one-dark.css";
import Seo from "@/components/Seo";
import { useLoaded } from "@/hooks/useLoaded";

interface MDXPost {
	source: MDXRemoteSerializeResult<Record<string, unknown>>;
	meta: PostMeta;
}

export default function SnippetsPage({ post }: { post: MDXPost }) {
	const isLoaded = useLoaded();
	return (
		<div className={`${isLoaded ? "fade-in-start" : "opacity-0"}`}>
			<Seo title={post.meta.title} description={post.meta.excerpt} />
			<h1 data-fade="1">{post.meta.title}</h1>
			<div className="flex justify-between">
				<div className="prose lg:prose-lg">
					<div className="flex justify-between text-primary items-end text-sm" data-fade="2">
						<p className="flex flex-col">
							{post.meta.original ? (
								<a
									target="_blank"
									rel="noopener noreferrer"
									className="link font-semibold no-underline"
									href={post.meta.original}
								>
									{post.meta.writer}
								</a>
							) : (
								<span className="font-semibold">{post.meta.writer}</span>
							)}

							<span className="text-xs">{post.meta.date}</span>
						</p>
						<p className="flex items-center font-semibold">
							<MdAccessTime className="mr-1" />
							{post.meta.readingTime}
						</p>
					</div>
				</div>
				{/* <div className="h-52 max-w-xs bg-yellow-200 w-full sticky top-[8rem]"></div> */}
			</div>
			<div className="prose lg:prose-lg" data-fade="4">
				<MDXRemote {...post.source} components={{ YouTube, Image, Copy, CloudinaryImage }} />
			</div>
		</div>
	);
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug } = params as { slug: string };
	const { content, meta } = getPostFromSlug(slug, "snippets");
	const mdxSource = await serialize(content, {
		mdxOptions: {
			rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }], rehypeHighlight],
		},
	});

	return { props: { post: { source: mdxSource, meta } } };
};

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = getSlugs("snippets").map((slug) => ({ params: { slug } }));

	return {
		paths,
		fallback: false,
	};
};
