/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Montserrat", "system-ui", "sans-serif"],
			},
		},
	},
	plugins: [
		function ({ addVariant }) {
			addVariant("child", "& > *");
			addVariant("child-hover", "& > *:hover");
		},
		function ({ addVariant }) {
			addVariant("supports-dynamic", "@supports (width: 1dvw)");
		},
		require("@tailwindcss/typography")
	],
};
