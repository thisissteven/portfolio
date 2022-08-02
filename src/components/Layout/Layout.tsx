import * as React from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<section className="page">
			<Header />
			<div className="layout flex-1 py-12">{children}</div>
			<Footer />
		</section>
	);
}
