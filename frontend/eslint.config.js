import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';
import vuePlugin from 'eslint-plugin-vue';

export default [
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ['**/*.vue', '**/*.ts', '**/*.js'],
		languageOptions: {
			ecmaVersion: 2020,
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node,
			},
			parser: vueParser,
			parserOptions: {
				parser: '@typescript-eslint/parser',
				extraFileExtensions: ['.vue'],
			},
		},
		plugins: {
			vue: vuePlugin,
		},
		rules: {
			...vuePlugin.configs['recommended'].rules,
			'vue/no-unused-vars': 'warn',
			'@typescript-eslint/no-explicit-any': 'off',
		},
	},
];
