module.exports = {
    
    parser: '@typescript-eslint/parser', 
  
    env: {
      node: true,
      es2021: true,
    },
  
    extends: [
      'eslint:recommended',
      
      'plugin:@typescript-eslint/recommended', 
      
      'prettier', 
    ],
  
    plugins: [
      '@typescript-eslint',
    ],
  
    rules: {
      'no-console': 'off', 
      
      '@typescript-eslint/consistent-type-imports': 'error', 
      
      '@typescript-eslint/explicit-module-boundary-types': 'error', 
      
      '@typescript-eslint/no-var-requires': 'off',
      
      '@typescript-eslint/no-non-null-assertion': 'off', 
      
      'semi': ['error', 'always'],
    },

    overrides: [
      {
        files: ['**/*.test.ts'],
        rules: {
          'node/no-unpublished-import': 'off',
          'no-undef': 'off', 
        },
      },
    ],
  };
  