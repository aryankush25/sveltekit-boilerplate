const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		boxShadow: {
			sm: '0px 1px 9px rgba(230, 230, 230, 0.5)',
			DEFAULT: '0px 4px 8px rgba(26, 26, 26, 0.16)',
			md: 'box-shadow: 0px 1px 9px rgba(230, 230, 230, 0.5);',
			none: 'none'
		},
		fontFamily: {
			sans: ['Open Sans', ...defaultTheme.fontFamily.sans]
		},
		fontWeight: {
			normal: '400',
			semibold: '600',
			bold: '700'
		},
		extend: {
			// Checkout default Tailwind properties here -
			// https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js
			fontSize: {
				xxs: ['0.625rem', { lineHeight: '1rem' }]
			}
		}
	},
	plugins: []
};
