# weather-app
## Description
A simple weather app where the user can search for a city and the weather is displayed. Also, the user can select whether to use Fahrenheint or Celsius.
## How to clone
First, create a directory in your local machine.
Then, use the `git clone` command in the cli. Copy the SSH link of this repo.
`git clone git@github.com:rhenzala/weather-app.git`
In the root directory of your project, run this command to create a `package.json` file.
`npm init -y`
Setup webpack
`npm install --save-dev webpack webpack-cli html-webpack-plugin style-loader css-loader html-loader webpack-dev-server`
Create a webpack config and gitignore files
`touch webpack.config.js .gitignore`
Create a src directory and the coding files
```
mkdir src
touch src/index.js src/styles.css src/template.html
```
Inside the `webpack.config.js` 
```
// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
```
For eslint, use the v8.x. In the root of project, create the .eslintrc.js or .eslintrc.json
```
npm install --save-dev eslint
touch .eslintrc.js
```
Use the Aribnb's  eslint plugin to follow the Airbnb style
`npx install-peerdeps --dev eslint-config-airbnb-base`
For prettier, make sure to install the `eslint-config-prettier` to avoid conflict between eslint and prettier
```
npm install --save-dev --save-exact prettier
node --eval "fs.writeFileSync('.prettierrc','{}\n')"
node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts:\nbuild\ncoverage\n')"
```
To install the `eslint-config-prettier`
`npm install --save-dev eslint-config-prettier`
Inside the `.eslintrc.js`
```
module.exports = {
  extends: [
    'airbnb-base',
    'prettier',
  ],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'no-console': 'warn',
  },
};
```



