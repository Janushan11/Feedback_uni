import React, { useState } from "react";
import "../../../../Project/ITP/src/CSS/FeedbackForm.css";
import axios from "axios";

const StarRating = ({ rating, setRating }) => {
  return (
    <div className="star-rating" >
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? "filled" : ""}
          onClick={() => setRating(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const FeedbackForm = ({ onSubmitFeedback }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !feedback || rating === 0 || !category) {
      alert("Please fill in all fields and provide a rating and category!");
      return;
    }

    const feedbackData = {
      name,
      email,
      feedback,
      rating,
      category,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/feedback/submit",
        feedbackData
      );

      if (response.status === 201) {
        setIsSubmitted(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div>
      <button className="open-btn" onClick={handleOpen}>
        Give Feedback
      </button>

      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={handleClose}>
              &times;
            </span>
            <h2>Submit Feedback</h2>

            {isSubmitted ? (
              <div className="success-message">🎉 Thank you for your feedback!</div>
            ) : (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select Feedback Category</option>
                  <option value="Room Cleanliness">Room Cleanliness</option>
                  <option value="Staff Behavior">Staff Behavior</option>
                  <option value="Booking Process">Booking Process</option>
                  <option value="Facilities">Facilities (Wi-Fi, AC, etc.)</option>
                  <option value="Suggestions">Suggestions / Complaints</option>
                </select>
                <textarea
                  placeholder="Your Feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                />
                <StarRating rating={rating} setRating={setRating} />
                <button type="submit">Submit</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
