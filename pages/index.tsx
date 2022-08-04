import Seo from "@/components/Seo";
import type { GetStaticProps } from "next";
import { getRepos } from "./api/_getRepos";
import { AiOutlineStar, AiOutlineFork } from "react-icons/ai";
import * as React from "react";
import { useLoaded } from "@/hooks/useLoaded";
import useCloudinaryImage from "@/hooks/useCloudinaryImage";
import Image from "next/image";
import { IoMdOpen, IoLogoGithub } from "react-icons/io";

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
	const isLoaded = useLoaded();

	const publicId = "uploads/square-profile_x5muvu";
	const [src, blur] = useCloudinaryImage(publicId, "steven2801");

	return (
		<div className={`${isLoaded ? "fade-in-start" : "opacity-0"} lg:mt-4`}>
			<Seo />
			<div className="flex flex-wrap items-end sm:justify-center w-full pb-4 gap-4">
				<div
					className="oveflow-hidden h-32 w-32 sm:h-48 sm:w-48 border-primary border-2 relative rounded-full mr-8"
					data-fade="2"
				>
					{(blur || src) && (
						<Image
							priority
							src={src}
							alt="profile image"
							width="100%"
							height="100%"
							layout="responsive"
							objectFit="cover"
							className="rounded-full"
							style={{
								filter: blur ? "blur(20px)" : "none",
								transition: blur ? "none" : "filter 0.3s ease-out",
							}}
						/>
					)}
				</div>
				<div className="max-w-md">
					<h1 className="h0 mb-2" data-fade="1">
						Steven
					</h1>
					<p className="p" data-fade="2">
						Information Systems Undergraduate at <b>Universitas Indonesia</b>
					</p>
					<p className="p mt-4 text-primary/60" data-fade="3">
						Aspiring frontend developer. Mainly working with React, Next, and Tailwind CSS.
					</p>
					<div className="flex space-x-2 mt-3" data-fade="4">
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://github.com/steven2801/portfolio"
							className="flex items-center space-x-2 px-2 py-1 hover:bg-primary/10 transition-colors duration-300 rounded-md"
						>
							<span>Source</span>
							<IoLogoGithub className="text-xl" />
						</a>
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://drive.google.com/file/d/1yjYnZHZk1LHVjNSNATt5oWgQyWXiwlCz/view?usp=sharing"
							className="flex items-center space-x-2 px-2 py-1 hover:bg-primary/10 transition-colors duration-300 rounded-md"
						>
							<span>Resume</span>
							<IoMdOpen className="text-xl" />
						</a>
					</div>
				</div>
			</div>

			<div className="mt-8 sm:mt-12">
				<h1 className="mb-4" data-fade="4">
					Pinned Repositories
				</h1>
				<div className="flex gap-2 flex-wrap" data-fade="5">
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
		</div>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const repos = await getRepos();

	return {
		props: {
			repos,
		},
		revalidate: 10,
	};
};

export default Home;
