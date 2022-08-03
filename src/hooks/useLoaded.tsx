import * as React from "react";

export const useLoaded = () => {
	const [isLoaded, setIsLoaded] = React.useState(false);

	React.useEffect(() => {
		setIsLoaded(true);
	}, []);

	return isLoaded;
};
