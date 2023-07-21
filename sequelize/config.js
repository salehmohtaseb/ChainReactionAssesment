require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

const defaultConfig = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	dialect: 'postgres',
	logging: process.env.DB_LOGGING === 'true' ? console.log : false,
	seederStorage: 'sequelize',
	protocol:'postgres'
};

// ssl needed for some pg versions 
if (process.env.DB_SSL === 'true') {
	defaultConfig.dialectOptions = {
		ssl: {
			require: true,
			rejectunauthorized: true,
		},
	};
}

module.exports[env] = defaultConfig;
