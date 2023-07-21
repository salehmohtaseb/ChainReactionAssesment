'use strict';

const runner = require('../helpers/runner');

const createUuidExtension = (queryInterface) => {
	return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
};

const dropUuidExtension = (queryInterface) => {
	return queryInterface.sequelize.query('DROP EXTENSION IF EXISTS "uuid-ossp"');
};

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await runner.run([() => createUuidExtension(queryInterface)]);
	},

	down: async (queryInterface, Sequelize) => {
		await runner.run([() => dropUuidExtension(queryInterface)]);
	},
};
