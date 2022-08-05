// source: https://github.com/delbaoliveira/website/blob/main/pages/api/likes/%5Bslug%5D.ts

import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		switch (req.method) {
			case "GET": {
				const [posts, users] = await Promise.all([
					// get the number of likes this post has
					prisma.post.findMany({
						where: {
							slug: {
								startsWith: `${req.query?.type}_`,
							},
						},
					}),

					// get the number of times the current user has liked this post
					prisma.session.findMany({
						where: {
							id: {
								startsWith: `${req.query?.type}_`,
							},
						},
					}),
				]);

				const likes = posts.map((post) => ({
					slug: post?.slug.split("_")[1],
					likes: post?.likes || 0,
				}));

				const currentUserLikes = users.map((user) => ({
					slug: user.id.split("___")[0].split("_")[1],
					currentUserLikes: user?.likes || 0,
				}));

				res.json({
					likes,
					currentUserLikes,
				});

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
