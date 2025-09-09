package com.spareparts.utils;

import java.util.regex.Pattern;

/**
 * Utility class for input validation
 */
public class Validator {
    
    // Regex patterns
    private static final Pattern EMAIL_PATTERN = Pattern.compile(
        "^[A-Za-z0-9+_.-]+@([A-Za-z0-9.-]+\\.[A-Za-z]{2,})$"
    );
    
    private static final Pattern USERNAME_PATTERN = Pattern.compile(
        "^[a-zA-Z0-9_]{3,20}$"
    );
    
    private static final Pattern PASSWORD_PATTERN = Pattern.compile(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{8,}$"
    );
    
    private static final Pattern NAME_PATTERN = Pattern.compile(
        "^[a-zA-Z\\s]{2,50}$"
    );
    
    private static final Pattern PHONE_PATTERN = Pattern.compile(
        "^[+]?[0-9\\s\\-()]{10,15}$"
    );

    /**
     * Validate email address
     */
    public static boolean isValidEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            return false;
        }
        return EMAIL_PATTERN.matcher(email.trim()).matches();
    }

    /**
     * Validate username
     */
    public static boolean isValidUsername(String username) {
        if (username == null || username.trim().isEmpty()) {
            return false;
        }
        return USERNAME_PATTERN.matcher(username.trim()).matches();
    }

    /**
     * Validate password strength
     */
    public static boolean isValidPassword(String password) {
        if (password == null || password.isEmpty()) {
            return false;
        }
        return PASSWORD_PATTERN.matcher(password).matches();
    }

    /**
     * Validate name (first name, last name)
     */
    public static boolean isValidName(String name) {
        if (name == null || name.trim().isEmpty()) {
            return false;
        }
        return NAME_PATTERN.matcher(name.trim()).matches();
    }

    /**
     * Validate phone number
     */
    public static boolean isValidPhone(String phone) {
        if (phone == null || phone.trim().isEmpty()) {
            return false;
        }
        return PHONE_PATTERN.matcher(phone.trim()).matches();
    }

    /**
     * Validate feedback category
     */
    public static boolean isValidCategory(String category) {
        if (category == null || category.trim().isEmpty()) {
            return false;
        }
        String[] validCategories = {"general", "bug", "suggestion", "complaint", "feature"};
        for (String validCategory : validCategories) {
            if (validCategory.equals(category.trim().toLowerCase())) {
                return true;
            }
        }
        return false;
    }

    /**
     * Validate rating (1-5)
     */
    public static boolean isValidRating(int rating) {
        return rating >= 1 && rating <= 5;
    }

    /**
     * Validate text length
     */
    public static boolean isValidTextLength(String text, int minLength, int maxLength) {
        if (text == null) {
            return minLength == 0;
        }
        int length = text.trim().length();
        return length >= minLength && length <= maxLength;
    }

    /**
     * Sanitize input to prevent XSS
     */
    public static String sanitizeInput(String input) {
        if (input == null) {
            return null;
        }
        return input.trim()
                   .replaceAll("<", "&lt;")
                   .replaceAll(">", "&gt;")
                   .replaceAll("\"", "&quot;")
                   .replaceAll("'", "&#x27;")
                   .replaceAll("/", "&#x2F;");
    }

    /**
     * Validate and sanitize feedback message
     */
    public static String validateAndSanitizeMessage(String message) {
        if (message == null || message.trim().isEmpty()) {
            return null;
        }
        
        String sanitized = sanitizeInput(message);
        
        // Check length (max 1000 characters)
        if (sanitized.length() > 1000) {
            return sanitized.substring(0, 1000);
        }
        
        return sanitized;
    }

    /**
     * Validate and sanitize subject
     */
    public static String validateAndSanitizeSubject(String subject) {
        if (subject == null || subject.trim().isEmpty()) {
            return null;
        }
        
        String sanitized = sanitizeInput(subject);
        
        // Check length (max 200 characters)
        if (sanitized.length() > 200) {
            return sanitized.substring(0, 200);
        }
        
        return sanitized;
    }
}
