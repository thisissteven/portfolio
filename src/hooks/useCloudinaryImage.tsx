import { buildImageUrl } from "cloudinary-build-url";
import * as React from "react";

const useCloudinaryImage = (publicId: string, cloudName: string): [src: string, blur: boolean] => {
	// initialize src to be low source image
	const [src, setSrc] = React.useState<string>(() =>
		buildImageUrl(publicId, {
			cloud: {
				cloudName,
			},
			transformations: {
				quality: 1,
			},
		})
	);

	const highSrc = buildImageUrl(publicId, {
		cloud: {
			cloudName,
		},
	});

	React.useEffect(() => {
		const img = new Image();

		img.onload = () => setSrc(highSrc);

		img.src = highSrc;
	}, [highSrc]);

	return [src, src === highSrc];
};

export default useCloudinaryImage;
