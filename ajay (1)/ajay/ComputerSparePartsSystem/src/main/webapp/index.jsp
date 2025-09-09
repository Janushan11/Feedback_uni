<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Computer Spare Parts Management System</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header class="header">
        <nav class="navbar">
            <div class="nav-brand">
                <h1><i class="fas fa-desktop"></i> Computer Spare Parts</h1>
            </div>
            <div class="nav-links">
                <a href="index.jsp" class="nav-link active"><i class="fas fa-home"></i> Home</a>
                <a href="login.jsp" class="nav-link"><i class="fas fa-sign-in-alt"></i> Login</a>
                <a href="register.jsp" class="nav-link"><i class="fas fa-user-plus"></i> Register</a>
                <a href="feedback.jsp" class="nav-link"><i class="fas fa-comment"></i> Feedback</a>
            </div>
        </nav>
    </header>

    <main class="main-content">
        <div class="container">
            <div class="hero-section">
                <h1>Welcome to Computer Spare Parts Management System</h1>
                <p>Your one-stop solution for computer spare parts, repair services, and customer support.</p>
                <div class="hero-actions">
                    <a href="register.jsp" class="btn btn-primary">
                        <i class="fas fa-user-plus"></i> Get Started
                    </a>
                    <a href="login.jsp" class="btn btn-secondary">
                        <i class="fas fa-sign-in-alt"></i> Login
                    </a>
                </div>
            </div>

            <div class="features-section">
                <h2>Our Services</h2>
                <div class="features-grid">
                    <div class="feature-card">
                        <i class="fas fa-tools"></i>
                        <h3>Spare Parts</h3>
                        <p>Browse and purchase high-quality computer spare parts from our extensive catalog.</p>
                    </div>
                    <div class="feature-card">
                        <i class="fas fa-wrench"></i>
                        <h3>Repair Services</h3>
                        <p>Professional repair services for all types of computer hardware and software issues.</p>
                    </div>
                    <div class="feature-card">
                        <i class="fas fa-comment"></i>
                        <h3>Customer Support</h3>
                        <p>24/7 customer support with feedback system to ensure your satisfaction.</p>
                    </div>
                    <div class="feature-card">
                        <i class="fas fa-bell"></i>
                        <h3>Notifications</h3>
                        <p>Stay updated with order status, promotions, and important announcements.</p>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2025 Computer Spare Parts Management System. All rights reserved.</p>
        </div>
    </footer>

    <script src="js/validation.js"></script>
</body>
</html>
