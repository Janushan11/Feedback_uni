package com.spareparts.servlets;

import com.spareparts.dao.FeedbackDAO;
import com.spareparts.dao.NotificationDAO;
import com.spareparts.models.Feedback;
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
 * Servlet for handling dashboard operations
 */
@WebServlet("/dashboard")
public class DashboardServlet extends HttpServlet {
    private static final Logger logger = Logger.getLogger(DashboardServlet.class.getName());
    private FeedbackDAO feedbackDAO;
    private NotificationDAO notificationDAO;

    @Override
    public void init() throws ServletException {
        super.init();
        feedbackDAO = new FeedbackDAO();
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
        
        try {
            // Get user's recent feedback
            List<Feedback> recentFeedback = feedbackDAO.getFeedbackByUserId(user.getId());
            if (recentFeedback.size() > 5) {
                recentFeedback = recentFeedback.subList(0, 5); // Show only last 5
            }
            
            // Get user's notifications
            List<Notification> notifications = notificationDAO.getNotificationsByUserId(user.getId());
            if (notifications.size() > 10) {
                notifications = notifications.subList(0, 10); // Show only last 10
            }
            
            // Get notification count
            int notificationCount = notificationDAO.getNotificationCount(user.getId());
            
            // Set attributes for JSP
            request.setAttribute("user", user);
            request.setAttribute("recentFeedback", recentFeedback);
            request.setAttribute("notifications", notifications);
            request.setAttribute("notificationCount", notificationCount);
            
            // Calculate dashboard statistics
            int totalFeedback = feedbackDAO.getFeedbackByUserId(user.getId()).size();
            request.setAttribute("totalFeedback", totalFeedback);
            
            logger.info("Dashboard loaded for user: " + user.getUsername());
            
            request.getRequestDispatcher("dashboard.jsp").forward(request, response);
            
        } catch (Exception e) {
            logger.severe("Error loading dashboard: " + e.getMessage());
            request.setAttribute("error", "An error occurred while loading the dashboard.");
            request.getRequestDispatcher("dashboard.jsp").forward(request, response);
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
        
        if ("markAllRead".equals(action)) {
            // Mark all notifications as read
            try {
                notificationDAO.markAllAsRead(user.getId());
                logger.info("All notifications marked as read for user: " + user.getUsername());
                response.sendRedirect("dashboard.jsp");
            } catch (Exception e) {
                logger.severe("Error marking notifications as read: " + e.getMessage());
                response.sendRedirect("dashboard.jsp");
            }
        }
    }
}
