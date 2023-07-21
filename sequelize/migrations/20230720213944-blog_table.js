'use strict';
const runner = require('../helpers/runner');
const tableName = 'blg_posts';
const usersTableName = 'usr_users';

const createTableUsersEmails = (queryInterface, Sequelize, t) => {
	return queryInterface
		.createTable(
			tableName,
			{
				id: {
					type: Sequelize.UUID,
					primaryKey: true,
					allowNull: false,
				},
				creator_id: {
					type: Sequelize.UUID,
					allowNull: false,
				},
				subject: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				body: {
					type: Sequelize.STRING,
					allowNull: false,
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
				deleted_at: {
					type: Sequelize.DATE,
					allowNull: true,
				}
			},
			{ transaction: t },
		)
		.then(() => queryInterface.addIndex(tableName, ['creator_id'], { transaction: t }))
};

const createTableRelations = (queryInterface, t) => {
	return Promise.resolve()
		.then(() =>
			queryInterface.addConstraint(tableName, {
				type: 'foreign key',
				name: 'user_posts_user_id_fk',
				fields: ['creator_id'],
				references: {
					table: usersTableName,
					field: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
				transaction: t,
			}),
		)
};

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const t = await queryInterface.sequelize.transaction();
		await runner
			.run([
				() => createTableUsersEmails(queryInterface, Sequelize, t),
				() => createTableRelations(queryInterface, t),
				() => t.commit(),
			])
			.catch(async (error) => {
				await t.rollback();
				throw error;
			});
	},

	down: async (queryInterface, Sequelize) => {
		await runner.run([() => queryInterface.dropTable(tableName)]);
	},
};
