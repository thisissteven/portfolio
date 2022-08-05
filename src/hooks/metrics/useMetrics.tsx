import useSWR from "swr";

type Metrics = {
	likes: string | number;
	views: string | number;
};

const API_URL = `/api/postsMetrics`;
const VIEWS_API_URL = `/api/views`;

async function getPostMetrics(slug: string): Promise<Metrics> {
	const res = await fetch(API_URL + `/${slug}`);
	if (!res.ok) {
		throw new Error("An error occurred while fetching the data.");
	}
	return res.json();
}

export async function updatePostViews(slug: string): Promise<number> {
	const res = await fetch(VIEWS_API_URL + `/${slug}`, { method: "POST" });
	if (!res.ok) {
		throw new Error("An error occurred while posting the data.");
	}
	return res.json();
}

export const useMetrics = (slug: string) => {
	const { data: metrics, error } = useSWR<Metrics>(slug, () => getPostMetrics(slug), {
		dedupingInterval: 1000,
		refreshInterval: 1000,
	});

	return {
		metrics,
		isLoading: !error && !metrics,
		isError: !!error,
	};
};
