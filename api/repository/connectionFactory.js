const mysql = require('mysql');

function createDBConnection() {
	return mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'admin',
		database: 'msql_api',
	});
}

module.exports = function () {
	return createDBConnection;
}
