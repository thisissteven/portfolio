import { PostMetrics } from "@/components/Metrics/PostMetrics";
import Seo from "@/components/Seo";
import { usePopulatedPosts } from "@/hooks/metrics/usePopulatedPosts";
import { useLoaded } from "@/hooks/useLoaded";
import Link from "next/link";
import { getAllPosts } from "@/lib/getAllPosts";
import { Post, PostMeta } from "@/lib/types";
import { tags, Tags } from "pages/snippets";

export default function Projects({ posts }: { posts: PostMeta[] }) {
  const isLoaded = useLoaded();

  const { populatedPosts: projects, isLoading } = usePopulatedPosts(posts, "projects");
  return (
    <>
      <Seo title="Projects" description="Side projects I made throughout my learning process." />
      <div className={`${isLoaded ? "fade-in-start" : "opacity-0"}`}>
        <h1 className="mb-2" data-fade="1">
          Projects 🎓
        </h1>
        <p className="mb-4" data-fade="2">
          Showcase of my experiences throughout my learning process.
        </p>
        <ul className="flex flex-col gap-4" data-fade="3">
          {projects?.map((post) => (
            <Link key={post.slug} href={`/projects/${post.slug}`}>
              <a className="max-w-2xl hover:bg-primary/10 rounded-md p-4">
                <h2 className="text-md font-semibold h3 mb-3">{post.title}</h2>
                <div className="flex gap-2 justify-between items-center mb-3">
                  <ul className="flex gap-3 text-lg sm:text-xl items-center">
                    {post.tags.map((tag: Tags) => (
                      <li key={tag} className="">
                        {tags[tag]}
                      </li>
                    ))}
                  </ul>
                  {/* <PostMetrics size="lg" likes={post.likes} views={post.views} isLoading={isLoading} /> */}
                </div>
                <p className="p opacity-60">{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const data = getAllPosts("projects");
  const posts = data.slice(0, 9).map((post: Post) => post.meta);
  return { props: { posts } };
}
