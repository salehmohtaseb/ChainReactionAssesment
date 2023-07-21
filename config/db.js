
const config = {
    host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT),
	database: process.env.DB_NAME,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	dialect: 'postgres',
	dialectOptions: {},
	logging: process.env.DB_LOGGING === 'true' ? console.log : false,
};

if (process.env.DB_SSL === 'true') {
	config.dialectOptions = {
		ssl: {
			require: true,
			rejectunauthorized: true,
		},
	};
}
  
module.exports = config