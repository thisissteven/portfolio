import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout/Layout";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider defaultTheme="system">
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ThemeProvider>
	);
}

export default MyApp;
