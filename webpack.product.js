const webpack = require('webpack');
const path = require('path');

const srcPathAbsolute = path.resolve('./src');

module.exports = {
	entry: './src/entries/index.js', //入口文件
	output: {
        path: path.resolve('../../../../paperplane-manage-deploy/src/main/resources/public'),
		filename: 'bundle.js' //出口
	},
	//devtool: 'source-map', //直接生成srouce-map 已在script里面配置
	/*devServer: {
		port: 8088,
		inline: true
	},*/
	// devServer:{
	// 	proxy:{
	// 		'/api/**': {
	// 			target: 'http://127.0.0.1:3000',
	// 			pathRewrite: {'^/api' : ''},
	// 			secure: false
	// 		}
    // 	}
	// },
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
            loader: "style!css!less"
        }]
	},
	resolve: {
        alias: {
            config: `${srcPathAbsolute}/config/dist.js`
        },
		"extensions": ['', '.js', '.css', '.json', '.jsx','less'] //可以省略后缀名
	},
	plugins: [
        //使用uglifyJs压缩js代码
		new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		}
		})
  	]
};