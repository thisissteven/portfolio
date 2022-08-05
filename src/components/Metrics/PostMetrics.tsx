import { IoMdEye } from "react-icons/io";
import { FaHeartbeat } from "react-icons/fa";
import React from "react";
import { CgSpinnerAlt } from "react-icons/cg";

type PostMetricsProps = {
	likes?: number | string;
	views?: number | string;
	isLoading: boolean;
	size: "sm" | "lg";
};

export const PostMetrics = ({ likes = 0, views = 0, isLoading, size }: PostMetricsProps) => {
	return (
		<div className={`flex items-center h-full sm:text-${size}`}>
			{isLoading ? (
				<CgSpinnerAlt className="animate-spin mx-1" />
			) : (
				<>
					<IoMdEye className="mr-1" />
					<span>{views}</span>
				</>
			)}
			{isLoading ? (
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
