import { usePostLikes } from "@/hooks/metrics/usePostLikes";
import { FaHeartbeat } from "react-icons/fa";
import * as React from "react";

const hearts: {
	[key: number]: React.ReactNode;
} = {
	1: <span className="animate-ping absolute inset-0">💕</span>,
	2: <span className="animate-ping absolute inset-0">💕💕</span>,
	3: <span className="animate-ping absolute inset-0">💕💕💕</span>,
	4: <span className="animate-ping absolute inset-0">💕💕💕💕</span>,
	5: <span className="animate-ping absolute inset-0 ">💕💕💕💕💕</span>,
};

export default function Heart({ slug }: { slug: string }) {
	const { likes, currentUserLikes, increment } = usePostLikes(slug);

	const heightPercentage = Math.floor((currentUserLikes / 5) * 100);

	const [pressed, setPressed] = React.useState(false);

	React.useEffect(() => {
		if (pressed) {
			setTimeout(() => setPressed(false), 500);
		}
	}, [pressed]);

	return (
		<div className="mt-8 flex items-center justify-center sm:justify-start gap-2 sm:gap-4">
			<button
				onClick={() => {
					increment();
					setPressed(true);
				}}
				className="relative outline-none hover:scale-[105%] active:scale-[115%] transition-all duration-300 flex"
			>
				{pressed && hearts[likes]}

				{/* actual heart being displayed */}
				<div className="hidden sm:block">
					<svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
						<linearGradient x1="0" y1="0" x2="100%" y2="100%" id="gradient1">
							<stop stopColor="#c86dd7" offset="0" />
							<stop stopColor="#3023ae" offset="100%" />
						</linearGradient>
						<FaHeartbeat className="absolute inset-0 text-primary text-8xl" fill="url(#gradient1)" />
					</svg>
				</div>

				{/* actual heart being displayed */}
				<div className="block sm:hidden">
					<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
						<linearGradient x1="0" y1="0" x2="100%" y2="100%" id="gradient2">
							<stop stopColor="#c86dd7" offset="0" />
							<stop stopColor="#3023ae" offset="100%" />
						</linearGradient>
						<FaHeartbeat className="absolute inset-0 text-primary text-6xl" fill="url(#gradient2)" />
					</svg>
				</div>

				{/* controls the heart height */}
				<div
					className="absolute inset-0 z-50 bg-bg/50 transition-all duration-300"
					style={{ bottom: heightPercentage + "%" }}
				></div>
			</button>
			<span className="text-xl sm:text-3xl font-bold bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 text-transparent">
				{likes}
			</span>
		</div>
	);
}
