// import js from "@eslint/js";
// import nextPlugin from "@next/eslint-plugin-next";
// import typescript from "@typescript-eslint/eslint-plugin";
// import typescriptParser from "@typescript-eslint/parser";
// import importPlugin from "eslint-plugin-import";
// import jsxA11y from "eslint-plugin-jsx-a11y";
// import prettier from "eslint-plugin-prettier";
// import react from "eslint-plugin-react";
// import reactHooks from "eslint-plugin-react-hooks";
// import unusedImports from "eslint-plugin-unused-imports";
// import globals from "globals";

// export default [
//   js.configs.recommended,
//   {
//     ignores: [
//       "!.commitlintrc.cjs",
//       "!.lintstagedrc.cjs",
//       "!jest.config.js",
//       "!plopfile.js",
//       "!react-shim.js",
//       "!tsup.config.ts",
//       ".changeset",
//       ".DS_Store",
//       ".next",
//       ".next/**",
//       ".now/*",
//       ".vercel/**",
//       "*.config.js",
//       "*.css",
//       "**/*.d.ts",
//       "build",
//       "coverage",
//       "coverage/**",
//       "dist/**",
//       "esm/*",
//       "node_modules/**",
//       "out/**",
//       "pnpm-lock.yaml",
//       "public/*",
//       "public/**",
//       "scripts/*",
//       "tests/*",
//     ],
//   },
//   // env rules
//   {
//     files: ["env/**/*.{js,mjs,ts}"],
//     languageOptions: {
//       parser: typescriptParser,
//       parserOptions: {
//         ecmaVersion: 12,
//         sourceType: "module",
//       },
//       globals: {
//         ...globals.node,
//         ...globals.es2025,
//         process: "readonly",
//         global: "readonly",
//         console: "readonly",
//       },
//     },
//     plugins: {
//       "@typescript-eslint": typescript,
//       import: importPlugin,
//       prettier: prettier,
//       "unused-imports": unusedImports,
//     },
//     rules: {
//       "no-console": "warn",
//       "prettier/prettier": "warn",
//       "no-unused-vars": "off",
//       "unused-imports/no-unused-vars": "off",
//       "unused-imports/no-unused-imports": "warn",
//       "@typescript-eslint/no-unused-vars": [
//         "warn",
//         {
//           args: "after-used",
//           ignoreRestSiblings: false,
//           argsIgnorePattern: "^_.*?$",
//         },
//       ],
//       "no-empty-pattern": "off",
//       "no-undef": "off",
//     },
//   },
//   // main rules
//   {
//     files: ["**/*.{js,jsx,ts,tsx}"],
//     ignores: ["app/api/**", "lib/api/**", "app/sw.ts"], // exclude API &
//     Service Worker languageOptions: {
//       parser: typescriptParser,
//       parserOptions: {
//         ecmaVersion: 12,
//         sourceType: "module",
//         ecmaFeatures: {
//           jsx: true,
//         },
//       },
//       globals: {
//         ...globals.browser,
//         ...globals.node,
//         ...globals.es2025,
//         React: "readonly",
//         JSX: "readonly",
//         // Next.js & Node.js
//         process: "readonly",
//         global: "readonly",
//         NodeJS: "readonly",
//         // Web APIs
//         RequestInit: "readonly",
//         Response: "readonly",
//         Request: "readonly",
//         Headers: "readonly",
//         FormData: "readonly",
//         URLSearchParams: "readonly",
//         URL: "readonly",
//       },
//     },
//     plugins: {
//       "@typescript-eslint": typescript,
//       react: react,
//       "react-hooks": reactHooks,
//       "jsx-a11y": jsxA11y,
//       import: importPlugin,
//       prettier: prettier,
//       "unused-imports": unusedImports,
//       "@next/next": nextPlugin,
//     },
//     rules: {
//       "no-console": "warn",
//       // React rules
//       "react/prop-types": "off",
//       "react/jsx-uses-react": "off",
//       "react/react-in-jsx-scope": "off",
//       "react/self-closing-comp": "warn",
//       "react/jsx-sort-props": [
//         "warn",
//         {
//           callbacksLast: true,
//           shorthandFirst: true,
//           noSortAlphabetically: false,
//           reservedFirst: true,
//         },
//       ],
//       // React Hooks rules
//       "react-hooks/rules-of-hooks": "error",
//       "react-hooks/exhaustive-deps": "off",
//       // JSX A11y rules
//       "jsx-a11y/click-events-have-key-events": "warn",
//       "jsx-a11y/interactive-supports-focus": "warn",
//       // Prettier rules
//       "prettier/prettier": "warn",
//       // Unused vars rules
//       "no-unused-vars": "off",
//       "unused-imports/no-unused-vars": "off",
//       "unused-imports/no-unused-imports": "warn",
//       "@typescript-eslint/no-unused-vars": [
//         "warn",
//         {
//           args: "after-used",
//           ignoreRestSiblings: false,
//           argsIgnorePattern: "^_.*?$",
//         },
//       ],
//       // Import rules
//       "import/order": [
//         "warn",
//         {
//           groups: [
//             "type",
//             "builtin",
//             "object",
//             "external",
//             "internal",
//             "parent",
//             "sibling",
//             "index",
//           ],
//           pathGroups: [
//             {
//               pattern: "~/**",
//               group: "external",
//               position: "after",
//             },
//           ],
//           "newlines-between": "always",
//         },
//       ],
//       // Code style rules
//       "padding-line-between-statements": [
//         "warn",
//         { blankLine: "always", prev: "*", next: "return" },
//         { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
//         {
//           blankLine: "any",
//           prev: ["const", "let", "var"],
//           next: ["const", "let", "var"],
//         },
//       ],
//       "no-empty-pattern": "off",
//       "no-undef": "off", // TypeScript will handle it
//     },
//     settings: {
//       react: {
//         version: "detect",
//       },
//     },
//   },
//   // API & server worker
//   {
//     files: ["app/api/**/*.{js,ts}", "lib/api/**/*.{js,ts}", "app/sw.ts"],
//     languageOptions: {
//       parser: typescriptParser,
//       parserOptions: {
//         ecmaVersion: 12,
//         sourceType: "module",
//       },
//       globals: {
//         ...globals.node,
//         ...globals.es2025,
//         // Web APIs that are available in Node.js runtime
//         URL: "readonly",
//         URLSearchParams: "readonly",
//         fetch: "readonly",
//         Request: "readonly",
//         Response: "readonly",
//         Headers: "readonly",
//         FormData: "readonly",
//         File: "readonly",
//         Blob: "readonly",
//         TextEncoder: "readonly",
//         TextDecoder: "readonly",
//         crypto: "readonly",
//         // Service Worker specific globals
//         ServiceWorkerGlobalScope: "readonly",
//         self: "readonly",
//       },
//     },
//     plugins: {
//       "@typescript-eslint": typescript,
//       import: importPlugin,
//       prettier: prettier,
//       "unused-imports": unusedImports,
//     },
//     rules: {
//       "no-console": "warn", // allow console in server
//       // Prettier rules
//       "prettier/prettier": "warn",
//       // Unused vars rules
//       "no-unused-vars": "off",
//       "unused-imports/no-unused-vars": "off",
//       "unused-imports/no-unused-imports": "warn",
//       "@typescript-eslint/no-unused-vars": [
//         "warn",
//         {
//           args: "after-used",
//           ignoreRestSiblings: false,
//           argsIgnorePattern: "^_.*?$",
//         },
//       ],
//       "no-empty-pattern": "off",
//       "no-undef": "off",
//     },
//   },
// ];

import pluginQuery from "@tanstack/eslint-plugin-query";
import { globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import importPlugin from "eslint-plugin-import";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

const eslintConfig = [
  ...nextVitals,
  ...pluginQuery.configs["flat/recommended"],
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  globalIgnores([
    ".next",
    ".open-next",
    "node_modules",
    "public",
    "next-env.d.ts",
  ]),
  {
    plugins: {
      "unused-imports": unusedImports,
      import: importPlugin,
    },
    ignores: ["*.config.js", "*.config.mjs"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "prefer-const": "warn",
      "prettier/prettier": ["warn", {}, { usePrettierrc: true }],
      "import/no-empty-named-blocks": "warn",
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            ["sibling", "index"],
            "object",
            "unknown",
          ],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    files: ["**/*.{tsx,jsx}"],
    rules: {
      "react/jsx-sort-props": [
        "warn",
        {
          callbacksLast: true,
          shorthandFirst: true,
          noSortAlphabetically: false,
          reservedFirst: true,
        },
      ],
    },
  },
];

export default eslintConfig;
