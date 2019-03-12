## webpack 基础篇 

## webpack 安装 
- 安装本地的webpack 
- yarn add webpack webpack-cli -D  
- -D 表示development  开发环境 

## webpack 可以进行0配置 
- 目录结构
  - src 
     - index.js 

- 直接运行 npx webpack 
- 打包工具 -> 输出后的结果(js模块)
- 打包（直接js的模块化）


## 手动配置webpack 
- [x] 默认配置文件的名字是webpack.config.js/webpackfile.js 通常使用webpack.config.js 
- webpack 是基于node编写的

## * 配置脚本命令 package.json 
- -- config  指定默认文件是哪个
- "build": "webpack --config webpack.config.js",
- "dev": "webpack-dev-server"
- "start":"npm run dev"
- 这样就可以通过npm run dev/npm run build执行相关的命令


## * 配置出口入口
- entry 入口 可以是相对路径 
- output 出口 输出 
   - path 输出路径 必须是绝对路径
   - filename: 输出的文件名字
```
module.exports={
  entry:'./src/index.js',
	output:{
	  path:path.resolve(__dirname,'dist'),
	  filename:'bundle[hash:6].js',
	  publicPath:'http://www.baidu.com'
	 }
}
```

## * 配置打包环境  
- mode 的值  2个值 development和 
production 
 1. development 开发环境
 2. production 生产环境 

```
module.exports={
  mode:'development',
  ...
}
```

## * 开发服务器配置
- yarn add webpack-dev-server -D
```
devServer:{
  port:3000, #端口号
  contentBase:'./dist', #目录
  open:true, #是否自动打开浏览器
  progress:true, #显示进度条
  compress:true  #是否开启gzip压缩
  proxy:{
    //可以配置跨域
  }
 }
```

## 处理html 
- src 
  - index.js
  - index.html 

- [x] yarn add  html-webpack-plugin -D 
- 当有插件的时候需要配置plugins 插件集合类型是数组
- 每一个插件都是通过new来调用，例：new HtmlWebpackPlugin()
- 可以运行npm run dev/npm run build 查看结果
```
{
  * template:'./src/index.html',//模板
  * filename:'index.html', //编译后的文件名 
  hash:true,//加hash值 
  minify:{ //压缩配置   
    removeAttributeQuotes:true, //去除双引号
    collapseWhitespace: true,  //折叠去除空格
  }
}
```

## 直接给文件加hash值 
```
filename:'bundle[hash].js'
可以用:后面跟数字设置hash值的长度
filename:'bundle[hash:8].js'
```

## 处理样式
- src 
  - index.html
  - index.js
  - style.css 
  
- . index.js 通过require require('/style.css') 报错如下 
```
You may need an appropriate loader to handle this file type
appropriate  合适的
你可能需要一个合适的loader 
```
- . 配置module,配置rules数组，表示很多规则，用正在匹配js、css等,rules里面配置不容的loader,每个loader的配置都是一个对象 
```
module:{
  rules:[]
}
```
loader的配置方法 test 匹配规则 use 使用什么loader 
- use的用法
1. 字符串 只能写一个loader 
use:'css-loader'
2. 数组 可以写多个loader 数组里面可以放字符串和对象
css-loader 解析require/import 语法
style-loader 把css插入到header标签中 

use:['style-loader','css-loader']
loader 的执行顺序是从右到左执行 从下到上 

```
rules:[
 {
     test:'/\.css$/',//匹配以css结尾的文件
     use:[]
 }
]
```
- .use 可以直接写loader，也可以写成对象，写对象的时候可以进行配置
yard add css-loader style-loader -D
```
 {
   loader:'style-loader',
    options:{
     insertAt:'top'  //css 放置位置可以决定css的优先级
  }
```

- src 
  - index.html
  - index.js
  - style.css 
  - b.less

- 配置less编译(less->css) 因为从右向左，从下到上执行 所以写在下边和右边
yarn add less less-loader -D
- 编译sass 
node-sass sass-loader  -D
- 编译stylus
stylus stylus-loader   -D 
``` 
  {
    test:/\.less$/,
    use:[
       'style-loader',
       'css-loader',
       'less-loader'
    ]
 }
```

##  抽离css 
- [x] yarn add  mini-css-extract-plugin -D
- MiniCssExtractPlugin插件自带一个loader
- MiniCssExtractPlugin.loader会自动把css抽离出来 作为引用的方式引入页面
```
  new MiniCssExtractPlugin({
      filename: 'main.css' ##抽离出来的css的文件名
    })
  
```
- [x] 在loader里面的写法
```
  {
    test:/.css$/,
     MiniCssExtractPlugin.loader,
    'css-loader'
  }
```

## 使用postcss-loader,autoprefixer添加浏览器前缀 
- [x] yarn add postcss-loader autoprefixer -D 
```
{
  test:/\.less$/,
  use:[
     MiniCssExtractPlugin.loader,
    'css.loader',
    'less-loader',
    'postcss-loader'
  ]
}
```

