var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlPlugin = require('html-webpack-plugin');



module.exports = {
	entry:{
		'app':'./src/public/js/app.js',
		'Vue' : ['vue']
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
		new ExtractTextPlugin("css/[name].css",{
			allChunks:true
		}),
		new HtmlPlugin({
			template: './src/index.html',
			filename: '../index.html',
			inject: 'body',
			hash: true,
			chunks: ['app','Vue'],
			minify: {   
				removeComments: true,
				collapseWhitespace: false
			}
		}),
		new webpack.ProvidePlugin({
            Vue:'vue'
            // Wilddog:'wilddog'
        }),
        new webpack.optimize.CommonsChunkPlugin('Vue','lib/Vue.js')
        // new webpack.optimize.CommonsChunkPlugin('Wilddog','../lib/Wilddog.js'),
	]
}