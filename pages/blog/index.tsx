import Seo from "@/components/Seo";
import { useLoaded } from "@/hooks/useLoaded";
import Link from "next/link";
import { getAllPosts } from "pages/api/_getAllPosts";
import { Post, PostMeta } from "pages/api/_types";
import { tags, Tags } from "pages/snippets";

export default function Blog({ posts }: { posts: PostMeta[] }) {
	const isLoaded = useLoaded();
	return (
		<div className={`${isLoaded ? "fade-in-start" : "opacity-0"}`}>
			<Seo
				title="Blog"
				description="Collection of blog posts that I read from time to time, some written by other devs."
			/>
			<h1 className="mb-2" data-fade="1">
				Blog 📪
			</h1>
			<p className="mb-4" data-fade="2">
				Collection of blog posts that I read from time to time, some written by other devs.
			</p>
			<ul className="flex flex-col gap-4" data-fade="3">
				{posts?.map((post) => (
					<Link key={post.slug} href={`/blog/${post.slug}`}>
						<a className="max-w-2xl hover:bg-primary/10 rounded-md p-4">
							<div className="flex justify-between items-center">
								<div className="flex flex-col mb-2">
									<span>{post.writer}</span>
									<span className="text-xs">{post.date}</span>
								</div>
								<ul className="flex gap-3 text-lg items-center mb-2">
									{post.tags.map((tag: Tags) => (
										<li key={tag} className="">
											{tags[tag]}
										</li>
									))}
								</ul>
							</div>
							<h2 className="font-semibold text-xl mb-1">{post.title}</h2>
							<p className="text-sm opacity-60">{post.excerpt}</p>
						</a>
					</Link>
				))}
			</ul>
		</div>
	);
}

export async function getStaticProps() {
	const data = getAllPosts("blog");
	const posts = data.slice(0, 9).map((post: Post) => post.meta);
	return { props: { posts } };
}
