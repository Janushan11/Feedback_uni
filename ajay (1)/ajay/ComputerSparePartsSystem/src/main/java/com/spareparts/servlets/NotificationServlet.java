package com.spareparts.servlets;

import com.spareparts.dao.NotificationDAO;
import com.spareparts.models.Notification;
import com.spareparts.models.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;
import java.util.logging.Logger;

/**
 * Servlet for handling notification operations
 */
@WebServlet("/notifications")
public class NotificationServlet extends HttpServlet {
    private static final Logger logger = Logger.getLogger(NotificationServlet.class.getName());
    private NotificationDAO notificationDAO;

    @Override
    public void init() throws ServletException {
        super.init();
        notificationDAO = new NotificationDAO();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("user") == null) {
            response.sendRedirect("login.jsp");
            return;
        }
        
        User user = (User) session.getAttribute("user");
        String action = request.getParameter("action");
        
        try {
            if ("markRead".equals(action)) {
                // Mark specific notification as read
                String notificationIdStr = request.getParameter("id");
                if (notificationIdStr != null) {
                    int notificationId = Integer.parseInt(notificationIdStr);
                    notificationDAO.markAsRead(notificationId);
                    logger.info("Notification marked as read: " + notificationId);
                }
                response.sendRedirect("notifications.jsp");
                return;
            }
            
            // Get all notifications for user
            List<Notification> notifications = notificationDAO.getNotificationsByUserId(user.getId());
            request.setAttribute("notifications", notifications);
            request.setAttribute("user", user);
            
            request.getRequestDispatcher("notifications.jsp").forward(request, response);
            
        } catch (Exception e) {
            logger.severe("Error handling notifications: " + e.getMessage());
            request.setAttribute("error", "An error occurred while loading notifications.");
            request.getRequestDispatcher("notifications.jsp").forward(request, response);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("user") == null) {
            response.sendRedirect("login.jsp");
            return;
        }
        
        User user = (User) session.getAttribute("user");
        String action = request.getParameter("action");
        
        try {
            if ("markAllRead".equals(action)) {
                // Mark all notifications as read
                notificationDAO.markAllAsRead(user.getId());
                logger.info("All notifications marked as read for user: " + user.getUsername());
            } else if ("delete".equals(action)) {
                // Delete notification
                String notificationIdStr = request.getParameter("id");
                if (notificationIdStr != null) {
                    int notificationId = Integer.parseInt(notificationIdStr);
                    notificationDAO.deleteNotification(notificationId);
                    logger.info("Notification deleted: " + notificationId);
                }
            }
            
            response.sendRedirect("notifications.jsp");
            
        } catch (Exception e) {
            logger.severe("Error processing notification action: " + e.getMessage());
            response.sendRedirect("notifications.jsp");
        }
    }
}
