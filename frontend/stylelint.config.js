/** @type {import('stylelint').Config} */
export default {
	files: ["**/*.css"],
	plugins: ["stylelint-order"],
	extends: ["stylelint-config-standard-vue"],
	rules: {
		"custom-property-empty-line-before": null,
	},
};
