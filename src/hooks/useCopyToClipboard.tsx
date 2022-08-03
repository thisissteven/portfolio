import * as React from "react";

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>; // Return success

function useCopyToClipboard(): [CopiedValue, CopyFn] {
	const [copiedText, setCopiedText] = React.useState<CopiedValue>(null);

	React.useEffect(() => {
		const clearText = setTimeout(() => setCopiedText(null), 2000);

		return () => clearTimeout(clearText);
	}, [copiedText]);

	const copy: CopyFn = async (text) => {
		if (!navigator?.clipboard) {
			console.warn("Clipboard not supported");
			return false;
		}

		// Try to save to clipboard then save it in the state if worked
		try {
			await navigator.clipboard.writeText(text);
			setCopiedText(text);
			return true;
		} catch (error) {
			console.warn("Copy failed", error);
			setCopiedText(null);
			return false;
		}
	};

	return [copiedText, copy];
}

export default useCopyToClipboard;
