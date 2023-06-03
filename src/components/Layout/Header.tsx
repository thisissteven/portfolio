import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useTheme } from "next-themes";
import { TbArrowLeft } from "react-icons/tb";
import { CgArrowLeft, CgChevronLeft } from "react-icons/cg";

const links: { name: string; href: string }[] = [
  {
    name: "Home",
    href: "/",
  },
  // {
  // 	name: "Blog",
  // 	href: "/blog",
  // },
  {
    name: "Projects",
    href: "/projects",
  },
  {
    name: "Snippets",
    href: "/snippets",
  },
];

export default function Header() {
  const router = useRouter();
  const { pathname } = router;

  const { theme, setTheme } = useTheme();

  const [onTop, setOnTop] = React.useState(true);

  const [mounted, setMounted] = React.useState(false);

  // When mounted on client, now we can show the UI
  React.useEffect(() => {
    if (typeof window !== undefined) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
      setMounted(true);
    }
  }, [setTheme]);

  const handleScroll = () => {
    if (onTop !== (window.pageYOffset === 0)) {
      setOnTop(window.pageYOffset === 0);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const showNavbarPaths = ["/", "/projects", "/snippets"];

  if (showNavbarPaths.includes(pathname)) {
    return (
      <header className={`z-50 w-full py-4 bg-bg ${onTop ? "" : "shadow-xl"} sticky top-0 z-10 transition-shadow`}>
        <nav className="layout flex justify-between items-center">
          <ul className="flex gap-0 sm:gap-2 items-center">
            {links.map(({ name, href }) => (
              <Link key={name} href={href}>
                <a
                  className={`font-semibold py-1 px-2 text-primary/50 transition-colors duration-300 hover:bg-primary/10 rounded-md ${
                    pathname === href && "text-primary/100"
                  }`}
                >
                  {name}
                </a>
              </Link>
            ))}
          </ul>

          {mounted &&
            (theme === "light" ? (
              <button
                onClick={() => setTheme("dark")}
                className="hover:ring-2 transition-all duration-200 ring-primary/80 bg-primary/10 p-2.5 rounded-md"
              >
                <MdDarkMode className="text-primary" />
              </button>
            ) : (
              <button
                onClick={() => setTheme("light")}
                className="hover:ring-2 transition-all duration-200 ring-primary/80 bg-primary/10 p-2.5 rounded-md"
              >
                <MdLightMode className="text-primary" />
              </button>
            ))}
        </nav>
      </header>
    );
  }

  return (
    <header className={`z-50 w-full py-4 bg-bg ${onTop ? "" : "shadow-xl"} sticky top-0 z-10 transition-shadow`}>
      <nav className="layout flex justify-between items-center">
        <button
          onClick={() => router.back()}
          className="font-semibold py-1 px-2 text-primary/50 transition-colors duration-300 hover:bg-primary/10 rounded-md"
        >
          <CgChevronLeft className="w-8 h-8" strokeWidth={0} />
        </button>

        {mounted &&
          (theme === "light" ? (
            <button
              onClick={() => setTheme("dark")}
              className="hover:ring-2 transition-all duration-200 ring-primary/80 bg-primary/10 p-2.5 rounded-md"
            >
              <MdDarkMode className="text-primary" />
            </button>
          ) : (
            <button
              onClick={() => setTheme("light")}
              className="hover:ring-2 transition-all duration-200 ring-primary/80 bg-primary/10 p-2.5 rounded-md"
            >
              <MdLightMode className="text-primary" />
            </button>
          ))}
      </nav>
    </header>
  );
}