- 放到所有cssloader后面，执行顺序原因
```
 npm run dev 的时候会报错
 Error: No PostCSS Config found in: /Users/ruanye/Desktop/project/src
 没有找到postcss的默认文件 
```
- [x] 需要配置postcss默认文件 名字
在根目录下创建 postcss.config.js
- [x] postcss.config.js 文件里面的内容：
```
 module.exports={
    plugins:[require('autoprefixer')]
  }
```

## * 配置优化项
- yarn add optimize-css-assets-webpack-plugin  uglifyjs-webpack-plugin -D 
optimize : 优化  assets :资源 

```
optimization: { 优化
    minimizer: [
      new UglifyJsPlugin({
        cache: true, //缓存 
        parallel: true, //是否并发打包
        sourceMap: true // 源码映射
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
```
- mode 改成 production 
- npm run build 打包之后 csss是压缩过的
## 处理js es6转化成es5
- [x] yarn add babel-loader @babel/core @babel/preset-env

@babel/core babel 核心模块
@babel-preset-env 标准语法转化成低级语法
- presets 预设 
- 箭头函数 arrow-functions 
- class等(装饰器需要安装额外的插件) 并且添加plugins集合
- yarn add @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators
```
{
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose" : true }]
  ]
}
``` 
- babel 插件中最常用的插件 
promise genarater 需要 @babel/plugin-transform-runtime 
- [x] yarn add  @babel/plugin-transform-runtime 
生产环境也需要runtime  不加-D 
yarn add @babel/runtime 
- es7的一些语法需要其他的 例如：inclueds  补丁包 
yarn add @babel/polyfill
require("@babel/polyfill")

## 配置需要解析和不需要解析loader的文件路径  
- [x] include 包含  include:path.resolve(__dirname,'src'), 
- [x] exclude 不包含  exclude:/node_modules/
```
{
       test:/\.js$/,
				use:{
					loader:'babel-loader',
					options:{
            ...
          },
				  include:path.resolve(__dirname,'src'),
			  	exclude:/node_modules/
        }
```
## babel 也可以独立进行配置，文件名字.babelrc
- 配置的时候loader 直接写成 use:'babel-loader',其他配置写在.babelrc里面
```
 {
   presets:['@babel/preset-env'],
   plugins:[
     ....
   ]
 }
```
- 如果webpack options对babel-loader进行了配置 不需要.babelrc文件 如果有的就删除  
## js语法校验 
- yarn add eslint eslint-loader -D
- eslint 官网 eslint.org
- [x] 添加enforce pre 强制先执行  previous  前置loader 
- 另一种配置方法 .eslint.js  
- .eslintignore elsint的忽略项
```
{
  test:'/\.js$/',
  loader:'eslint-loader',
  options:{
     enforce:'pre'
    }
}
```
## 第三方模块的使用 
- yarn add jquery  
- yarn add expose-loader -D
- expose-loader 暴露全局的loader

1. 内联loader的方式配置
``` 
  import $ from "expose-loader?$!jquery"
``` 
2. 正常loader配置
```
{
  test:require.resolve('jquery'),
  loader:"expose-loader?$"
}
```
- 在每个模块中注入$对象 不需要引入可以直接使用$这里window.$是undefined  
- 在plugins配置,ProvidePlugin webpack 自带插件
- 自带插件都需要引入webpcak模块
```
let webpack = require('webpack')
...
 new webpack.ProvidePlugin({
      $:"jquery"
    })
```
## 配置忽略打包项
```
externals:{
    jquery:"jQuery"
}
```
## 在webpack中引入图片的几种方式
- src 
  - index.js
  - style.css
  - b.less
  - index.html 
  - logo.png
 
1. 在js中创建图片来引入
import logo from './logo.png';
let img = new image ;
img.src = logo
document.body.appengChild(img)
会在内存里面创建一个新的图片 
```
You may need an appropriate loader to handle this file type
你需要一个合适的loader去处理这个文件类型
```
2. 在css 引入 background(url)

3. <img src=''/>  需要把图片放到dist文件夹
## 图片处理 
yarn add file-loader  html-withimg-loader url-loader -D
file-loader 
```
{
  test:/\.(png,jpg,gif)$/,
  user:'file-loader'
}
```
- [x] 在html 引入图片打包会找不到文件 需要使用html-withimg-loader
```
{
  test:/\.html$/,
  user:'html-withimg-loader'
}
```
- [x] 在图片非常小的情况下不希望走http请求，一般情况下不会直接使用file-loader 通常我们使用url-loader
- 在图片小于多少k的时候可以做一个限制，用base64来转化,base64大小会比原来文件大3分之1  
- limit 限制图片大小多大以内转成base64
{
  test:/\.(png,jpg,gif)$/,
  user:{
    loder:'url-loader',
    options:{
      limit:10000 表示多少字节  1024 字节是1kb 
    }
  }
}
- url-loader 可以处理mp4|webm|ogg|mp3|wav|flac|aac  
- url-loder 可以处理各种字体格式 woff2?|eot|ttf|otf
```
{
     test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000
         
        }
      }
```

