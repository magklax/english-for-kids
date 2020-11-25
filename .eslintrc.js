module.exports = {
  "env": {
    "browser": true,
    "es2020": true
  },
  "extends": "airbnb-base/legacy",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module",
  },
  "rules": {
    "quotes": ["error", "single",  { "allowTemplateLiterals": true }],
    "no-use-before-define": ["error", { "variables": false } ],
  },
};
