const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
	darkMode: 'class',
	content: ['./index.html', './src/*.tsx', './src/page/**/*.tsx'],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					'Inter var',
					...defaultTheme.fontFamily.sans,
				],
			},
		},
	},
	plugins: [],
}
