## webpack 安装 
- 安装本地的webpack 
- yarn add webpack webpack-cli -D  
- -D 表示development  开发环境 

## webpack 可以进行0配置
- 直接运行 npx webpack 
- 打包工具->输出后的结果(js模块)
- 打包（直接js的模块化）
- src 表示源码文件夹 

## 手动配置webpack 
- 默认配置文件的名字是webpack.config.js
- webpack 是基于node编写的

## 配置脚本命令 package.json 
- "build": "webpack --config webpack.config.js",
- "dev": "webpack-dev-server"
- 这样就可以通过npm run dev/npm run build执行相关的命令

## 配置出口入口
- entry 入口 可以是相对路径 
- output 出口 输出 
   - path 输出路径 必须是绝对路径
   - filename: 输出的文件名字

## 配置打包环境  
- mode 的值 一般是2个值 development和 
production 
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

## 处理html 
-  yarn add  html-webpack-plugin -D 
- 在src目录下面建一个index.html
- 当有插件的时候需要配置plugins 插件集合类型是数组
- 每一个插件都是通过new来调用，例：new HtmlWebpackPlugin()
- 可以运行npm run dev/npm run build 查看结果

```
{
  template:'./src/index.html',//模板
  filename:'index.html', //编译后的文件名 
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
- . 通过require require('/index.css') 报错如下 

```
You may need an appropriate loader to handle this file type.
appropriate  合适的
你可能需要一个合适的loader 
```
- . 配置module,配置rules数组，表示很多规则，用正在匹配js、css等
use后面的写法
1. 字符串 只能写一个loader 
use:'css-loader'
2. 数组 可以写多个loader 
use:['style-loader','css-loader']
loader 的执行顺序是从右到左执行 从下到上 

```
 {
     test:'/\.css$/',//配置到css
     use:[]
 }
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
- 配置less编译(less->css) 因为从右向左，从下到上执行 所以写在下边和右边
yarn add less less-loader -D
- 编译sass 
node-sass sass-loader  -D
- 编译stylus
stylus stylus-loader   -D 

##  抽离css 
- yarn add  mini-css-extract-plugin -D
```
  new MiniCssExtractPlugin({
      filename: 'main.css'
    })
  用  MiniCssExtractPlugin.loader 代替style-loader 可以对css进行抽离 
```

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
## js语法校验 
- yarn add eslint eslint-loader -D
- eslint 官网 eslint.org
- 添加enforce pre 强制先执行
```
{  
  test:'/.js$/',
  loader:'eslint-loader',
   optiton:{
     enfore:'pre'
   }
}
```
## 第三方模块的使用 
- yarn add jquery 
- expose-loader 暴露全局的loader
内联loader 
``` 
    import $ from "expose-loader?$!jquery"
``` 
正常配置
```
{
  test:require.resolve('jquery'),
  loader:"expose-loader?$"
}
```
在每个模块中注入$对象 在plugins配置
```
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

## 图片处理 
file-loader 
url-loader 
html-withimg-loader














