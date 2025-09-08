import sql from 'mssql';

let poolPromise = null;

export async function getPool() {
	if (!poolPromise) {
		const config = {
			user: process.env.MSSQL_USER,
			password: process.env.MSSQL_PASSWORD,
			database: process.env.MSSQL_DATABASE,
			server: process.env.MSSQL_SERVER,
			port: Number(process.env.MSSQL_PORT) || 1433,
			options: {
				encrypt: String(process.env.MSSQL_ENCRYPT).toLowerCase() === 'true',
				trustServerCertificate: true
			}
		};
		poolPromise = sql.connect(config);
	}
	return poolPromise;
}

export async function getAdminPool() {
	// Connect to master for DB creation
	const config = {
		user: process.env.MSSQL_USER,
		password: process.env.MSSQL_PASSWORD,
		database: 'master',
		server: process.env.MSSQL_SERVER,
		port: Number(process.env.MSSQL_PORT) || 1433,
		options: {
			encrypt: String(process.env.MSSQL_ENCRYPT).toLowerCase() === 'true',
			trustServerCertificate: true
		}
	};
	return sql.connect(config);
}






