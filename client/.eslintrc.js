module.exports = {
  plugins: ["prettier"],
  extends: ["react-app", "prettier", "prettier/react"],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
  },
};
