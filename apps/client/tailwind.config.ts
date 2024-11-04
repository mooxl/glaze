import type { Config } from "tailwindcss";

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		container: {
			center: true,
		},
		extend: {
			colors: {
				gray: {
					DEFAULT: "#111111",
					light: "#888888",
					dark: "#222222",
				},
			},
		},
	},
	plugins: [],
} satisfies Config;
