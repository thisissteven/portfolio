// source: https://github.com/delbaoliveira/website/blob/main/pages/api/views/%5Bslug%5D.ts

import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		switch (req.method) {
			case "GET": {
				const posts = await prisma.post.findMany({
					where: {
						slug: {
							startsWith: `${req.query?.type}_`,
						},
					},
				});

				const views = posts.map((post) => ({
					slug: post?.slug.split("_")[1],
					views: post?.views || 0,
				}));

				res.json(views);
				break;
			}

			default: {
				res.setHeader("Allow", ["GET"]);
				res.status(405).send("Method Not Allowed");
			}
		}
	} catch (err: any) {
		console.error(err.message);

		res.status(500).json({
			statusCode: 500,
			message: err.message,
		});
	}
}
