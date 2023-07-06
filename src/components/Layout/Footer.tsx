import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const DevTO = () => (
	<svg
		width="24"
		height="24"
		viewBox="0 32 447.99999999999994 448"
		xmlns="http://www.w3.org/2000/svg"
		className="fill-primary hover:opacity-100 opacity-80 transition-opacity duration-200"
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M120.12 208.29c-3.88-2.9-7.77-4.35-11.65-4.35H91.03v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35s5.82-7.25 5.82-13.06v-69.65c-.01-5.8-1.96-10.16-5.83-13.06zM404.1 32H43.9C19.7 32 .06 51.59 0 75.8v360.4C.06 460.41 19.7 480 43.9 480h360.2c24.21 0 43.84-19.59 43.9-43.8V75.8c-.06-24.21-19.7-43.8-43.9-43.8zM154.2 291.19c0 18.81-11.61 47.31-48.36 47.25h-46.4V172.98h47.38c35.44 0 47.36 28.46 47.37 47.28zm100.68-88.66H201.6v38.42h32.57v29.57H201.6v38.41h53.29v29.57h-62.18c-11.16.29-20.44-8.53-20.72-19.69V193.7c-.27-11.15 8.56-20.41 19.71-20.69h63.19zm103.64 115.29c-13.2 30.75-36.85 24.63-47.44 0l-38.53-144.8h32.57l29.71 113.72 29.57-113.72h32.58z"
		></path>
	</svg>
);

const Mail = () => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 512 512"
		className="fill-primary hover:opacity-100 opacity-80 transition-opacity duration-200"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"
		></path>
	</svg>
);

export default function Footer() {
	return (
		<footer className="layout pb-8 flex flex-col gap-4">
			<ul className="flex gap-4 items-center">
{/* 				<li>
					<a target="_blank" href="https://dev.to/steven2801" rel="noopener noreferrer">
						<DevTO />
					</a>
				</li> */}
				<li>
					<a target="_blank" href="https://github.com/steven2801" rel="noopener noreferrer">
						<FaGithub className="w-[24px] h-[24px] fill-primary hover:opacity-100 opacity-80 transition-opacity duration-200" />
					</a>
				</li>
				<li>
					<a target="_blank" href="https://www.linkedin.com/in/steven2801/" rel="noopener noreferrer">
						<FaLinkedin className="w-[24px] h-[24px] fill-primary hover:opacity-100 opacity-80 transition-opacity duration-200" />
					</a>
				</li>
				<li>
					<a target="_blank" href="mailto:ssteven075@gmail.com" rel="noopener noreferrer">
						<Mail />
					</a>
				</li>
			</ul>
			<p className="p">Built with Next.js, MDX, Tailwind and Vercel</p>
		</footer>
	);
}
