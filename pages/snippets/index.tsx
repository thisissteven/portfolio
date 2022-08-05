import { PostMetrics } from "@/components/Metrics/PostMetrics";
import Seo from "@/components/Seo";
import { usePopulatedPosts } from "@/hooks/metrics/usePopulatedPosts";
import { useLoaded } from "@/hooks/useLoaded";
import Link from "next/link";
import { getAllPosts } from "pages/api/_getAllPosts";
import { PopulatedPost, Post, PostMeta } from "pages/api/_types";

import {
	SiJavascript,
	SiNextdotjs,
	SiReact,
	SiTailwindcss,
	SiTypescript,
	SiMarkdown,
	SiStrapi,
	SiSocketdotio,
	SiChakraui,
	SiFirebase,
	SiCss3,
} from "react-icons/si";

export const tags = {
	nextjs: <SiNextdotjs />,
	react: <SiReact />,
	tailwind: <SiTailwindcss />,
	javascript: <SiJavascript />,
	typescript: <SiTypescript />,
	mdx: <SiMarkdown />,
	socketio: <SiSocketdotio />,
	strapi: <SiStrapi />,
	chakraui: <SiChakraui />,
	firebase: <SiFirebase />,
	css: <SiCss3 />,
};

export type Tags = keyof typeof tags;

export default function Snippets({ posts }: { posts: PostMeta[] }) {
	const isLoaded = useLoaded();

	const { populatedPosts: snippets, isLoading } = usePopulatedPosts(posts, "snippets");
	return (
		<div className={`${isLoaded ? "fade-in-start" : "opacity-0"}`}>
			<Seo
				title="Snippets"
				description="Collection of Code snippets that I have used in the past, some written by other devs."
			/>
			<h1 className="mb-2" data-fade="1">
				Snippets ✏️
			</h1>
			<p className="mb-4" data-fade="2">
				Collection of code snippets that I have used in the past, some written by other devs.
			</p>
			<div className="grid gap-2 card-wrapper-mobile xs:card-wrapper" data-fade="3">
				{snippets?.map((snippet) => (
					<Link key={snippet.slug} href={`/snippets/${snippet.slug}`}>
						<a className="hover:bg-primary/10 rounded-md p-4">
							<h2 className="font-semibold text-xl mb-2">{snippet.title}</h2>
							<div className="flex gap-2 items-center mb-2">
								<PostMetrics size="sm" likes={snippet.likes} views={snippet.views} isLoading={isLoading} />
								<span className="text-sm">•</span>
								<ul className="flex gap-2 text-lg items-center">
									{snippet.tags.map((tag: Tags) => (
										<li key={tag} className="">
											{tags[tag]}
										</li>
									))}
								</ul>
							</div>
							<p className="p text-sm opacity-60">{snippet.excerpt}</p>
						</a>
					</Link>
				))}
			</div>
		</div>
	);
}

export async function getStaticProps() {
	const data = getAllPosts("snippets");
	const posts = data.slice(0, 9).map((post: Post) => post.meta);
	return { props: { posts } };
}
