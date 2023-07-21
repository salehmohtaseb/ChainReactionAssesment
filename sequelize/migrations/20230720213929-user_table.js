'use strict';
const runner = require('../helpers/runner');
const tableName = 'usr_users';

const createTableUser = (queryInterface, Sequelize, t) => {
	return queryInterface
		.createTable(
			tableName,
			{
				id: {
					type: Sequelize.UUID,
					primaryKey: true,
					allowNull: false,
				},
				email: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				password: {
					type: Sequelize.STRING,
					allowNull: true,
				},
				first_name: {
					type: Sequelize.STRING,
					allowNull: true,
				},
				last_name: {
					type: Sequelize.STRING,
					allowNull: true,
				},
				created_at: {
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal('NOW()'),
					allowNull: false,
				},
				updated_at: {
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal('NOW()'),
					allowNull: false,
				},
			},
			{ transaction: t },
		)
		.then(() => queryInterface.addConstraint(tableName, {
			type: 'unique',
			fields: ['email'],
			transaction: t
		}))
};

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await runner
			.run([
				() => createTableUser(queryInterface, Sequelize),
			])
	},

	down: async (queryInterface, Sequelize) => {
		await runner.run([() => queryInterface.dropTable(tableName)]);
	},
};
