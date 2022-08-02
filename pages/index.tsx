import Seo from "@/components/Seo";
import type { GetStaticProps } from "next";
import { getRepos } from "./api/_getRepos";
import { AiOutlineStar, AiOutlineFork } from "react-icons/ai";

type RepoProps = {
	repo: string;
	link: string;
	description: string;
	stars: string;
	forks: string;
	image: string;
	website: string;
};

const Home = ({ repos }: { repos: RepoProps[] }) => {
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

			<div className="mt-12">
				<h1 className="mb-4">Pinned Repositories</h1>
				<div className="flex gap-2 flex-wrap">
					{repos.map((repo) => (
						<a className="w-full" key={repo.repo} href={repo.link} target="_blank" rel="noopener noreferrer">
							<div className="w-full cursor-pointer hover:bg-primary/10 p-4 rounded-md">
								<div className="flex justify-between items-center">
									<h1 className="h3">{repo.repo}</h1>
									<div className="flex justify-end items-center">
										<span className="flex items-center">
											<AiOutlineStar className="mr-[2px]" />
											{repo.stars}
										</span>
										<span className="mx-2">|</span>
										<span className="flex items-center">
											<AiOutlineFork className="mr-[2px]" />
											{repo.forks}
										</span>
									</div>
								</div>
								<p className="p opacity-60">{repo.description}</p>
							</div>
						</a>
					))}
				</div>
			</div>
		</>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const repos = await getRepos();

	return {
		props: {
			repos,
		},
		revalidate: 3600,
	};
};

export default Home;
