package com.spareparts.servlets;

import com.spareparts.dao.UserDAO;
import com.spareparts.models.User;
import com.spareparts.utils.Validator;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.logging.Logger;

/**
 * Servlet for handling user login
 */
@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    private static final Logger logger = Logger.getLogger(LoginServlet.class.getName());
    private UserDAO userDAO;

    @Override
    public void init() throws ServletException {
        super.init();
        userDAO = new UserDAO();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        // Check if user is already logged in
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("user") != null) {
            response.sendRedirect("dashboard.jsp");
            return;
        }
        
        request.getRequestDispatcher("login.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        
        // Validate input
        if (!Validator.isValidUsername(username) || !Validator.isValidPassword(password)) {
            request.setAttribute("error", "Invalid username or password format");
            request.getRequestDispatcher("login.jsp").forward(request, response);
            return;
        }
        
        try {
            // Authenticate user
            User user = userDAO.getUserByUsername(username);
            
            if (user != null && user.getPassword().equals(password)) {
                // Login successful
                HttpSession session = request.getSession();
                session.setAttribute("user", user);
                session.setAttribute("userId", user.getId());
                session.setAttribute("username", user.getUsername());
                session.setAttribute("userRole", user.getRole());
                
                // Update last login time
                userDAO.updateLastLogin(user.getId());
                
                logger.info("User logged in successfully: " + username);
                
                // Redirect based on user role
                if ("admin".equals(user.getRole())) {
                    response.sendRedirect("admin-dashboard.jsp");
                } else {
                    response.sendRedirect("dashboard.jsp");
                }
            } else {
                // Login failed
                request.setAttribute("error", "Invalid username or password");
                request.getRequestDispatcher("login.jsp").forward(request, response);
                logger.warning("Login failed for username: " + username);
            }
        } catch (Exception e) {
            logger.severe("Error during login: " + e.getMessage());
            request.setAttribute("error", "An error occurred during login. Please try again.");
            request.getRequestDispatcher("login.jsp").forward(request, response);
        }
    }
}
