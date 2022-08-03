import { buildImageUrl } from "cloudinary-build-url";
import * as React from "react";

const useCloudinaryImage = (publicId: string): [src: string, blur: boolean] => {
	const [src, setSrc] = React.useState<string>("");

	const lowSrc = buildImageUrl(publicId, {
		cloud: {
			cloudName: "steven2801",
		},
		transformations: {
			quality: 1,
		},
	});

	const highSrc = buildImageUrl(publicId, {
		cloud: {
			cloudName: "steven2801",
		},
	});

	React.useEffect(() => {
		setSrc(lowSrc);

		const img = new Image();
		img.src = highSrc;

		img.onload = () => {
			setSrc(highSrc);
		};
	}, [lowSrc, highSrc]);

	return [src, src === lowSrc];
};

export default useCloudinaryImage;
