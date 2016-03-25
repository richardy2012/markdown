var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlPlugin = require('html-webpack-plugin');

module.exports = {
	entry:{
		'app':'./src/public/js/app.js',
		'Vue':['vue'],
		'VueRouter':['vue-router']
	},
	output:{
		path: 'app/public/',
		filename: 'js/[name].js',
		publicPath:'public/',
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
            VueRouter:'vue-router'
        }),


        new webpack.optimize.CommonsChunkPlugin({
			names: ['VueRouter'],
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
			chunks: ['VueRouter','app'],
			minify: {   
				removeComments: true,
				collapseWhitespace: false
			}
		}),
	]
}