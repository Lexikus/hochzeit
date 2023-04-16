/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				mytheme: {
					"primary": "#D47E49",
					"secondary": "#BA2A41",
					"accent": "#D5A574",
					"neutral": "#1c1917",
					"base-100": "#FFFFFF",
					"info": "#a5f3fc",
					"success": "#047857",
					"warning": "#EFD7BB",
					"error": "#E58B8B",
				},
			},
		],
	}
}
