// Form validation JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize form validation
    initializeValidation();
});

function initializeValidation() {
    // Login form validation
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', validateLoginForm);
    }

    // Registration form validation
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', validateRegisterForm);
    }

    // Feedback form validation
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', validateFeedbackForm);
    }

    // Real-time validation for inputs
    setupRealTimeValidation();
}

function validateLoginForm(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    let isValid = true;
    let errorMessage = '';

    // Validate username
    if (!username) {
        showFieldError('username', 'Username is required');
        isValid = false;
    } else if (!isValidUsername(username)) {
        showFieldError('username', 'Username must be 3-20 characters long and contain only letters, numbers, and underscores');
        isValid = false;
    } else {
        clearFieldError('username');
    }

    // Validate password
    if (!password) {
        showFieldError('password', 'Password is required');
        isValid = false;
    } else if (!isValidPassword(password)) {
        showFieldError('password', 'Password must be at least 8 characters long');
        isValid = false;
    } else {
        clearFieldError('password');
    }

    if (isValid) {
        // Show loading state
        showLoading('loginForm');
        // Submit form
        event.target.submit();
    }
}

function validateRegisterForm(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
    let isValid = true;

    // Validate username
    if (!username) {
        showFieldError('username', 'Username is required');
        isValid = false;
    } else if (!isValidUsername(username)) {
        showFieldError('username', 'Username must be 3-20 characters long and contain only letters, numbers, and underscores');
        isValid = false;
    } else {
        clearFieldError('username');
    }

    // Validate email
    if (!email) {
        showFieldError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    } else {
        clearFieldError('email');
    }

    // Validate password
    if (!password) {
        showFieldError('password', 'Password is required');
        isValid = false;
    } else if (!isValidPassword(password)) {
        showFieldError('password', 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number');
        isValid = false;
    } else {
        clearFieldError('password');
    }

    // Validate confirm password
    if (!confirmPassword) {
        showFieldError('confirmPassword', 'Please confirm your password');
        isValid = false;
    } else if (password !== confirmPassword) {
        showFieldError('confirmPassword', 'Passwords do not match');
        isValid = false;
    } else {
        clearFieldError('confirmPassword');
    }

    // Validate first name
    if (!firstName) {
        showFieldError('firstName', 'First name is required');
        isValid = false;
    } else if (!isValidName(firstName)) {
        showFieldError('firstName', 'First name must contain only letters and be 2-50 characters long');
        isValid = false;
    } else {
        clearFieldError('firstName');
    }

    // Validate last name
    if (!lastName) {
        showFieldError('lastName', 'Last name is required');
        isValid = false;
    } else if (!isValidName(lastName)) {
        showFieldError('lastName', 'Last name must contain only letters and be 2-50 characters long');
        isValid = false;
    } else {
        clearFieldError('lastName');
    }

    // Validate phone (optional)
    if (phone && !isValidPhone(phone)) {
        showFieldError('phone', 'Please enter a valid phone number');
        isValid = false;
    } else {
        clearFieldError('phone');
    }

    if (isValid) {
        // Show loading state
        showLoading('registerForm');
        // Submit form
        event.target.submit();
    }
}

function validateFeedbackForm(event) {
    event.preventDefault();
    
    const category = document.getElementById('category').value;
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const rating = document.getElementById('rating').value;
    
    let isValid = true;

    // Validate category
    if (!category) {
        showFieldError('category', 'Please select a category');
        isValid = false;
    } else {
        clearFieldError('category');
    }

    // Validate subject
    if (!subject) {
        showFieldError('subject', 'Subject is required');
        isValid = false;
    } else if (subject.length < 5 || subject.length > 200) {
        showFieldError('subject', 'Subject must be between 5 and 200 characters');
        isValid = false;
    } else {
        clearFieldError('subject');
    }

    // Validate message
    if (!message) {
        showFieldError('message', 'Message is required');
        isValid = false;
    } else if (message.length < 10 || message.length > 1000) {
        showFieldError('message', 'Message must be between 10 and 1000 characters');
        isValid = false;
    } else {
        clearFieldError('message');
    }

    // Validate rating
    if (!rating) {
        showFieldError('rating', 'Please select a rating');
        isValid = false;
    } else {
        clearFieldError('rating');
    }

    if (isValid) {
        // Show loading state
        showLoading('feedbackForm');
        // Submit form
        event.target.submit();
    }
}

function setupRealTimeValidation() {
    // Username validation
    const usernameInput = document.getElementById('username');
    if (usernameInput) {
        usernameInput.addEventListener('blur', function() {
            const value = this.value.trim();
            if (value && !isValidUsername(value)) {
                showFieldError('username', 'Username must be 3-20 characters long and contain only letters, numbers, and underscores');
            } else {
                clearFieldError('username');
            }
        });
    }

    // Email validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const value = this.value.trim();
            if (value && !isValidEmail(value)) {
                showFieldError('email', 'Please enter a valid email address');
            } else {
                clearFieldError('email');
            }
        });
    }

    // Password strength indicator
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            updatePasswordStrength(this.value);
        });
    }

    // Confirm password validation
    const confirmPasswordInput = document.getElementById('confirmPassword');
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('blur', function() {
            const password = document.getElementById('password').value;
            const confirmPassword = this.value;
            if (confirmPassword && password !== confirmPassword) {
                showFieldError('confirmPassword', 'Passwords do not match');
            } else {
                clearFieldError('confirmPassword');
            }
        });
    }
}

function updatePasswordStrength(password) {
    const strengthIndicator = document.getElementById('passwordStrength');
    if (!strengthIndicator) return;

    const strength = calculatePasswordStrength(password);
    const strengthText = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const strengthColors = ['#dc3545', '#fd7e14', '#ffc107', '#20c997', '#28a745'];

    strengthIndicator.textContent = strengthText[strength];
    strengthIndicator.style.color = strengthColors[strength];
}

function calculatePasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return Math.min(strength, 4);
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    // Remove existing error
    clearFieldError(fieldId);

    // Add error class
    field.classList.add('error');

    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = '#dc3545';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';

    // Insert error message after field
    field.parentNode.insertBefore(errorElement, field.nextSibling);
}

function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    // Remove error class
    field.classList.remove('error');

    // Remove existing error message
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function showLoading(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    }
}

// Validation helper functions
function isValidUsername(username) {
    return /^[a-zA-Z0-9_]{3,20}$/.test(username);
}

function isValidEmail(email) {
    return /^[A-Za-z0-9+_.-]+@([A-Za-z0-9.-]+\.[A-Za-z]{2,})$/.test(email);
}

function isValidPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/.test(password);
}

function isValidName(name) {
    return /^[a-zA-Z\s]{2,50}$/.test(name);
}

function isValidPhone(phone) {
    return /^[+]?[0-9\s\-()]{10,15}$/.test(phone);
}
