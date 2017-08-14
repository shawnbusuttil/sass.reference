const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: {
		scripts: "./src/main.ts",
		styles: "./src/scss/main.scss"
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js"
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader", "sass-loader"],
					publicPath: "/dist"
				}),
				exclude: /node_modules/
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.html$/,
				use: "html-loader"
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			minify: {
				collapseWithWhitespace: true
			},
			template: "src/index.html"
		}),
		new ExtractTextPlugin({
			filename: "app.css"
		})
	],
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	},
	devServer: {
		contentBase: path.join(__dirname, "dist/"),
		compress: true,
		port: 8080
	}

}