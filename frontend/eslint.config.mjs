import { sxzz } from "@sxzz/eslint-config";
// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
	sxzz([], {
		prettier: true,
		markdown: true,
		vue: true,
		unocss: false,
	}),
)
	.override("sxzz/prettier", {
		rules: {
			"prettier/prettier": [
				"warn",
				{
					semi: true,
					singleQuote: false,
					printWidth: 80,
					tabWidth: 2,
					useTabs: true,
					trailingComma: "all",
					bracketSpacing: true,
					jsxBracketSameLine: false,
					arrowParens: "avoid",
					vueIndentScriptAndStyle: true,
					embeddedLanguageFormatting: "auto",
				},
			],
		},
	})
	.override("sxzz/sort/imports", {
		rules: {
			"import/no-default-export": 0,
		},
	});
