import Link from "next/link";
import { Post, PostMeta } from "pages/api/_types";

export default function Blog({ posts }: { posts: PostMeta[] }) {
	return (
		<>
			<h1>Articles</h1>
			<ul className="flex flex-col gap-4">
				{posts?.map((post) => (
					<Link key={post.slug} href={`/blog/${post.slug}`}>
						<a className="text-md font-semibold p">{post.slug}</a>
					</Link>
				))}
			</ul>
		</>
	);
}

export async function getStaticProps() {
	const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getAllPosts`);
	let { posts } = await data.json();
	posts = posts.slice(0, 9).map((post: Post) => post.meta);
	return { props: { posts } };
}
