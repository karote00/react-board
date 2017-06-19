const envConfig = {
	port: 5772,
	isProd: process.env.NODE_ENV === 'production'
}

module.exports = envConfig;
