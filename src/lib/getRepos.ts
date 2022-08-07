const GITHUB_USERNAME = "steven2801";

type PinnedRepo = {
	[key: string]: string;
	stars: string;
};

export const getRepos = async () => {
	const res = await fetch(`https://gh-pinned-repos.egoist.dev/?username=${GITHUB_USERNAME}`);
	const data = await res.json();

	if (data.length) {
		return data.sort((a: PinnedRepo, b: PinnedRepo) => parseInt(b.stars) - parseInt(a.stars));
	}
	return [];
};
