import * as React from "react";

export const useLoaded = () => {
	const [isLoaded, setIsLoaded] = React.useState(false);

	React.useEffect(() => {
		setTimeout(() => setIsLoaded(true), 200);
	}, []);

	return isLoaded;
};
