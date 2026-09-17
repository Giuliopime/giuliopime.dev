// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import tailwindcss from 'eslint-plugin-tailwindcss';

export default withNuxt(
  // Bridge the plugin's typescript-eslint types to ESLint's native config types.
  /** @type {import('eslint').Linter.Config | import('eslint').Linter.Config[]} */
  // @ts-expect-error
  tailwindcss.configs['flat/recommended'] || tailwindcss.configs.recommended,
  eslintConfigPrettier,
  {
    settings: {
      tailwindcss:
        /** @type {import('eslint-plugin-tailwindcss').PluginSettings} */
        ({
          cssConfigPath: './app/assets/css/tailwind.css',
        }),
    },
    rules: {
      'vue/html-self-closing': 'error',
      'tailwindcss/no-custom-classname': 'off',
      'vue/multi-word-component-names': 'off',
    },
  },
);
