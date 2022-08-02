const siteUrl = "https://portfolio-nu-six-31.vercel.app";

module.exports = {
	siteUrl,
	generateRobotsTxt: true,
	robotsTxtOptions: {
		policies: [{ userAgent: "*", allow: "/" }],
	},
};
