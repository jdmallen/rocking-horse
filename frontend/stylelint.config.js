/** @type {import('stylelint').Config} */
export default {
	files: ["**/*.css"],
	plugins: ["stylelint-order"],
	extends: ["stylelint-config-standard-vue"],
	rules: {
		"custom-property-empty-line-before": null,
		"comment-empty-line-before": [
			"always",
			{
				except: ["first-nested"],
				ignore: ["after-comment", "stylelint-commands"],
			},
		],
		"selector-class-pattern": null,
	},
};
