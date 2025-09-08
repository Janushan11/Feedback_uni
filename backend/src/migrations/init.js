import 'dotenv/config';
import { getAdminPool, getPool } from '../services/db.js';

export async function ensureDatabaseAndSchema() {
	const dbName = process.env.MSSQL_DATABASE;
	const admin = await getAdminPool();
	// Create DB if not exists
	await admin.request().query(`IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = '${dbName}') BEGIN CREATE DATABASE [${dbName}] END`);
	// Now connect to the target DB
	const pool = await getPool();

	// Create tables if not exist
	await pool.request().batch(`
	IF OBJECT_ID('Users', 'U') IS NULL
	CREATE TABLE Users (
		user_id INT IDENTITY(1,1) PRIMARY KEY,
		name NVARCHAR(100) NOT NULL,
		email NVARCHAR(255) NOT NULL UNIQUE,
		password_hash NVARCHAR(255) NOT NULL,
		role NVARCHAR(20) NOT NULL CHECK (role IN ('customer','admin'))
	);

	IF OBJECT_ID('Products', 'U') IS NULL
	CREATE TABLE Products (
		product_id INT IDENTITY(1,1) PRIMARY KEY,
		name NVARCHAR(200) NOT NULL,
		category NVARCHAR(100),
		price DECIMAL(18,2) NOT NULL DEFAULT 0
	);

	IF OBJECT_ID('Repairs', 'U') IS NULL
	CREATE TABLE Repairs (
		repair_id INT IDENTITY(1,1) PRIMARY KEY,
		user_id INT NOT NULL,
		device NVARCHAR(200) NOT NULL,
		issue NVARCHAR(500) NOT NULL,
		status NVARCHAR(50) NOT NULL DEFAULT 'pending',
		FOREIGN KEY (user_id) REFERENCES Users(user_id)
	);

	IF OBJECT_ID('Feedback', 'U') IS NULL
	CREATE TABLE Feedback (
		feedback_id INT IDENTITY(1,1) PRIMARY KEY,
		user_id INT NOT NULL,
		target_type NVARCHAR(20) NOT NULL CHECK (target_type IN ('repair','product')),
		target_id INT NOT NULL,
		rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
		comments NVARCHAR(MAX) NULL,
		status NVARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
		created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
		FOREIGN KEY (user_id) REFERENCES Users(user_id)
	);

	-- Helpful indexes
	IF NOT EXISTS (SELECT name FROM sys.indexes WHERE name = 'IX_Feedback_Target')
		CREATE INDEX IX_Feedback_Target ON Feedback(target_type, target_id);

	IF NOT EXISTS (SELECT name FROM sys.indexes WHERE name = 'IX_Feedback_Status')
		CREATE INDEX IX_Feedback_Status ON Feedback(status);
	`);
}

// Allow running via npm run migrate
if (import.meta.resolve) {
	// noop
}

if (process.argv[1] && process.argv[1].includes('init.js')) {
	ensureDatabaseAndSchema().then(() => {
		console.log('Database and schema ensured');
		process.exit(0);
	}).catch((err) => {
		console.error('Migration error:', err);
		process.exit(1);
	});
}




