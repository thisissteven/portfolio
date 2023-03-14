import useSWR from "swr";
import { PopulatedPost, PostMeta } from "@/lib/types";
import * as React from "react";
import { Metrics } from "pages/api/postsMetrics";

const API_URL = `/api/postsMetrics`;

async function getPostMetrics(type: string): Promise<Metrics> {
  const res = await fetch(API_URL + `?type=${type}`);
  if (!res.ok) {
    throw new Error("An error occurred while fetching the data.");
  }
  return res.json();
}

export const usePopulatedPosts = (posts: PostMeta[], type: string) => {
  // const { data: metrics, error } = useSWR<Metrics>([API_URL, type], () => getPostMetrics(type), {
  // 	dedupingInterval: 1000,
  // 	refreshInterval: 1000,
  // });

  const populatedPosts = React.useMemo(() => {
    const result = posts.reduce((result: PopulatedPost[], post) => {
      // if (metrics && post.slug in metrics) {
      // 	const { views, likes } = metrics[post.slug];
      // 	result.push({ ...post, views, likes });
      // } else {
      result.push({ ...post, views: 0, likes: 0 });
      // }
      return result;
    }, []);

    return result;
    //   }, [metrics]);
  }, [posts]);

  return {
    // populatedPosts,
    // isLoading: !error && !metrics,
    // isError: !!error,
    populatedPosts,
    isLoading: false,
    isError: false,
  };
};
