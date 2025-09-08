import { useState, useEffect } from "react";
import axios from "axios";
// import SidePanel from "../components/SidePanel";
import "../../../../Project/ITP/src/CSS/AdminDashboard.css";

const RepliedFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch replied feedback from backend
  useEffect(() => {
    const fetchRepliedFeedback = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("http://localhost:5000/api/feedback/replied");
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching replied feedback:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRepliedFeedback();
  }, []);

  return (
    <div className="admin-dashboard">
      {/* <SidePanel pages={pages} /> */}
      <div className="main-content">
        <div className="dashboard-header">
          <div className="header-content">
            <h1>Replied Feedback</h1>
            <p>View and manage all feedback responses</p>
          </div>
          <div className="date-display">
            <i className="fas fa-calendar-alt"></i>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="feedback-section">
            <div className="section-header">
              <h2>Feedback Responses</h2>
            </div>

            {isLoading ? (
              <div className="loading-spinner">
                <i className="fas fa-spinner fa-spin"></i>
                <span>Loading feedback...</span>
              </div>
            ) : feedbacks.length === 0 ? (
              <div className="no-feedback">
                <i className="fas fa-comment-slash"></i>
                <p>No feedback with replies yet.</p>
              </div>
            ) : (
              <div className="feedback-list">
                {feedbacks.map((feedback) => (
                  <div key={feedback._id} className="feedback-card">
                    <div className="feedback-header">
                      <div className="user-info">
                        <i className="fas fa-user-circle"></i>
                        <div> <div className="rating-badge">
                          <h3>{feedback.name}</h3>
                          <p className="email">{feedback.email}</p>
                        </div>
                      </div>
                      
                        <i className="fas fa-star" style={{ color: "#FFD700", marginLeft: '80px' }}></i>
                        <span>{feedback.rating}</span>
                      </div>
                    </div>
                    <div className="feedback-content">
                      <p className="feedback-text">{feedback.feedback}</p>
                    </div>
                    <div className="response-section">
                      <div className="response-header">
                        <i className="fas fa-reply"></i>
                        <h4>Response</h4>
                      </div>
                      <p className="response-text">{feedback.response}</p>
                    </div>
                    <div className="feedback-footer">
                      <span className="timestamp">
                        <i className="fas fa-clock"></i>
                        {new Date(feedback.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepliedFeedback;
