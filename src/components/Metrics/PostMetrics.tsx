// import { usePollIfInView } from "@/hooks/usePollIfInView";
import { usePostLikes } from "@/hooks/metrics/usePostLikes";
import { usePostViews } from "@/hooks/metrics/usePostViews";
import { IoMdEye } from "react-icons/io";
import { FaHeartbeat } from "react-icons/fa";
import React from "react";
import { CgSpinnerAlt } from "react-icons/cg";

export const PostMetrics = ({ slug, increment }: { slug: string; increment?: boolean }) => {
	const interval = 5000;
	// const { shouldPoll, intersectionRef } = usePollIfInView(interval);
	const shouldPoll = true;

	const {
		views,
		isLoading: viewsIsLoading,
		isError: viewsIsError,
		increment: incrementViews,
	} = usePostViews(slug, {
		// Avoid fetching view count we *know* is stale since increment() mutation
		// returns view count
		revalidateOnMount: false,
		// Only poll when in view
		refreshInterval: shouldPoll ? interval : 0,
		// Override `usePostViews` default dedupingInterval for the polling usecase
		// (refresh interval can never be faster than deduping interval)
		dedupingInterval: interval,
	});

	const {
		likes,
		isLoading: likesIsLoading,
		isError: likesIsError,
	} = usePostLikes(slug, {
		// only poll when in view
		refreshInterval: shouldPoll ? interval : 0,
	});

	React.useEffect(() => {
		increment && incrementViews();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [increment]);

	return (
		<div className={`flex items-center h-full ${increment ? "text-lg" : "text-sm"}`}>
			{viewsIsError || viewsIsLoading ? (
				<CgSpinnerAlt className="animate-spin mx-1" />
			) : (
				<>
					<IoMdEye className="mr-1" />
					<span>{views}</span>
				</>
			)}
			{likesIsError || likesIsLoading ? (
				<CgSpinnerAlt className="animate-spin mx-1" />
			) : (
				<>
					<FaHeartbeat className="ml-2 mr-1" />
					<span>{likes}</span>
				</>
			)}
		</div>
	);
};
