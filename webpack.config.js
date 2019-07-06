const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	entry: {
		main: "./src/index.js",
		campdoc: "./src/campdoc.js",
		done: "./src/done.js",
		campdocBack: "./src/campdocBack.js",
		govern: "./src/govern.js",
		allTeam: "./src/allTeam.js",
	},
	output: {
		// chunkFilename: '[name].[chunkhash].js',
		// filename: '[name].[chunkhash].js',
		filename: '[name].js',
		path: path.resolve(__dirname,'dist'),
		publicPath: '/iPowerAssets/'
	},
	mode: 'production',

	module: {
		rules: [{
				test: /\.(sass|css)$/,
				use: [{
						loader: 'style-loader'
					},{
						loader: 'css-loader'
					},{
						loader: 'sass-loader'
					}]
			},
			{
				test: /\.pug$/,

				use: [
					{
						loader: 'pug-loader'
					}
				]
			}
		]
	},
	plugins: [
		// new webpack.ProgressPlugin()
		// new UglifyJSPlugin(),
		new TerserPlugin(),
		new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({
			template: './src/pug/main.pug',
			filename: 'index.html',
			chunks: ['main']
			}),
		new HtmlWebpackPlugin({
				template: './src/pug/team.pug',
				filename: 'team.html',
				chunks: ['main']
			}),
		new HtmlWebpackPlugin({
				template: './src/pug/campdoc.pug',
				filename: 'campdoc.html',
				chunks: ['campdoc']
			}),
		new HtmlWebpackPlugin({
			template: './src/pug/done.pug',
			filename: 'done.html',
			chunks: ['done']
		}),
		new HtmlWebpackPlugin({
			template: './src/pug/campdocBack.pug',
			filename: 'campdocBack.html',
			chunks: ['campdocBack']
		}),
		new HtmlWebpackPlugin({
			template: './src/pug/Govern.pug',
			filename: 'govern.html',
			chunks: ['govern']
		}),
		new HtmlWebpackPlugin({
			template: './src/pug/allTeam.pug',
			filename: 'allTeam.html',
			chunks: ['allTeam']
		}),
	],

	optimization: {
		
	}
};
