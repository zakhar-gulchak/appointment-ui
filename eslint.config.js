import neostandard, { resolveIgnoresFromGitignore, plugins } from 'neostandard'
import solid from 'eslint-plugin-solid/configs/typescript'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  ...neostandard({
    ignores: [...resolveIgnoresFromGitignore(), './eslint.config.js'],
  }),
  ...plugins['typescript-eslint'].config(
    solid,
    ...plugins['typescript-eslint'].configs.recommended
    // {
    //   rules: {
    //     'import/extensions': ['error', 'ignorePackages', { '': 'never' }],
    //   },
    // }
  ),
  eslintConfigPrettier,
]
