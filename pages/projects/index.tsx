import Seo from "@/components/Seo";
import { useLoaded } from "@/hooks/useLoaded";
import Link from "next/link";
import { getAllPosts } from "pages/api/_getAllPosts";
import { Post, PostMeta } from "pages/api/_types";
import { tags, Tags } from "pages/snippets";

export default function Projects({ posts }: { posts: PostMeta[] }) {
	const isLoaded = useLoaded();
	return (
		<div className={`${isLoaded ? "fade-in-start" : "opacity-0"}`}>
			<Seo title="Projects" description="Side projects I made throughout my learning process." />
			<h1 className="mb-2" data-fade="1">
				Projects 🏆
			</h1>
			<p className="mb-4" data-fade="2">
				Side projects I made throughout my learning process.
			</p>
			<ul className="flex flex-col gap-4" data-fade="3">
				{posts?.map((post) => (
					<Link key={post.slug} href={`/projects/${post.slug}`}>
						<a className="max-w-2xl hover:bg-primary/10 rounded-md p-4">
							<h2 className="text-md font-semibold h3 mb-2">{post.title}</h2>
							<ul className="flex gap-3 text-lg items-center my-2">
								{post.tags.map((tag: Tags) => (
									<li key={tag} className="">
										{tags[tag]}
									</li>
								))}
							</ul>
							<p className="p opacity-60">{post.excerpt}</p>
						</a>
					</Link>
				))}
			</ul>
		</div>
	);
}

export async function getStaticProps() {
	const data = getAllPosts("projects");
	const posts = data.slice(0, 9).map((post: Post) => post.meta);
	return { props: { posts } };
}
