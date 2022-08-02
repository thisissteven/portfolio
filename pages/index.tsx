import Seo from "@/components/Seo";
import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
	return (
		<>
			<Seo />
			<div className="max-w-md">
				<h1 className="h0 mb-2">Steven</h1>
				<p className="p">
					Information Systems Undergraduate at <b>Universitas Indonesia</b>
				</p>
				<p className="p mt-4 opacity-60">
					Aspiring frontend developer. Mainly working with React, Next, and Tailwind CSS.
				</p>
			</div>

			<div className="max-w-md mt-12">
				<h1>Latest Projects</h1>
			</div>
		</>
	);
};

export default Home;
