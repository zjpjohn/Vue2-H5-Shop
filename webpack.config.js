const path = require('path');
const webpack = require('webpack');
const srcPathAbsolute = path.resolve('./src');

module.exports = {
	entry: './src/entries/index.js', //入口文件
	output: {
		path:"./dist",
		filename: 'bundle.js' //出口
	},
	//devtool: 'source-map', //直接生成srouce-map 已在script里面配置
	/*devServer: {
		port: 8088,
		inline: true
	},*/

	devServer:{
        inline: true,
		proxy: {
          "/api/*": {
            target:"http://192.168.30.200:8090",   //   , "http://192.168.21.55:8080"
            pathRewrite: {"^/api" : ""}
          },
        }
		// proxy: true ? [
		// 	{
		// 		context: ['/api/**'],
		// 		target: "http://47.88.191.81:8085/qy-uriel-manage-indo/",
		// 		secure: false,
		// 		pathRewrite: {'^/api' : ''}
		// 	},
		// 	{
		// 		context: ['/captchaImage', '/login'],
		// 		target: "http://47.88.191.81:8085/qy-uriel-manage-indo/",
		// 		secure: false,
		// 	},
    	// ] : null
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loader: 'style!css'
		}, {
			test: /\.js[x]?$/,//,  /\.js$/
			loader: 'react-hot!babel',
			exclude: /node_modules/ //排除那些目录
		},
		{
            test: /\.json$/,
            loader: "json"
        },
        {
            test: /\.less$/,
            loader: "style!css!less"//感叹号的作用在于使同一文件能够使用不同类型的loader
        }]
	},
	resolve: {
        alias: {
            config: `${srcPathAbsolute}/config/dev.js`
        },
		//可以在js中import加载以下扩展名的脚本
		"extensions": ['', '.js', '.css', '.json', '.jsx','less'] //可以省略后缀名
	}
};