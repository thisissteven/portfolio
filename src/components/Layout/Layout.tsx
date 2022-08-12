import * as React from "react";
import Footer from "./Footer";
import Header from "./Header";
import NextNProgress from "nextjs-progressbar";
import { useTheme } from "next-themes";

export default function Layout({ children }: { children: React.ReactNode }) {
	const { theme, setTheme } = useTheme();

	const [mounted, setMounted] = React.useState(false);

	// When mounted on client, now we can show the UI
	React.useEffect(() => {
		if (typeof window !== undefined) {
			const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
			setTheme(prefersDark ? "dark" : "light");
			setMounted(true);
		}
	}, [setTheme]);

	return (
		<>
			{mounted &&
				(theme === "light" ? (
					<NextNProgress color="#191919" startPosition={0.3} stopDelayMs={200} height={2} showOnShallow={true} />
				) : (
					<NextNProgress color="#f0f0f0" startPosition={0.3} stopDelayMs={200} height={2} showOnShallow={true} />
				))}

			<section className="page">
				<Header />
				<div className="layout flex-1 pb-12 pt-8">{children}</div>
				<Footer />
			</section>
		</>
	);
}
