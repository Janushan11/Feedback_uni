import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar, FaUser, FaEnvelope, FaClock } from 'react-icons/fa';
import '../../../../Project/ITP/src/CSS/AdminDashboard.css';
import './FeedbackHistory.css';
import FeedbackForm from './FeedbackForm.jsx';
import bannerImg from '../../../../Project/ITP/src/assets/images/cover.png';
import styled from 'styled-components';

const BannerWrapper = styled.div`
  width: 100%;
  position: relative;
  height: 340px;
  margin-bottom: 32px;
  overflow: hidden;
`;
const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7);
`;
const BannerText = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 3.2rem;
  font-weight: 900;
  letter-spacing: 2px;
  text-shadow: 0 4px 24px rgba(0,0,0,0.5);
  z-index: 2;
  text-shadow: 0 15px 20px rgba(187, 0, 0, 0.73);
`;

const FeedbackHistory = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ratingSummary, setRatingSummary] = useState({
    totalCount: 0,
    averageRating: 0,
    ratingCounts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  });

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/feedback/all');
      console.log('Feedback data:', response.data);
      setFeedbacks(response.data);
      calculateRatingSummary(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching feedbacks:', err);
      setError('Failed to fetch feedbacks');
      setLoading(false);
    }
  };

  const calculateRatingSummary = (feedbacks) => {
    if (!feedbacks.length) return;

    // Count feedbacks for each rating
    const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let totalRating = 0;
    
    feedbacks.forEach(feedback => {
      if (feedback.rating && feedback.rating >= 1 && feedback.rating <= 5) {
        ratingCounts[feedback.rating]++;
        totalRating += feedback.rating;
      }
    });

    const totalCount = feedbacks.length;
    const averageRating = totalCount > 0 ? (totalRating / totalCount).toFixed(1) : 0;

    setRatingSummary({
      totalCount,
      averageRating,
      ratingCounts
    });
  };

  const calculateRating = (rating) => {
    return Array(5).fill().map((_, index) => (
      <FaStar
        key={index}
        style={{ color: index < rating ? '#FFD700' : '#C0C0C0', marginRight: '2px' }}
      />
    ));
  };

  if (loading) {
    return (
      <div>
        <BannerWrapper>
          <BannerImage src={bannerImg} alt="Banner" />
          <BannerText >Find Your Perfect Stay</BannerText>
        </BannerWrapper>
        <div className="admin-dashboard">
          <div className="main-content">
            <div className="loading-spinner">
              <i className="fas fa-spinner fa-spin"></i>
              <p>Loading feedbacks...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <BannerWrapper>
          <BannerImage src={bannerImg} alt="Banner" />
          <BannerText>Find Your Perfect Stay</BannerText>
        </BannerWrapper>
        <div className="admin-dashboard">
          <div className="main-content">
            <div className="no-feedback">
              <i className="fas fa-exclamation-circle"></i>
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <BannerWrapper>
        <BannerImage src={bannerImg} alt="Banner" />
        <BannerText>Find Your Perfect Stay</BannerText>
      </BannerWrapper>
      <div className="admin-dashboard">
        <div className="main-content">
          <div className="feedback-section">
            <div className="section-header">
              <h2>Customer Feedback</h2>
            </div>

            {/* Rating Summary Section */}
            <div className="rating-summary">
              <div className="rating-left">
                <h1>{ratingSummary.averageRating}</h1>
                <div className="stars">
                  {calculateRating(Math.round(parseFloat(ratingSummary.averageRating)))}
                </div>
                <p>Based on {ratingSummary.totalCount} reviews</p>
              </div>
              <div className="rating-bars">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = ratingSummary.ratingCounts[rating] || 0;
                  const percentage = ratingSummary.totalCount > 0 
                    ? Math.round((count / ratingSummary.totalCount) * 100) 
                    : 0;
                  
                  return (
                    <div className="rating-row" key={rating}>
                      <div className="star-label">{rating} star</div>
                      <div className="bar-background">
                        <div className="bar-fill" style={{ width: `${percentage}%` }}></div>
                      </div>
                      <div className="count">{count}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="feedback-grid">
              {feedbacks.length === 0 ? (
                <div className="no-feedback">
                  <i className="fas fa-comment-slash"></i>
                  <p>No feedbacks yet. Be the first to share your experience!</p>
                </div>
              ) : (
                feedbacks.map((feedback) => (
                  <div key={feedback._id} className="feedback-card">
                    <div className="feedback-header">
                      <div className="user-info">
                        <FaUser className="user-icon" />
                        <div>
                          <h3>{feedback.name}</h3>
                          <span className="email">{feedback.email}</span>
                        </div>
                      </div>
                      <div className="rating-badge">
                        {feedback.rating ? calculateRating(feedback.rating) : 'No rating'}
                      </div>
                    </div>
                    <div className="feedback-content">
                      <p className="feedback-text">{feedback.feedback}</p>
                    </div>
                    {feedback.response && (
                      <div className="response-section">
                        <div className="response-header">
                          <FaEnvelope className="response-icon" />
                          <h4>Response from MercuryFM</h4>
                        </div>
                        <p className="response-text">{feedback.response}</p>
                      </div>
                    )}
                    <div className="feedback-footer">
                      <span className="timestamp">
                        <FaClock className="clock-icon" />
                        {new Date(feedback.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="feedback-form-section">
              <div className="feedback-prompt">
                <h3>Share Your Experience</h3>
                <p>Your feedback helps us improve our services and create better experiences for everyone. We value your thoughts and suggestions!</p>
              </div>
              <FeedbackForm onSuccess={() => {
                fetchFeedbacks();
              }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackHistory; 