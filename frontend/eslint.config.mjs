// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import stylistic from '@stylistic/eslint-plugin';

export default withNuxt({
	plugins: {
		'@stylistic': stylistic,
	},
	rules: {
		'@stylistic/indent': ['error', 'tab'],
		'@stylistic/no-mixed-spaces-and-tabs': 'error',
		'@stylistic/semi': ['error', 'always'],
		'@stylistic/comma-dangle': ['error', 'always-multiline'],
		'@stylistic/no-trailing-spaces': 'error',
	},
});
