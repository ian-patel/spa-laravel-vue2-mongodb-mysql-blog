const path = require("path");

module.exports = {
  root: true,
  extends: [
    "airbnb",
    "plugin:vue/recommended",
  ],
  env: {
    browser: true
  },
  rules: {
    // Allow vuex mutations to change state props directly
    "no-param-reassign": [
      "error",
      { props: true, ignorePropertyModificationsFor: ["state"] }
    ]
  },
  parserOptions: {
    // Allow async and await
    ecmaVersion: 6
  },
  settings: {
    "import/resolver": {
      webpack: {
        config: {
          resolve: {
            alias: {
              app: path.resolve(__dirname, "resources/assets/js")
            }
          }
        }
      }
    }
  }
};
