## webpack 安装 
- 安装本地的webpack 
- yarn add webpack webpack-cli -D  
- npm install webpack webpack-cli -D
- -D 表示development  开发环境 

## webpack 可以进行0配置
- 直接运行 npx webpack 
- 打包工具->输出后的结果(js模块)
- 打包（直接js的模块化）
- src 表示源码文件夹 

## 手动配置webpack 
- 默认配置文件的名字是webpack.config.js
- webpack 是node写出来的 

## 配置出口入口以及打包环境
- entry 入口 可以是相对路径 
- output 出口 输出 
   - path 输出路径 必须是绝对路径
   - filename: 输出的文件名字  
- mode 的值 一般是2个值 development和 production 
 1. development 开发环境
 2. production 生产环境 
如果不配置，默认是生产环境 

## 开发服务器配置
- yarn add webpack-dev-server -D
```
 port:3000, #端口号
 progress:true, #显示进度条
 contentBase:'./dist', #目录
 compress:true  #是否开启gzip压缩
```

## 配置脚本 package.json 
- "build": "webpack --config webpack.config.js",
- "dev": "webpack-dev-server"
- 这样就可以通过npm run dev/npm run build执行相关的命令

## 处理html 
-  yarn add  html-webpack-plugin
```
template:'./src/index.html',//模板
filename:'index.html', //编译后的名字
hash:true,//加hash值 
minify:{ //压缩配置   
    removeAttributeQuotes:true, //去除双引号
    collapseWhitespace: true,  //去除空格
     }
```

## 直接给文件加hash值 
```
filename:'bundle[hash].js'
可以用数字设置hash值的长短 
filename:'bundle[hash:8].js'
```
## 处理样式
- . 通过require require('/index.css') 报错如下 

```
Module not found：Can't resolve '/index.css' in '/Users/ruanye/Desktop/webpacklesson/src

```
- . 配置module,配置rules数组，表示很多规则，用正在匹配js、css等

```
 {
     test:'/\.css/',//配置到css
     use:[]
 }
```
- .use 可以直接写loader，也可以写对象，写对象的时候可以写配置
yard add css-loader style-loader -D
```
 {
   loader:'style-loader',
    options:{
     insertAt:'top'  //css 放置位置可以绝对css的优先级
  }
```
- 配置less编译(less->css) 因为从右向左，从下到上执行 所以写在下边和右边
yarn add less less-loader -D

##  抽离css 
- yarn add  mini-css-extract-plugin -D

## 使用postcss添加浏览器前缀 
- yarn add postcss-loader autoprefixer -D 
- 放到所有cssloader后面，执行顺序原因
- 需要配置postcss默认文件 名字postcss.config.js
```
module.exports={
    plugins:[require('autoprefixer')]
}
```

## 配置优化项
- yarn add optimize-css-assets-webpack-plugin  uglifyjs-webpack-plugin -D 
optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true, //缓存 
        parallel: true, //是否并发打包
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
## 处理js es6转化成es5
- yarn add babel-loader @babel/core @babel/preset-env
@babel/core babel 核心模块
@babel-preset-env 标准语法转化成低级语法
- class 和 es6@(装饰器需要安装额外的插件) 并且添加plugins集合
```
{
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose" : true }]
  ]
}
``` 
- promise genarater 需要 @babel/plugin-transform-runtime
yarn add  @babel/plugin-transform-runtime 
生产环境也需要runtime 
yarn add @babel/runtime 
- es7的一些语法需要其他的 补丁包 
yarn  @babel/polyfill
require("@babel/polyfill");

## 配置需要设置loader的文件路径  

- include 包含  include:path.resolve(__dirname,'src'), 
- exclude 不包含  exclude:/node_modules/

## babel 也可以独立进行配置，文件名字.babelrc











