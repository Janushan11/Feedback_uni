import React, { useState } from 'react';
import FeedbackForm from './FeedbackForm.jsx';
import FeedbackHistory from './FeedbackHistory.jsx';
import './FeedbackPage.css';

const FeedbackPage = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="feedback-page">
      <div className="feedback-header">
        <h1>Customer Feedback</h1>
        <p>We value your opinion and would love to hear about your experience with us.</p>
      </div>

      <div className="feedback-content">
        <div className="feedback-history-container">
          <FeedbackHistory />
        </div>

        {!showForm && (
          <div className="submit-feedback-section">
            <button 
              className="submit-feedback-btn"
              onClick={() => setShowForm(true)}
            >
              Submit Your Feedback
            </button>
          </div>
        )}

        {showForm && (
          <div className="feedback-form-section">
            <div className="feedback-info">
              <h2>Why Your Feedback Matters</h2>
              <ul>
                <li>Helps us improve our services</li>
                <li>Guides our future enhancements</li>
                <li>Ensures we meet customer expectations</li>
                <li>Creates a better experience for all guests</li>
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