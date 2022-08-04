import Seo from "@/components/Seo";
import { useLoaded } from "@/hooks/useLoaded";
import Link from "next/link";
import { getAllPosts } from "pages/api/_getAllPosts";
import { Post, PostMeta } from "pages/api/_types";
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
};

export type Tags = keyof typeof tags;

export default function Snippets({ posts }: { posts: PostMeta[] }) {
	const isLoaded = useLoaded();
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
			<ul className="flex gap-2 flex-wrap" data-fade="3">
				{posts?.map((post) => (
					<Link key={post.slug} href={`/snippets/${post.slug}`}>
						<a className="hover:bg-primary/10 rounded-md p-4 card">
							<h2 className="font-semibold text-xl mb-2">{post.title}</h2>
							<ul className="flex gap-2 text-lg items-center mb-2">
								{post.tags.map((tag: Tags) => (
									<li key={tag} className="">
										{tags[tag]}
									</li>
								))}
							</ul>
							<p className="p text-sm opacity-60">{post.excerpt}</p>
						</a>
					</Link>
				))}
			</ul>
		</div>
	);
}

export async function getStaticProps() {
	const data = getAllPosts("snippets");
	const posts = data.slice(0, 9).map((post: Post) => post.meta);
	return { props: { posts } };
}
