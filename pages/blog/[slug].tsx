import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { PostMeta } from "pages/api/_types";
import Image from "next/image";
import YouTube from "@/components/Blog/Youtube";
import Copy from "@/components/Blog/Copy";
import CloudinaryImage from "@/components/CloudinaryImage";
import { GetStaticPaths, GetStaticProps } from "next";
import { getPostFromSlug, getSlugs } from "pages/api/_getAllPosts";
import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import { MdAccessTime } from "react-icons/md";
import "highlight.js/styles/atom-one-dark.css";
import { useLoaded } from "@/hooks/useLoaded";
import Seo from "@/components/Seo";
import { updatePostViews, useMetrics } from "@/hooks/metrics/useMetrics";
import { useRouter } from "next/router";
import * as React from "react";
import { PostMetrics } from "@/components/Metrics/PostMetrics";
import Heart from "@/components/Metrics/Heart";

interface MDXPost {
	source: MDXRemoteSerializeResult<Record<string, unknown>>;
	meta: PostMeta;
}

export default function BlogPage({ post }: { post: MDXPost }) {
	const isLoaded = useLoaded();

	const router = useRouter();
	const slug = router.asPath.split("/").slice(1).join("_");

	const { metrics, isLoading } = useMetrics(slug);

	React.useEffect(() => {
		updatePostViews(slug);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Seo title={post.meta.title} description={post.meta.excerpt} />
			<div className={`${isLoaded ? "fade-in-start" : "opacity-0"}`}>
				<h1 data-fade="0" className="max-w-[65ch] mb-1">
					{post.meta.title}
				</h1>
				<p data-fade="1" className="text-primary/70 max-w-[65ch] mb-2">
					{post.meta.excerpt}
				</p>
				<PostMetrics size="lg" likes={metrics?.likes} views={metrics?.views} isLoading={isLoading} />
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
				<div className="prose lg:prose-lg" data-fade="3">
					<MDXRemote {...post.source} components={{ YouTube, Image, Copy, CloudinaryImage }} />
				</div>
			</div>
			<Heart slug={slug} />
		</>
	);
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug } = params as { slug: string };
	const { content, meta } = getPostFromSlug(slug, "blog");
	const mdxSource = await serialize(content, {
		mdxOptions: {
			rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }], rehypeHighlight],
		},
	});

	return { props: { post: { source: mdxSource, meta } } };
};

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = getSlugs("blog").map((slug) => ({ params: { slug } }));

	return {
		paths,
		fallback: false,
	};
};
