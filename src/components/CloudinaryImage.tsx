import useCloudinaryImage from "@/hooks/useCloudinaryImage";
import * as React from "react";
import Image from "next/image";

type CloudinaryImageProps = {
	height: string | number;
	width: string | number;
	publicId: string;
	cloudName?: string;
	alt: string;
};

const CloudinaryImage = ({ height, width, publicId, alt, cloudName = "steven2801" }: CloudinaryImageProps) => {
	const [src, blur] = useCloudinaryImage(publicId, cloudName);

	return (
		<div className="max-w-full">
			{(blur || src) && (
				<Image
					priority
					src={src}
					alt={alt}
					width={width}
					height={height}
					layout="responsive"
					objectFit="cover"
					className="rounded-sm"
					style={{
						filter: blur ? "blur(20px)" : "none",
						transition: blur ? "none" : "filter 0.3s ease-out",
					}}
				/>
			)}
		</div>
	);
};

export default CloudinaryImage;
