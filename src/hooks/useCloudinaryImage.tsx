import { buildImageUrl } from "cloudinary-build-url";
import * as React from "react";

const useCloudinaryImage = (publicId: string, cloudName: string): [src: string, blur: boolean] => {
	const [src, setSrc] = React.useState<string>("");

	const lowSrc = buildImageUrl(publicId, {
		cloud: {
			cloudName,
		},
		transformations: {
			quality: 1,
		},
	});

	const highSrc = buildImageUrl(publicId, {
		cloud: {
			cloudName,
		},
	});

	React.useEffect(() => {
		setSrc(lowSrc);

		const img = new Image();

		img.onload = () => {
			setTimeout(() => setSrc(highSrc), 500);
		};

		img.src = highSrc;
	}, [lowSrc, highSrc]);

	return [src, src === lowSrc];
};

export default useCloudinaryImage;
