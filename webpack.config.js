var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlPlugin = require('html-webpack-plugin');

module.exports = {
	entry:{
		'app':'./src/public/js/app.js'
	},
	output:{
		path: 'app/public/js',
		filename: '[name].js',
		publicPath:'./public/js'
	},
	devtool: false,
	module:{
		'loaders':[
			{
				test : /\.css$/,
				loader : ExtractTextPlugin.extract('style', 'css')
			},
			{
                test : /\.js$/,
                loader : 'babel-loader',
                exclude: /node_modules/   
            }
		]
	},
	plugins:[
		new ExtractTextPlugin("../css/[name].css",{
			allChunks:true
		}),
		new HtmlPlugin({
			template: './src/index.html',
			filename: '../../index.html',
			inject: 'body',
			hash: true,
			chunks: ['app','Vue','Wilddog'],
			minify: {   
				removeComments: true,
				collapseWhitespace: false
			}
		}),
		new webpack.ProvidePlugin({
            Vue:'vue',
            Wilddog:'wilddog'
        }),
        new webpack.optimize.CommonsChunkPlugin('Vue','../lib/Vue.js'),
        new webpack.optimize.CommonsChunkPlugin('Wilddog','../lib/Wilddog.js'),
	]
}