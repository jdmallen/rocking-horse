/** @type {import('stylelint').Config} */
export default {
	files: ["**/*.{css,scss,vue}"],
	plugins: ["stylelint-order"],
	extends: ["stylelint-config-standard"],
};
