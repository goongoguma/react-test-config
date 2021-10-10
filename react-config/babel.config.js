module.exports = {
  presets: [
    "@babel/preset-env",
    {
      "targets": {
        "ie": "11"
      },
      "debug": true
    },
    ["@babel/preset-react", { runtime: "automatic" }]
  ]
}