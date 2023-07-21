'use strict';
const runner = require('../helpers/runner');
const passGenerator = require('../helpers/generatePassword');

const tableName = 'usr_users';
const user = {
		id: '7dfcae6b-4f2f-4e9d-8d35-0ef1ed8e9e69',
    email: 'tester@cReaction.com',
    password: '',
    first_name: 'Tester',
    last_name: 'Chain Reaction',
	}

module.exports = {
	up: async (queryInterface) => {
    user.password = await passGenerator.encrypt('test-cReaction-1234')
		await runner.run([() => queryInterface.bulkInsert(tableName, [user])]);
	},

	down: async (queryInterface) => queryInterface.bulkDelete(tableName),
};
