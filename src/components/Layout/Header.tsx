import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useTheme } from "next-themes";

const links: { name: string; href: string }[] = [
	{
		name: "Home",
		href: "/",
	},
	{
		name: "Blog",
		href: "/blog",
	},
	{
		name: "Projects",
		href: "/projects",
	},
	{
		name: "Snippets",
		href: "/snippets",
	},
];

export const isActiveLink = (href: string, currentPathname: string): boolean => {
	if (href === "/") {
		return href === currentPathname;
	}

	return currentPathname.startsWith(href);
};

export default function Header() {
	const { pathname } = useRouter();

	const { theme, setTheme } = useTheme();

	return (
		<header className="layout pt-8">
			<nav className="flex gap-2">
				{links.map(({ name, href }) => (
					<Link key={name} href={href}>
						<a className="mr-6 sm:mr-8 flex flex-col relative p">
							{name}
							{isActiveLink(href, pathname) && (
								<motion.div layoutId="navigation-underline" className="w-full border-b-2 border-primary" animate />
							)}
						</a>
					</Link>
				))}

				{theme === "light" ? (
					<button onClick={() => setTheme("dark")}>
						<MdDarkMode className="text-primary" />
					</button>
				) : (
					<button onClick={() => setTheme("light")}>
						<MdLightMode className="text-primary" />
					</button>
				)}
			</nav>
		</header>
	);
}
