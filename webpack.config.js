var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlPlugin = require('html-webpack-plugin');

module.exports = {
	entry:{
		'app':'./src/public/js/app.js',
		'K':['vue','vue-router'],
		'M':['marked']
	},
	output:{
		path: 'app/public/',
		filename: 'js/[name].js',
		publicPath:'public/',
		chunkFilename: '[id].chunk.js'
	},
	devtool: false,
	module:{
		'loaders':[
			{
				test:/\.less$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
			},
			{
				test : /\.css$/,
				loader : ExtractTextPlugin.extract('style', 'css')
			},
			{
				test : /\.js$/,
				loader : 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.html$/,
				loader: "html"
			}
		]
	},
	plugins:[

		new webpack.ProvidePlugin({
			Vue:'vue',
			VueRouter:'vue-router',
			Marked:'marked'
		}),


		new webpack.optimize.CommonsChunkPlugin({
			names: ['K','M'],
			minChunks: Infinity
		}),

		new ExtractTextPlugin("css/[name].css",{
			allChunks:true
		}),

		new HtmlPlugin({
			template: './src/index.html',
			filename: '../index.html',
			inject: 'body',
			hash: true,
			chunks: ['M','K','app'],
			chunksSortMode: function chunksSortMode(a,b){
				const module={
					M:1,
					K:0,
					app:0
				}
				return a.names=="app" ? module[a.names]: module[b.names];
			},
			minify: {
				removeComments: true,
				collapseWhitespace: false
			}
		})
	]
}