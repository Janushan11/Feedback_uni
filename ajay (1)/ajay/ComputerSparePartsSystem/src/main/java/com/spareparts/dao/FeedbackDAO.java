package com.spareparts.dao;

import com.spareparts.models.Feedback;
import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

/**
 * Data Access Object for Feedback operations
 */
public class FeedbackDAO {
    private static final Logger logger = Logger.getLogger(FeedbackDAO.class.getName());

    /**
     * Create a new feedback entry
     */
    public boolean createFeedback(Feedback feedback) {
        String sql = "INSERT INTO feedback (user_id, user_name, user_email, category, subject, message, rating, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            
            stmt.setInt(1, feedback.getUserId());
            stmt.setString(2, feedback.getUserName());
            stmt.setString(3, feedback.getUserEmail());
            stmt.setString(4, feedback.getCategory());
            stmt.setString(5, feedback.getSubject());
            stmt.setString(6, feedback.getMessage());
            stmt.setInt(7, feedback.getRating());
            stmt.setString(8, feedback.getStatus());
            stmt.setTimestamp(9, Timestamp.valueOf(feedback.getCreatedAt()));
            stmt.setTimestamp(10, Timestamp.valueOf(feedback.getUpdatedAt()));
            
            int rowsAffected = stmt.executeUpdate();
            
            if (rowsAffected > 0) {
                try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        feedback.setId(generatedKeys.getInt(1));
                    }
                }
                logger.info("Feedback created successfully: ID " + feedback.getId());
                return true;
            }
        } catch (SQLException e) {
            logger.severe("Error creating feedback: " + e.getMessage());
        }
        return false;
    }

    /**
     * Get all feedback entries
     */
    public List<Feedback> getAllFeedback() {
        List<Feedback> feedbackList = new ArrayList<>();
        String sql = "SELECT * FROM feedback ORDER BY created_at DESC";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            while (rs.next()) {
                feedbackList.add(mapResultSetToFeedback(rs));
            }
        } catch (SQLException e) {
            logger.severe("Error getting all feedback: " + e.getMessage());
        }
        return feedbackList;
    }

    /**
     * Get feedback by user ID
     */
    public List<Feedback> getFeedbackByUserId(int userId) {
        List<Feedback> feedbackList = new ArrayList<>();
        String sql = "SELECT * FROM feedback WHERE user_id = ? ORDER BY created_at DESC";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, userId);
            
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    feedbackList.add(mapResultSetToFeedback(rs));
                }
            }
        } catch (SQLException e) {
            logger.severe("Error getting feedback by user ID: " + e.getMessage());
        }
        return feedbackList;
    }

    /**
     * Get feedback by ID
     */
    public Feedback getFeedbackById(int feedbackId) {
        String sql = "SELECT * FROM feedback WHERE id = ?";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, feedbackId);
            
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return mapResultSetToFeedback(rs);
                }
            }
        } catch (SQLException e) {
            logger.severe("Error getting feedback by ID: " + e.getMessage());
        }
        return null;
    }

    /**
     * Update feedback status
     */
    public boolean updateFeedbackStatus(int feedbackId, String status) {
        String sql = "UPDATE feedback SET status = ?, updated_at = ? WHERE id = ?";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, status);
            stmt.setTimestamp(2, Timestamp.valueOf(LocalDateTime.now()));
            stmt.setInt(3, feedbackId);
            
            int rowsAffected = stmt.executeUpdate();
            logger.info("Feedback status updated: " + (rowsAffected > 0 ? "success" : "failed"));
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.severe("Error updating feedback status: " + e.getMessage());
        }
        return false;
    }

    /**
     * Add admin response to feedback
     */
    public boolean addAdminResponse(int feedbackId, String adminResponse) {
        String sql = "UPDATE feedback SET admin_response = ?, status = 'responded', updated_at = ? WHERE id = ?";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, adminResponse);
            stmt.setTimestamp(2, Timestamp.valueOf(LocalDateTime.now()));
            stmt.setInt(3, feedbackId);
            
            int rowsAffected = stmt.executeUpdate();
            logger.info("Admin response added: " + (rowsAffected > 0 ? "success" : "failed"));
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.severe("Error adding admin response: " + e.getMessage());
        }
        return false;
    }

    /**
     * Get feedback by status
     */
    public List<Feedback> getFeedbackByStatus(String status) {
        List<Feedback> feedbackList = new ArrayList<>();
        String sql = "SELECT * FROM feedback WHERE status = ? ORDER BY created_at DESC";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, status);
            
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    feedbackList.add(mapResultSetToFeedback(rs));
                }
            }
        } catch (SQLException e) {
            logger.severe("Error getting feedback by status: " + e.getMessage());
        }
        return feedbackList;
    }

    /**
     * Delete feedback
     */
    public boolean deleteFeedback(int feedbackId) {
        String sql = "DELETE FROM feedback WHERE id = ?";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, feedbackId);
            
            int rowsAffected = stmt.executeUpdate();
            logger.info("Feedback deleted: " + (rowsAffected > 0 ? "success" : "failed"));
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.severe("Error deleting feedback: " + e.getMessage());
        }
        return false;
    }

    /**
     * Map ResultSet to Feedback object
     */
    private Feedback mapResultSetToFeedback(ResultSet rs) throws SQLException {
        Feedback feedback = new Feedback();
        feedback.setId(rs.getInt("id"));
        feedback.setUserId(rs.getInt("user_id"));
        feedback.setUserName(rs.getString("user_name"));
        feedback.setUserEmail(rs.getString("user_email"));
        feedback.setCategory(rs.getString("category"));
        feedback.setSubject(rs.getString("subject"));
        feedback.setMessage(rs.getString("message"));
        feedback.setRating(rs.getInt("rating"));
        feedback.setStatus(rs.getString("status"));
        feedback.setAdminResponse(rs.getString("admin_response"));
        
        Timestamp createdAt = rs.getTimestamp("created_at");
        if (createdAt != null) {
            feedback.setCreatedAt(createdAt.toLocalDateTime());
        }
        
        Timestamp updatedAt = rs.getTimestamp("updated_at");
        if (updatedAt != null) {
            feedback.setUpdatedAt(updatedAt.toLocalDateTime());
        }
        
        return feedback;
    }
}
