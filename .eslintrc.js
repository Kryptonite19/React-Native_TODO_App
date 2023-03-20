module.exports = {
  "env": {
    "browser": true,
    "es2020": true,
    "react-native/react-native": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 11,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "react-native"
  ],
  "rules": {
    "react/prop-types": 0
  }
};
