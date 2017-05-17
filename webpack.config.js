const config = {
  entry: './src/app.js',
  devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /(node_modules|bower_components)/,
			},
		]
	},
  output: {
    filename: '[name].[chunkhash].js',
    publicPath: './dist',
    path: path.resolve(__dirname, 'dist')
  },
};

module.exports = config;
