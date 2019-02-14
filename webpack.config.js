//webpack 是node写的 
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
//node和核心模块 路径模块 
module.exports={
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
		 })
	 ]
}