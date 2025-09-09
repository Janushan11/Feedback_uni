package com.spareparts.dao;

import com.spareparts.models.Notification;
import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

/**
 * Data Access Object for Notification operations
 */
public class NotificationDAO {
    private static final Logger logger = Logger.getLogger(NotificationDAO.class.getName());

    /**
     * Create a new notification
     */
    public boolean createNotification(Notification notification) {
        String sql = "INSERT INTO notifications (user_id, title, message, type, status, created_at, action_url, is_read) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            
            stmt.setInt(1, notification.getUserId());
            stmt.setString(2, notification.getTitle());
            stmt.setString(3, notification.getMessage());
            stmt.setString(4, notification.getType());
            stmt.setString(5, notification.getStatus());
            stmt.setTimestamp(6, Timestamp.valueOf(notification.getCreatedAt()));
            stmt.setString(7, notification.getActionUrl());
            stmt.setBoolean(8, notification.isRead());
            
            int rowsAffected = stmt.executeUpdate();
            
            if (rowsAffected > 0) {
                try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        notification.setId(generatedKeys.getInt(1));
                    }
                }
                logger.info("Notification created successfully: ID " + notification.getId());
                return true;
            }
        } catch (SQLException e) {
            logger.severe("Error creating notification: " + e.getMessage());
        }
        return false;
    }

    /**
     * Get notifications by user ID
     */
    public List<Notification> getNotificationsByUserId(int userId) {
        List<Notification> notificationList = new ArrayList<>();
        String sql = "SELECT * FROM notifications WHERE user_id = ? AND status = 'active' ORDER BY created_at DESC";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, userId);
            
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    notificationList.add(mapResultSetToNotification(rs));
                }
            }
        } catch (SQLException e) {
            logger.severe("Error getting notifications by user ID: " + e.getMessage());
        }
        return notificationList;
    }

    /**
     * Get unread notifications by user ID
     */
    public List<Notification> getUnreadNotificationsByUserId(int userId) {
        List<Notification> notificationList = new ArrayList<>();
        String sql = "SELECT * FROM notifications WHERE user_id = ? AND status = 'active' AND is_read = false ORDER BY created_at DESC";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, userId);
            
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    notificationList.add(mapResultSetToNotification(rs));
                }
            }
        } catch (SQLException e) {
            logger.severe("Error getting unread notifications: " + e.getMessage());
        }
        return notificationList;
    }

    /**
     * Mark notification as read
     */
    public boolean markAsRead(int notificationId) {
        String sql = "UPDATE notifications SET is_read = true, read_at = ? WHERE id = ?";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setTimestamp(1, Timestamp.valueOf(LocalDateTime.now()));
            stmt.setInt(2, notificationId);
            
            int rowsAffected = stmt.executeUpdate();
            logger.info("Notification marked as read: " + (rowsAffected > 0 ? "success" : "failed"));
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.severe("Error marking notification as read: " + e.getMessage());
        }
        return false;
    }

    /**
     * Mark all notifications as read for a user
     */
    public boolean markAllAsRead(int userId) {
        String sql = "UPDATE notifications SET is_read = true, read_at = ? WHERE user_id = ? AND is_read = false";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setTimestamp(1, Timestamp.valueOf(LocalDateTime.now()));
            stmt.setInt(2, userId);
            
            int rowsAffected = stmt.executeUpdate();
            logger.info("All notifications marked as read: " + rowsAffected + " notifications");
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.severe("Error marking all notifications as read: " + e.getMessage());
        }
        return false;
    }

    /**
     * Get notification count for user
     */
    public int getNotificationCount(int userId) {
        String sql = "SELECT COUNT(*) FROM notifications WHERE user_id = ? AND status = 'active' AND is_read = false";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, userId);
            
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return rs.getInt(1);
                }
            }
        } catch (SQLException e) {
            logger.severe("Error getting notification count: " + e.getMessage());
        }
        return 0;
    }

    /**
     * Delete notification
     */
    public boolean deleteNotification(int notificationId) {
        String sql = "UPDATE notifications SET status = 'deleted' WHERE id = ?";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, notificationId);
            
            int rowsAffected = stmt.executeUpdate();
            logger.info("Notification deleted: " + (rowsAffected > 0 ? "success" : "failed"));
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.severe("Error deleting notification: " + e.getMessage());
        }
        return false;
    }

    /**
     * Map ResultSet to Notification object
     */
    private Notification mapResultSetToNotification(ResultSet rs) throws SQLException {
        Notification notification = new Notification();
        notification.setId(rs.getInt("id"));
        notification.setUserId(rs.getInt("user_id"));
        notification.setTitle(rs.getString("title"));
        notification.setMessage(rs.getString("message"));
        notification.setType(rs.getString("type"));
        notification.setStatus(rs.getString("status"));
        notification.setActionUrl(rs.getString("action_url"));
        notification.setRead(rs.getBoolean("is_read"));
        
        Timestamp createdAt = rs.getTimestamp("created_at");
        if (createdAt != null) {
            notification.setCreatedAt(createdAt.toLocalDateTime());
        }
        
        Timestamp readAt = rs.getTimestamp("read_at");
        if (readAt != null) {
            notification.setReadAt(readAt.toLocalDateTime());
        }
        
        return notification;
    }
}
