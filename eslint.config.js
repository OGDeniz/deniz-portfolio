// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

// Try to import the Prettier shareable config (exports may vary across versions)
/** @type {any|undefined} */
let prettierConfig;
try {
  // eslint-config-prettier can export a flat config object or a `configs` map depending on version.
  // Cast to `any` so @ts-check won't complain about missing properties on different shapes.
  // If the package isn't installed, the require will throw and we simply skip it.
  
  const p = /** @type {any} */ (require("eslint-config-prettier"));
  if (p) {
    if (p.configs && p.configs.recommended) {
      prettierConfig = p.configs.recommended;
    } else if (p && typeof p === "object" && Object.keys(p).length > 0) {
      // some versions export a flat config object
      prettierConfig = p;
    }
  }
} catch (e) {
  // ignore — we'll simply not include Prettier's shareable config
}

/**
 * Normalize different shapes (object, array, or undefined) into an array we can spread.
 * @param {any} val
 * @returns {any[]}
 */
const toArray = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return [val];
};

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      ...toArray(eslint && eslint.configs && eslint.configs.recommended),
      ...toArray(tseslint && tseslint.configs && tseslint.configs.recommended),
      ...toArray(tseslint && tseslint.configs && tseslint.configs.stylistic),
      ...toArray(angular && angular.configs && angular.configs.tsRecommended),
      ...toArray(prettierConfig),
    ],
    processor: angular && angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...toArray(angular && angular.configs && angular.configs.templateRecommended),
      ...toArray(angular && angular.configs && angular.configs.templateAccessibility),
    ],
    rules: {},
  }

);
