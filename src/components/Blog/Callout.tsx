import * as React from "react";

export default function Callout({ children }: { children: React.ReactNode }) {
	return <div className="w-full bg-yellow-400/30 text-primary px-8 py-1 rounded-lg">{children}</div>;
}
