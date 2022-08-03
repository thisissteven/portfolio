import { BsClipboard, BsClipboardCheck } from "react-icons/bs";
import * as React from "react";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";

export default function Copy() {
	const ref = React.useRef() as React.MutableRefObject<HTMLDivElement>;

	const [copiedValue, copy] = useCopyToClipboard();
	const [value, setValue] = React.useState("");

	React.useEffect(() => {
		const code = ref.current.nextElementSibling as HTMLElement;
		const toCopy = code.innerText;
		setValue(toCopy);
	}, []);

	return (
		<div
			className="relative -mb-14 bottom-10 lg:bottom-8 px-4 text-smtext-yellow-200 flex items-center justify-end"
			ref={ref}
		>
			<button
				className={`relative top-14 p-2 text-yellow-200 opacity-50 hover:opacity-100 transition-all duration-300 rounded-md hover:bg-yellow-200/10 ${
					copiedValue && "opacity-100"
				}`}
				onClick={() => copy(value)}
			>
				{copiedValue ? <BsClipboardCheck className="text-xl" /> : <BsClipboard className="text-xl" />}
			</button>
		</div>
	);
}
