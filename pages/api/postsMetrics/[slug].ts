// source: https://github.com/delbaoliveira/website/blob/main/pages/api/views/%5Bslug%5D.ts

import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const slug = z.string().parse(req.query.slug);

		switch (req.method) {
			case "GET": {
				const post = await prisma.post.findUnique({
					where: { slug },
				});

				res.json({
					views: post?.views || 0,
					likes: post?.likes || 0,
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
