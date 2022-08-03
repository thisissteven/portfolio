/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		scrollRestoration: true,
	},
	images: {
		domains: ["res.cloudinary.com"],
		loader: "akamai",
		path: "",
	},
};

module.exports = nextConfig;
