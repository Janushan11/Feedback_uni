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
 * Servlet for handling feedback operations
 */
@WebServlet("/feedback")
public class FeedbackServlet extends HttpServlet {
    private static final Logger logger = Logger.getLogger(FeedbackServlet.class.getName());
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
        String action = request.getParameter("action");
        
        if ("list".equals(action)) {
            // Get user's feedback list
            List<Feedback> userFeedback = feedbackDAO.getFeedbackByUserId(user.getId());
            request.setAttribute("feedbackList", userFeedback);
            request.getRequestDispatcher("feedback-list.jsp").forward(request, response);
        } else {
            // Show feedback form
            request.getRequestDispatcher("feedback.jsp").forward(request, response);
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
        
        if ("submit".equals(action)) {
            // Submit new feedback
            String category = request.getParameter("category");
            String subject = request.getParameter("subject");
            String message = request.getParameter("message");
            String ratingStr = request.getParameter("rating");
            
            // Validate input
            if (category == null || category.trim().isEmpty() ||
                subject == null || subject.trim().isEmpty() ||
                message == null || message.trim().isEmpty() ||
                ratingStr == null || ratingStr.trim().isEmpty()) {
                
                request.setAttribute("error", "All fields are required");
                request.getRequestDispatcher("feedback.jsp").forward(request, response);
                return;
            }
            
            try {
                int rating = Integer.parseInt(ratingStr);
                if (rating < 1 || rating > 5) {
                    request.setAttribute("error", "Rating must be between 1 and 5");
                    request.getRequestDispatcher("feedback.jsp").forward(request, response);
                    return;
                }
                
                // Create feedback object
                Feedback feedback = new Feedback(
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    category,
                    subject,
                    message,
                    rating
                );
                
                if (feedbackDAO.createFeedback(feedback)) {
                    logger.info("Feedback submitted successfully by user: " + user.getUsername());
                    
                    // Create notification for admin
                    Notification adminNotification = new Notification(
                        1, // Assuming admin user ID is 1
                        "New Feedback Received",
                        "New feedback has been submitted by " + user.getUsername() + " regarding " + subject,
                        "feedback"
                    );
                    adminNotification.setActionUrl("admin-feedback.jsp?id=" + feedback.getId());
                    notificationDAO.createNotification(adminNotification);
                    
                    request.setAttribute("success", "Thank you for your feedback! We will review it and respond soon.");
                    request.getRequestDispatcher("feedback.jsp").forward(request, response);
                } else {
                    request.setAttribute("error", "Failed to submit feedback. Please try again.");
                    request.getRequestDispatcher("feedback.jsp").forward(request, response);
                }
            } catch (NumberFormatException e) {
                request.setAttribute("error", "Invalid rating format");
                request.getRequestDispatcher("feedback.jsp").forward(request, response);
            } catch (Exception e) {
                logger.severe("Error submitting feedback: " + e.getMessage());
                request.setAttribute("error", "An error occurred while submitting feedback. Please try again.");
                request.getRequestDispatcher("feedback.jsp").forward(request, response);
            }
        }
    }
}
