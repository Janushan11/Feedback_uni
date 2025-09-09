package com.spareparts.utils;

import javax.mail.*;
import javax.mail.internet.*;
import java.util.Properties;
import java.util.logging.Logger;

/**
 * Utility class for sending emails
 */
public class EmailService {
    private static final Logger logger = Logger.getLogger(EmailService.class.getName());
    
    // Email configuration
    private static final String SMTP_HOST = "smtp.gmail.com";
    private static final String SMTP_PORT = "587";
    private static final String EMAIL_USERNAME = "your-email@gmail.com";
    private static final String EMAIL_PASSWORD = "your-app-password";
    private static final String FROM_EMAIL = "noreply@spareparts.com";
    private static final String FROM_NAME = "Computer Spare Parts System";

    /**
     * Send welcome email to new user
     */
    public void sendWelcomeEmail(String toEmail, String firstName) throws MessagingException {
        String subject = "Welcome to Computer Spare Parts System!";
        String body = buildWelcomeEmailBody(firstName);
        sendEmail(toEmail, subject, body);
    }

    /**
     * Send feedback confirmation email
     */
    public void sendFeedbackConfirmationEmail(String toEmail, String userName, String subject) throws MessagingException {
        String emailSubject = "Feedback Received - " + subject;
        String body = buildFeedbackConfirmationBody(userName, subject);
        sendEmail(toEmail, emailSubject, body);
    }

    /**
     * Send feedback response email
     */
    public void sendFeedbackResponseEmail(String toEmail, String userName, String feedbackSubject, String adminResponse) throws MessagingException {
        String subject = "Response to your feedback: " + feedbackSubject;
        String body = buildFeedbackResponseBody(userName, feedbackSubject, adminResponse);
        sendEmail(toEmail, subject, body);
    }

    /**
     * Send notification email
     */
    public void sendNotificationEmail(String toEmail, String userName, String title, String message) throws MessagingException {
        String body = buildNotificationEmailBody(userName, title, message);
        sendEmail(toEmail, title, body);
    }

    /**
     * Generic email sending method
     */
    private void sendEmail(String toEmail, String subject, String body) throws MessagingException {
        Properties props = new Properties();
        props.put("mail.smtp.host", SMTP_HOST);
        props.put("mail.smtp.port", SMTP_PORT);
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.ssl.trust", SMTP_HOST);

        Session session = Session.getInstance(props, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(EMAIL_USERNAME, EMAIL_PASSWORD);
            }
        });

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(FROM_EMAIL, FROM_NAME));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
            message.setSubject(subject);
            message.setContent(body, "text/html; charset=utf-8");

            Transport.send(message);
            logger.info("Email sent successfully to: " + toEmail);
        } catch (Exception e) {
            logger.severe("Failed to send email to " + toEmail + ": " + e.getMessage());
            throw new MessagingException("Failed to send email", e);
        }
    }

    /**
     * Build welcome email body
     */
    private String buildWelcomeEmailBody(String firstName) {
        return """
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #667eea;">Welcome to Computer Spare Parts System!</h2>
                    <p>Dear """ + firstName + """,</p>
                    <p>Thank you for registering with our Computer Spare Parts Management System. We're excited to have you on board!</p>
                    
                    <h3 style="color: #667eea;">What you can do:</h3>
                    <ul>
                        <li>Browse and search for computer spare parts</li>
                        <li>Submit feedback and suggestions</li>
                        <li>Track your orders and repair requests</li>
                        <li>Receive notifications about promotions and updates</li>
                    </ul>
                    
                    <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
                    
                    <p>Best regards,<br>
                    The Computer Spare Parts Team</p>
                    
                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                    <p style="font-size: 12px; color: #666;">
                        This is an automated message. Please do not reply to this email.
                    </p>
                </div>
            </body>
            </html>
            """;
    }

    /**
     * Build feedback confirmation email body
     */
    private String buildFeedbackConfirmationBody(String userName, String subject) {
        return """
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #667eea;">Feedback Received</h2>
                    <p>Dear """ + userName + """,</p>
                    <p>Thank you for your feedback regarding: <strong>""" + subject + """</strong></p>
                    
                    <p>We have received your message and will review it carefully. Our team will get back to you within 2-3 business days.</p>
                    
                    <p>Your feedback is important to us and helps us improve our services.</p>
                    
                    <p>Best regards,<br>
                    The Computer Spare Parts Team</p>
                    
                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                    <p style="font-size: 12px; color: #666;">
                        This is an automated message. Please do not reply to this email.
                    </p>
                </div>
            </body>
            </html>
            """;
    }

    /**
     * Build feedback response email body
     */
    private String buildFeedbackResponseBody(String userName, String feedbackSubject, String adminResponse) {
        return """
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #667eea;">Response to Your Feedback</h2>
                    <p>Dear """ + userName + """,</p>
                    <p>Thank you for your feedback regarding: <strong>""" + feedbackSubject + """</strong></p>
                    
                    <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #667eea; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #667eea;">Our Response:</h3>
                        <p>""" + adminResponse + """</p>
                    </div>
                    
                    <p>If you have any further questions or concerns, please don't hesitate to contact us.</p>
                    
                    <p>Best regards,<br>
                    The Computer Spare Parts Team</p>
                    
                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                    <p style="font-size: 12px; color: #666;">
                        This is an automated message. Please do not reply to this email.
                    </p>
                </div>
            </body>
            </html>
            """;
    }

    /**
     * Build notification email body
     */
    private String buildNotificationEmailBody(String userName, String title, String message) {
        return """
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #667eea;">""" + title + """</h2>
                    <p>Dear """ + userName + """,</p>
                    <p>""" + message + """</p>
                    
                    <p>Best regards,<br>
                    The Computer Spare Parts Team</p>
                    
                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                    <p style="font-size: 12px; color: #666;">
                        This is an automated message. Please do not reply to this email.
                    </p>
                </div>
            </body>
            </html>
            """;
    }
}
