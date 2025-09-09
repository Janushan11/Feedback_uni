package com.spareparts.models;

import java.time.LocalDateTime;

/**
 * Feedback model class representing user feedback entries
 */
public class Feedback {
    private int id;
    private int userId;
    private String userName;
    private String userEmail;
    private String category;
    private String subject;
    private String message;
    private int rating;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String adminResponse;

    // Default constructor
    public Feedback() {}

    // Constructor with all fields
    public Feedback(int id, int userId, String userName, String userEmail, 
                   String category, String subject, String message, int rating, 
                   String status, LocalDateTime createdAt, LocalDateTime updatedAt, 
                   String adminResponse) {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.category = category;
        this.subject = subject;
        this.message = message;
        this.rating = rating;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.adminResponse = adminResponse;
    }

    // Constructor for creating new feedback
    public Feedback(int userId, String userName, String userEmail, 
                   String category, String subject, String message, int rating) {
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.category = category;
        this.subject = subject;
        this.message = message;
        this.rating = rating;
        this.status = "pending";
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
        this.updatedAt = LocalDateTime.now();
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getAdminResponse() {
        return adminResponse;
    }

    public void setAdminResponse(String adminResponse) {
        this.adminResponse = adminResponse;
        this.updatedAt = LocalDateTime.now();
    }

    @Override
    public String toString() {
        return "Feedback{" +
                "id=" + id +
                ", userId=" + userId +
                ", userName='" + userName + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", category='" + category + '\'' +
                ", subject='" + subject + '\'' +
                ", message='" + message + '\'' +
                ", rating=" + rating +
                ", status='" + status + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", adminResponse='" + adminResponse + '\'' +
                '}';
    }
}