## * 打包文件分类 
1. 图片loader的options 里面添加
 options:{
      limit:1000
      outputPath:'/img/',
    }
2. css 添加在css插件里面 
  new MiniCssExtractPlugin({
      filename:'css/main.css'
    })
3. js添加到filename 前面
 filename:'js/main[hash].js',
4. 添加域名 publicPath的用法  
 output: {
    filename: 'bundle.js', 
    path: path.resolve(__dirname, 'build'),
      publicPath:'http://www.baidu.cn'
     }

- 如果只需要图片添加域名
options:{
    limit:1,
    outputPath:'/img/',
    publicPath:'http://www.baidu.cn' 
 }
 ## webpack  配置篇

## 打包多页应用
- 入口需要配置成对象
```
entry:{
		home:'./src/index.js'
		other:'./src/other.js'
	}
```
- 出口需要多个出口，改变filename的写法
filename:'[name.js]' 
- 保证html页面引入自己对应的js
使用 chunks 代码块 来完成  
chunks:['home']  
如果home也许使用other 
chunks:['home','other']

## 配置soure-map源码映射 
```
devtools:'source-map'

```
- source-map 会单独生成一个sourcemap文件 可以帮我们调试源代码 会显示当前报错的列和行

- eval-source-map 不会产生单独的文件 但是会显示报错的行和列

- cheap-module-source-map 不会产生列 但是是一个单独的文件 

- cheap-module-eval-source-map 不会产生文件也不会产生列 会直接集成在文件里 

## 实时编译
watch:true 
- 监控的选项
```
watchOptions:{ 
	poll:1000  //每秒问我多少次
	aggreatmentTimeout:500 //防抖 一直输入代码
	ignored:/node_modules/
}
```
##  webpcak 常用插件
1. 清除缓存插件,可以写字符串 也可以写成数组
   new CleanWebpackPlugin('./dist'),
2. 拷贝插件
  new CopyWebpackPlugin([ //
       {from:'img',to:'./'}
     ]),
3. 版权插件 webpack自带插件 所有人需要写
 let webpack = require('webpack')
 new webpack.BannerPlugin('make 2019 by ry')

## webpack处理 跨域问题
- webpack 自带express
1. *代理的方式  重写的方式 把请求代理到express服务器上 
- target 访问http://localhost:3000 等于访问 当前服务器下面 '/api' 
- pathRewrite 重写路径 /api/user 等于访问 localhost:3000/user
```
 devServer:{
 ...
 proxy:{ // 
      '/api':{
         target:'http://localhost:3000',
         pathRewrite:{'/api':''}
       }// 配置了一个代理
   } 
}
```
2.  直接使用webpack提供mock数据
- webpack 提供一个方法 before
- 参数是app app 就是 let app= express()
```
   before(app){  
       app.get('/user',(req,res)=>{
         res.json({name:'leilei'})
       })
    }
```
3. 可以直接在node的服务端启动webpack 端口是服务端端口 不在需要npm run dev 来启动webpack 
- yarn add webpack-dev-middleware -D
server.js修改如下 
```
let webpack = require('webpack');

let middle = require('webpack-dev-middleware');

let config = require('./webpack.config.js');

let compiler = webpack(config);

app.use(middle(compiler));
```


## resolve用法
extensions 拓展名 
alias:别名  bootstrap:'bootstrap/dist/css/bootstrap.css'
mainFields 可以配置先找哪个入口
mainFiles：入口文件的名字 
```
resolve:{
 modules:[path.resolve('node_modules')],
    extensions:['.js','.css','.json','.vue'],
    mainFields:['style','main']
    mainFiles:[], // 入口文件的名字 index.js
    alias:{ 
       bootstrap:'bootstrap/dist/css/bootstrap.css'
    }
 }
```
## 区分环境
webpack.config.js改成 webpack.base.js
新建文件 webpack.prod.js 和 webpack.dev.js
- 配置开发环境的写法
```
webpack.dev.js 
let {smart} = require('webpack-merge');
let base = require('./webpack.base.js');

module.exports = smart(base,{
   mode: 'development',
   devServer:{

   },
   devtool:'source-map'
})
```
- 配置生产环境的写法 
```
let {smart} = require('webpack-merge');
let base = require('./webpack.base.js');

module.exports = smart(base,{
   mode: 'production',
   optimization:{
     minimizer:[

     ]
   },
   plugins:[]
})
```
## webpack 优化
1. noparse
module: {
    noParse: /jquery/, // 不去解析jquery中的依赖库 
    ...
}
2. dllplugin

3. 



































