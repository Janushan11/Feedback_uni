package com.spareparts.servlets;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.logging.Logger;

/**
 * Servlet for handling errors
 */
@WebServlet("/error")
public class ErrorHandlerServlet extends HttpServlet {
    private static final Logger logger = Logger.getLogger(ErrorHandlerServlet.class.getName());

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        handleError(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        handleError(request, response);
    }

    private void handleError(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        // Get error information
        Integer statusCode = (Integer) request.getAttribute("javax.servlet.error.status_code");
        String servletName = (String) request.getAttribute("javax.servlet.error.servlet_name");
        String requestUri = (String) request.getAttribute("javax.servlet.error.request_uri");
        Throwable throwable = (Throwable) request.getAttribute("javax.servlet.error.exception");
        
        // Log the error
        if (throwable != null) {
            logger.severe("Error occurred: " + throwable.getMessage());
            logger.severe("Servlet: " + servletName);
            logger.severe("Request URI: " + requestUri);
            logger.severe("Status Code: " + statusCode);
        } else {
            logger.warning("Error occurred - Status Code: " + statusCode);
            logger.warning("Servlet: " + servletName);
            logger.warning("Request URI: " + requestUri);
        }
        
        // Set error attributes for JSP
        request.setAttribute("statusCode", statusCode);
        request.setAttribute("servletName", servletName);
        request.setAttribute("requestUri", requestUri);
        request.setAttribute("throwable", throwable);
        
        // Determine error message
        String errorMessage = "An unexpected error occurred.";
        if (statusCode != null) {
            switch (statusCode) {
                case 404:
                    errorMessage = "The requested page was not found.";
                    break;
                case 500:
                    errorMessage = "An internal server error occurred.";
                    break;
                case 403:
                    errorMessage = "Access denied. You don't have permission to access this resource.";
                    break;
                case 400:
                    errorMessage = "Bad request. Please check your input and try again.";
                    break;
                default:
                    errorMessage = "An error occurred with status code: " + statusCode;
            }
        }
        
        request.setAttribute("errorMessage", errorMessage);
        
        // Forward to error page
        request.getRequestDispatcher("error.jsp").forward(request, response);
    }
}
