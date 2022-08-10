import { PopulatedPost } from "@/lib/types";
import * as React from "react";

export default function SearchFilter({
	populatedPosts,
	selected,
	setFiltered,
}: {
	populatedPosts: PopulatedPost[];
	selected: string;
	setFiltered: React.Dispatch<React.SetStateAction<PopulatedPost[]>>;
}) {
	const [value, setValue] = React.useState("");

	React.useEffect(() => {
		const filterTimeout = setTimeout(() => {
			setFiltered(() => {
				let filtered = populatedPosts.filter(
					(post) =>
						post.title.toLowerCase().includes(value.toLowerCase()) ||
						post.excerpt.toLowerCase().includes(value.toLowerCase()) ||
						post.tags.filter((tag) => tag.includes(value.toLowerCase())).length > 0
				);
				filtered =
					selected === "Sort by name"
						? filtered.sort((a, z) => a.title.localeCompare(z.title))
						: filtered.sort((a, z) => {
								if (
									typeof a.likes === "number" &&
									typeof z.likes === "number" &&
									typeof a.views === "number" &&
									typeof z.views === "number"
								) {
									return z.likes + z.views - a.likes + a.views;
								} else {
									return 0;
								}
						  });
				return filtered;
			});
		}, 100);

		return () => clearTimeout(filterTimeout);
	}, [populatedPosts, setFiltered, value, selected]);

	return (
		<div className="mb-2">
			<input
				type="text"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder="Search keyword, topics..."
				className="appearance-none px-4 py-2 w-full
					 accent-gray-500 bg-primary/5 focus:bg-primary/5 hover:bg-primary/10 transition-colors duration-200 rounded-md"
			/>
		</div>
	);
}
