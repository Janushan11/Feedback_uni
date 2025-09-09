package com.spareparts.servlets;

import com.spareparts.dao.UserDAO;
import com.spareparts.models.User;
import com.spareparts.utils.EmailService;
import com.spareparts.utils.Validator;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.logging.Logger;

/**
 * Servlet for handling user registration
 */
@WebServlet("/register")
public class RegisterServlet extends HttpServlet {
    private static final Logger logger = Logger.getLogger(RegisterServlet.class.getName());
    private UserDAO userDAO;
    private EmailService emailService;

    @Override
    public void init() throws ServletException {
        super.init();
        userDAO = new UserDAO();
        emailService = new EmailService();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        request.getRequestDispatcher("register.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String username = request.getParameter("username");
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String confirmPassword = request.getParameter("confirmPassword");
        String firstName = request.getParameter("firstName");
        String lastName = request.getParameter("lastName");
        String phone = request.getParameter("phone");
        String address = request.getParameter("address");
        
        // Validate input
        if (!Validator.isValidUsername(username)) {
            request.setAttribute("error", "Username must be 3-20 characters long and contain only letters, numbers, and underscores");
            request.getRequestDispatcher("register.jsp").forward(request, response);
            return;
        }
        
        if (!Validator.isValidEmail(email)) {
            request.setAttribute("error", "Please enter a valid email address");
            request.getRequestDispatcher("register.jsp").forward(request, response);
            return;
        }
        
        if (!Validator.isValidPassword(password)) {
            request.setAttribute("error", "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number");
            request.getRequestDispatcher("register.jsp").forward(request, response);
            return;
        }
        
        if (!password.equals(confirmPassword)) {
            request.setAttribute("error", "Passwords do not match");
            request.getRequestDispatcher("register.jsp").forward(request, response);
            return;
        }
        
        if (!Validator.isValidName(firstName) || !Validator.isValidName(lastName)) {
            request.setAttribute("error", "First name and last name must contain only letters and be 2-50 characters long");
            request.getRequestDispatcher("register.jsp").forward(request, response);
            return;
        }
        
        try {
            // Check if username already exists
            if (userDAO.usernameExists(username)) {
                request.setAttribute("error", "Username already exists. Please choose a different username.");
                request.getRequestDispatcher("register.jsp").forward(request, response);
                return;
            }
            
            // Check if email already exists
            if (userDAO.emailExists(email)) {
                request.setAttribute("error", "Email already exists. Please use a different email address.");
                request.getRequestDispatcher("register.jsp").forward(request, response);
                return;
            }
            
            // Create new user
            User newUser = new User(username, email, password, firstName, lastName, phone, address);
            
            if (userDAO.createUser(newUser)) {
                logger.info("User registered successfully: " + username);
                
                // Send welcome email
                try {
                    emailService.sendWelcomeEmail(email, firstName);
                } catch (Exception e) {
                    logger.warning("Failed to send welcome email: " + e.getMessage());
                }
                
                request.setAttribute("success", "Registration successful! You can now login with your credentials.");
                request.getRequestDispatcher("login.jsp").forward(request, response);
            } else {
                request.setAttribute("error", "Registration failed. Please try again.");
                request.getRequestDispatcher("register.jsp").forward(request, response);
            }
        } catch (Exception e) {
            logger.severe("Error during registration: " + e.getMessage());
            request.setAttribute("error", "An error occurred during registration. Please try again.");
            request.getRequestDispatcher("register.jsp").forward(request, response);
        }
    }
}
