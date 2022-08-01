import * as React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
	return <div className="layout flex-1">{children}</div>;
}
