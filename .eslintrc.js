module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
        'prettier/@typescript-eslint',
    ],
    plugins: ['prettier', '@typescript-eslint', 'react', 'react-hooks'],
    parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    env: {
        browser: true,
        es6: true,
    },
    rules: {
        'prettier/prettier': [
            'error',
            {
                arrowParens: 'always',
                printWidth: 140,
                singleQuote: true,
            },
        ],
        'react/display-name': 'off',
        'react/prop-types': 'off',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
