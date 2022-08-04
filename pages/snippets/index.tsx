import Seo from "@/components/Seo";
import { useLoaded } from "@/hooks/useLoaded";
import Link from "next/link";
import { getAllPosts } from "pages/api/_getAllPosts";
import { Post, PostMeta } from "pages/api/_types";

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
			<ul className="flex flex-col gap-4" data-fade="3">
				{posts?.map((post) => (
					<Link key={post.slug} href={`/snippets/${post.slug}`}>
						<a className="max-w-2xl hover:bg-primary/10 rounded-md p-4">
							<div className="flex flex-col mb-2">
								<span>{post.writer}</span>
								<span className="text-xs">{post.date}</span>
							</div>
							<h2 className="text-md font-semibold h3 mb-2">{post.title}</h2>
							<p className="p opacity-60">{post.excerpt}</p>
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
