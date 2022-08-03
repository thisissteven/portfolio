import Seo from "@/components/Seo";
import { useLoaded } from "@/hooks/useLoaded";
import Link from "next/link";
import { getAllPosts } from "pages/api/_getAllPosts";
import { Post, PostMeta } from "pages/api/_types";

export default function Blog({ posts }: { posts: PostMeta[] }) {
	const isLoaded = useLoaded();
	return (
		<div className={`${isLoaded && "fade-in-start"}`}>
			<Seo title="Blog" description="Things I learned in my journey of developing web applications" />
			<h1 className="mb-4" data-fade="1">
				Blog
			</h1>
			<ul className="flex flex-col gap-4" data-fade="2">
				{posts?.map((post) => (
					<Link key={post.slug} href={`/blog/${post.slug}`}>
						<a className="max-w-2xl hover:bg-primary/10 rounded-md p-4">
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
	const data = getAllPosts();
	const posts = data.slice(0, 9).map((post: Post) => post.meta);
	return { props: { posts } };
}
