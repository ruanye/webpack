//webpack 是node写的 
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin  = require('mini-css-extract-plugin')
let OptimizeCssAssetsWebpackplugin =require('optimize-css-assets-webpack-plugin')
let UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
//node和核心模块 路径模块 
module.exports={
	optimization:{
		minimizer:[
			new UglifyjsWebpackPlugin({}),
			new OptimizeCssAssetsWebpackplugin({})
		]
	},
	mode:'production',  
	entry:'./src/index.js',
	output:{
	  path:path.resolve(__dirname,'dist'),
	  filename:'bundle[hash:6].js'
	 },
	 devServer:{
		port:'3000',
		contentBase:'./dist',
		progress:true,
		compress:true
	 },
	 plugins:[
		 new HtmlWebpackPlugin({
			 template:'./src/index.html',
			 filename:'index.html',
			 hash:true,
			 minify:{
				 removeAttributeQuotes:true,
				 collapseWhitespace:true
			 }
		 }),
		 new MiniCssExtractPlugin({
			 filename:'main.css'
		 })
	 ],
	 module:{
		 rules:[
		 {
          test:'/\.js$/',
          loader:'eslint-loader',
          options:{
             enforce:'pre'
           }
          },
			 {
				test:/\.js$/,
				use:{
					loader:'babel-loader',
					options:{
						presets:['@babel/preset-env'],
						plugins:[
							 ["@babel/plugin-proposal-decorators", { "legacy": true }],
                             ["@babel/plugin-proposal-class-properties", { "loose" : true }],
							 '@babel/plugin-transform-runtime',
							
						]
					}
				},
				include:path.resolve(__dirname,'src'),
				exclude:/node_modules/

			 },
			 {
				test:/\.css$/,
				use:[
				 MiniCssExtractPlugin.loader,
				'css-loader',
				'postcss-loader'
				]
			 },
			 {
				 test:/.less$/,
				 use:[     MiniCssExtractPlugin.loader,
				 'css-loader',
				 'postcss-loader','less-loader']
			 }
		 ]
	 }
}