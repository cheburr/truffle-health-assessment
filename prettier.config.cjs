/** @type {import("prettier").Config} */

const config = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
}

module.exports = config
