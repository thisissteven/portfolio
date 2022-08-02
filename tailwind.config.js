/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				primary: ["Lato", "sans-serif"],
			},
			colors: {
				primary: "var(--color-primary)",
				bg: "var(--color-bg)",
				"bg-secondary": "var(--color-bg-secondary)",
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
