package com.spareparts.models;

import java.time.LocalDateTime;

/**
 * Notification model class representing system notifications
 */
public class Notification {
    private int id;
    private int userId;
    private String title;
    private String message;
    private String type;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime readAt;
    private String actionUrl;
    private boolean isRead;

    // Default constructor
    public Notification() {}

    // Constructor with all fields
    public Notification(int id, int userId, String title, String message, 
                      String type, String status, LocalDateTime createdAt, 
                      LocalDateTime readAt, String actionUrl, boolean isRead) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.message = message;
        this.type = type;
        this.status = status;
        this.createdAt = createdAt;
        this.readAt = readAt;
        this.actionUrl = actionUrl;
        this.isRead = isRead;
    }

    // Constructor for creating new notification
    public Notification(int userId, String title, String message, String type) {
        this.userId = userId;
        this.title = title;
        this.message = message;
        this.type = type;
        this.status = "active";
        this.createdAt = LocalDateTime.now();
        this.isRead = false;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getReadAt() {
        return readAt;
    }

    public void setReadAt(LocalDateTime readAt) {
        this.readAt = readAt;
    }

    public String getActionUrl() {
        return actionUrl;
    }

    public void setActionUrl(String actionUrl) {
        this.actionUrl = actionUrl;
    }

    public boolean isRead() {
        return isRead;
    }

    public void setRead(boolean read) {
        isRead = read;
        if (read && readAt == null) {
            this.readAt = LocalDateTime.now();
        }
    }

    @Override
    public String toString() {
        return "Notification{" +
                "id=" + id +
                ", userId=" + userId +
                ", title='" + title + '\'' +
                ", message='" + message + '\'' +
                ", type='" + type + '\'' +
                ", status='" + status + '\'' +
                ", createdAt=" + createdAt +
                ", readAt=" + readAt +
                ", actionUrl='" + actionUrl + '\'' +
                ", isRead=" + isRead +
                '}';
    }
}
