import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Layout from "@/components/Layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<section className="page">
			<Header />
			<Layout>
				<Component {...pageProps} />
			</Layout>
			<Footer />
		</section>
	);
}

export default MyApp;
