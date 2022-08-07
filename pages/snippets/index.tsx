import { PostMetrics } from "@/components/Metrics/PostMetrics";
import Seo from "@/components/Seo";
import { usePopulatedPosts } from "@/hooks/metrics/usePopulatedPosts";
import { useLoaded } from "@/hooks/useLoaded";
import Link from "next/link";
import { getAllPosts } from "@/lib/getAllPosts";
import { Post, PostMeta } from "@/lib/types";
import * as React from "react";

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
	SiPrisma,
} from "react-icons/si";
import SearchFilter from "@/components/SearchFilter";
import SortListBox from "@/components/SortListBox";

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
	prisma: <SiPrisma />,
	swr: (
		<svg height="12" viewBox="0 0 291 69" fill="none">
			<path
				d="M0 36.53c.07 17.6 14.4 32.01 32.01 32.01a32.05 32.05 0 0032.01-32V32a13.2 13.2 0 0123.4-8.31h20.7A32.07 32.07 0 0077.2 0a32.05 32.05 0 00-32 32.01v4.52A13.2 13.2 0 0132 49.71a13.2 13.2 0 01-13.18-13.18 3.77 3.77 0 00-3.77-3.77H3.76A3.77 3.77 0 000 36.53zM122.49 68.54a32.14 32.14 0 01-30.89-23.7h20.67a13.16 13.16 0 0023.4-8.3V32A32.05 32.05 0 01167.68 0c17.43 0 31.64 14 32 31.33l.1 5.2a13.2 13.2 0 0023.4 8.31h20.7a32.07 32.07 0 01-30.91 23.7c-17.61 0-31.94-14.42-32.01-32l-.1-4.7v-.2a13.2 13.2 0 00-13.18-12.81 13.2 13.2 0 00-13.18 13.18v4.52a32.05 32.05 0 01-32.01 32.01zM247.94 23.7a13.16 13.16 0 0123.4 8.31 3.77 3.77 0 003.77 3.77h11.3a3.77 3.77 0 003.76-3.77A32.05 32.05 0 00258.16 0a32.07 32.07 0 00-30.92 23.7h20.7z"
				fill="currentColor"
			></path>
		</svg>
	),
};

export type Tags = keyof typeof tags;

export default function Snippets({ posts }: { posts: PostMeta[] }) {
	const isLoaded = useLoaded();

	const { populatedPosts: snippets, isLoading } = usePopulatedPosts(posts, "snippets");

	const [filtered, setFiltered] = React.useState(() => snippets);
	const [selected, setSelected] = React.useState(() => "Sort by name");

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
			<div className="mb-4 relative z-10 flex flex-col" data-fade="2">
				<SearchFilter setFiltered={setFiltered} populatedPosts={snippets} selected={selected} />
				<SortListBox selected={selected} setSelected={setSelected} />
			</div>
			<div className="grid gap-2 card-wrapper-mobile xs:card-wrapper" data-fade="3">
				{filtered?.map((snippet) => (
					<Link key={snippet.slug} href={`/snippets/${snippet.slug}`}>
						<a className="hover:bg-primary/10 rounded-md p-4">
							<h2 className="font-semibold text-xl mb-2">{snippet.title}</h2>
							<div className="flex gap-2 justify-between items-center mb-2">
								<ul className="flex gap-2 text-lg items-center">
									{snippet.tags.map((tag: Tags) => (
										<li key={tag} className="">
											{tags[tag]}
										</li>
									))}
								</ul>
								<PostMetrics size="sm" likes={snippet.likes} views={snippet.views} isLoading={isLoading} />
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
