//webpack 是node写的 
let path = require('path');
//node和核心模块 路径模块 
module.exports={
	mode:'development',  
	entry:'./src/index.js',
	output:{
	  path:path.resolve(__dirname,'dist'),
	  filename:'bundle.js'
	 },
	 devServer:{
		port:'3000',
		contentBase:'./dist',
		progress:true,
		compress:true
	 }
}