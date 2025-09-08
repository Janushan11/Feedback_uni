import React, { useState } from 'react';
import FeedbackForm from './FeedbackForm.jsx';
import FeedbackHistory from './FeedbackHistory.jsx';
import './FeedbackPage.css';

const FeedbackPage = () => {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="feedback-page">
            {/* Header */}
            <div className="feedback-header">
                <h1>Feedback Management System – Repairs & Products</h1>
                <p>
                    Share your experience with our repair services or purchased products.
                    Your feedback helps us improve and deliver better service.
                </p>
            </div>

            {/* Content */}
            <div className="feedback-content">
                {/* History Section */}
                <div className="feedback-history-container">
                    <FeedbackHistory />
                </div>

                {/* Button to show form */}
                {!showForm && (
                    <div className="submit-feedback-section">
                        <button
                            className="submit-feedback-btn"
                            onClick={() => setShowForm(true)}
                        >
                            Submit New Feedback
                        </button>
                    </div>
                )}

                {/* Feedback Form Section */}
                {showForm && (
                    <div className="feedback-form-section">
                        <div className="feedback-info">
                            <h2>Why Your Feedback Matters</h2>
                            <ul>
                                <li>Improves our repair services and response times</li>
                                <li>Helps us enhance product quality and reliability</li>
                                <li>Ensures we meet customer needs and expectations</li>
                                <li>Builds trust and a better experience for all users</li>
                            </ul>
                        </div>

                        <div className="feedback-form-container">
                            <FeedbackForm onSuccess={() => setShowForm(false)} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeedbackPage;
