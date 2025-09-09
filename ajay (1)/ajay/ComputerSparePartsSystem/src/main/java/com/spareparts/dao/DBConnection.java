package com.spareparts.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Logger;

/**
 * Database connection utility class
 */
public class DBConnection {
    private static final Logger logger = Logger.getLogger(DBConnection.class.getName());
    
    // Database configuration
    private static final String DB_URL = "jdbc:mysql://localhost:3306/spareparts_db?useSSL=false&serverTimezone=UTC";
    private static final String DB_USERNAME = "root";
    private static final String DB_PASSWORD = "password";
    private static final String DB_DRIVER = "com.mysql.cj.jdbc.Driver";

    /**
     * Get database connection
     * @return Connection object
     * @throws SQLException if connection fails
     */
    public static Connection getConnection() throws SQLException {
        try {
            Class.forName(DB_DRIVER);
            Connection connection = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
            logger.info("Database connection established successfully");
            return connection;
        } catch (ClassNotFoundException e) {
            logger.severe("MySQL JDBC Driver not found: " + e.getMessage());
            throw new SQLException("Database driver not found", e);
        } catch (SQLException e) {
            logger.severe("Database connection failed: " + e.getMessage());
            throw e;
        }
    }

    /**
     * Close database connection
     * @param connection Connection to close
     */
    public static void closeConnection(Connection connection) {
        if (connection != null) {
            try {
                connection.close();
                logger.info("Database connection closed successfully");
            } catch (SQLException e) {
                logger.warning("Error closing database connection: " + e.getMessage());
            }
        }
    }

    /**
     * Test database connection
     * @return true if connection successful, false otherwise
     */
    public static boolean testConnection() {
        try (Connection connection = getConnection()) {
            return connection != null && !connection.isClosed();
        } catch (SQLException e) {
            logger.severe("Database connection test failed: " + e.getMessage());
            return false;
        }
    }
}
