import js from "@eslint/js";
import globals from "globals";
import importX from "eslint-plugin-import-x";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: {
      // import-x resolvert imports via een native (Rust) resolver. Zonder
      // expliciete configuratie kent die alleen JS-extensies, waardoor de
      // TS-bestanden niet gevonden worden en regels als
      // no-relative-parent-imports stilzwijgend niets rapporteren. De
      // tsconfig-optie laat ook de @-alias (paths) meedoen.
      "import-x/resolver-next": [
        importX.createNodeResolver({
          extensions: [".mjs", ".cjs", ".js", ".json", ".node", ".ts", ".tsx"],
          tsconfig: { configFile: "tsconfig.app.json" },
        }),
      ],
    },
    plugins: {
      ...reactHooks.configs.flat.recommended.plugins,
      "react-refresh": reactRefresh,
      "import-x": importX,
    },
    rules: {
      ...reactHooks.configs.flat.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      // Relatieve ouder-imports (../) zijn verboden: gebruik de @-alias (@/...).
      // De regel komt uit eslint-plugin-import-x (de ESLint-9/10-compatibele fork
      // van eslint-plugin-import); de regelnaam is daardoor import-x/...
      // De ignore-optie stelt @/-imports vrij: die resolven via tsconfig naar
      // src/... en zijn daardoor vanuit componenten formeel een ouderpad, maar
      // precies het beoogde alternatief voor ../. Alleen échte ../-imports
      // (naar een bestaand bestand) worden gerapporteerd.
      "import-x/no-relative-parent-imports": ["error", { ignore: ["^@/"] }],
    },
  },
);
