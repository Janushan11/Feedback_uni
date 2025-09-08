import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import { jsPDF } from "jspdf"; // Import jsPDF
import "../../../../Project/ITP/src/CSS/AdminDashboard.css";
import "../../../../Project/ITP/src/CSS/FeedbackManagement.css";

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [replies, setReplies] = useState({});
  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  // List of categories from the feedback form
  const categories = [
    'All',
    'Room Cleanliness',
    'Staff Behavior',
    'Booking Process',
    'Facilities',
    'Suggestions'
  ];

  // Fetch all feedbacks from backend
  const fetchFeedbacks = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("http://localhost:5000/api/feedback/all");
      const filteredFeedbacks = data.filter((feedback) => !feedback.response);
      setFeedbacks(filteredFeedbacks);
      setFilteredFeedbacks(filteredFeedbacks);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      Swal.fire("Error", "Failed to fetch feedbacks", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Filter feedbacks by category
  const handleCategoryFilter = (category) => {
    setActiveCategory(category);
    
    if (category === 'All') {
      setFilteredFeedbacks(feedbacks);
    } else {
      const filtered = feedbacks.filter(feedback => 
        feedback.category && feedback.category.includes(category)
      );
      setFilteredFeedbacks(filtered);
    }
  };

  // Handle reply input change
  const handleReplyChange = (id, value) => {
    setReplies((prevReplies) => ({ ...prevReplies, [id]: value }));
  };

  // Submit a reply to feedback
  const handleReply = async (id) => {
    const reply = replies[id]?.trim();
    if (!reply) {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter a reply before submitting.',
        icon: 'warning',
        confirmButtonColor: '#83142C'
      });
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/feedback/reply/${id}`, { reply });
      
      if (response.status === 200) {
        setReplies((prevReplies) => ({ ...prevReplies, [id]: "" }));
        fetchFeedbacks();
        Swal.fire({
          title: 'Success!',
          text: 'Reply has been submitted successfully!',
          icon: 'success',
          confirmButtonColor: '#83142C',
          timer: 2000,
          showConfirmButton: false
        });
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error("Error replying to feedback:", error.response || error);
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'There was an error submitting your reply. Please try again.',
        icon: 'error',
        confirmButtonColor: '#83142C'
      });
    }
  };

  // Open delete confirmation modal
  const handleDeleteClick = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#83142C',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      background: '#ffffff',
      backdrop: `
        rgba(0,0,0,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `,
      customClass: {
        popup: 'animated fadeInDown'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        confirmDelete(id);
      }
    });
  };

  // Confirm delete action
  const confirmDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/feedback/delete/${id}`);
      fetchFeedbacks();
      Swal.fire({
        title: 'Deleted!',
        text: 'Feedback has been deleted successfully.',
        icon: 'success',
        confirmButtonColor: '#83142C',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      console.error("Error deleting feedback:", error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an error deleting the feedback. Please try again.',
        icon: 'error',
        confirmButtonColor: '#83142C'
      });
    }
  };

  // Send email with feedback reply
  const SendEmail = async (toEmail, reply) => {
    try {
      const subject = "Your Feedback Reply";
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
            <h2 style="color: #007bff; text-align: center;">Your Feedback Reply</h2>
            <p style="font-size: 16px; color: #333;">Dear Customer,</p>
            <p style="font-size: 16px; color: #555;">We appreciate your feedback! Here is our response:</p>
            <div style="background-color: #fff; padding: 15px; border-left: 5px solid #007bff; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); font-style: italic; font-size: 16px; color: #333;">
                "${reply}"
            </div>
            <p style="font-size: 16px; color: #333;">Thank you for taking the time to share your thoughts with us.</p>
            <p style="font-size: 16px; color: #333;">Best Regards,</p>
            <p style="font-size: 16px; color: #007bff; font-weight: bold;">The MercuryFM Team</p>
        </div>`;

      await axios.post("http://localhost:5000/api/feedback/send-email", { toEmail, subject, htmlContent });
      Swal.fire("Success", "Email has been sent successfully!", "success");
    } catch (error) {
      console.error("Error sending email:", error);
      Swal.fire("Error", "There was an error sending the email. Please try again.", "error");
    }
  };

  // Function to generate a beautiful PDF of all feedbacks
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica");
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text("Feedback List", 20, 20);

    // Set page background color
    doc.setFillColor(240, 240, 240); // Light gray background
    doc.rect(0, 0, 210, 297, "F");

    // Set text styles for each feedback
    let yPosition = 30; // Start adding feedbacks from this position
    feedbacks.forEach((feedback, index) => {
      if (yPosition >= 270) {
        doc.addPage();
        yPosition = 20; // Reset position for new page
      }

      // Feedback Header
      doc.setFontSize(14);
      doc.setTextColor(0, 102, 204); // Blue color for header
      doc.text(`Feedback #${index + 1}`, 20, yPosition);
      yPosition += 12;

      // Name and Email
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0); // Black color for regular text
      doc.text(`Name: ${feedback.name}`, 20, yPosition);
      yPosition += 8;
      doc.text(`Email: ${feedback.email}`, 20, yPosition);
      yPosition += 8;

      // Feedback Text
      doc.setFontSize(12);
      doc.setTextColor(50, 50, 50); // Slightly gray text for feedback
      doc.text(`Feedback: ${feedback.feedback}`, 20, yPosition);
      yPosition += 8;

      // Rating with Star Icon
      doc.setFontSize(12);
      doc.setTextColor(255, 223, 0); // Gold color for stars
      doc.text(`Rating: ${feedback.rating} ⭐`, 20, yPosition);
      yPosition += 12;

      // Add a styled box around feedback
      doc.setDrawColor(0, 102, 204); // Blue border for feedback box
      doc.setLineWidth(0.8);
      doc.rect(20, yPosition - 48, 170, 48); // Positioning the box around feedback

      // Add a line separator after each feedback
      doc.setLineWidth(0.5);
      doc.setDrawColor(100, 100, 100); // Gray color for line
      doc.line(20, yPosition + 6, 190, yPosition + 6);
      yPosition += 14; // Space after the line
    });

    doc.save("feedbacks.pdf");
  };

  const line = {
    color: "#83142C",
  };

  return (
    <div className="feedback-container" style={{ padding: '2rem' }}>
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Feedback Management</h1>
          <p>Manage and respond to customer feedback</p>
        </div>
        <div className="date-display">
          <i className="fas fa-calendar-alt"></i>
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="feedback-section">
          {/* Category Filter Bar */}
          <div className="category-filter-bar">
            {categories.map(category => (
              <button 
                key={category}
                className={`category-filter-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="actions-bar">
            <button className="download-pdf-btn" onClick={generatePDF}>
              <i className="fas fa-file-pdf"></i> Download PDF
            </button>
          </div>

          {isLoading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading feedbacks...</p>
            </div>
          ) : filteredFeedbacks.length === 0 ? (
            <div className="no-feedback-message">
              <i className="fas fa-comments"></i>
              <p>No {activeCategory !== 'All' ? activeCategory + ' ' : ''}feedbacks available.</p>
            </div>
          ) : (
            <div className="feedback-list">
              {filteredFeedbacks.map((feedback) => (
                <div key={feedback._id} className="feedback-card" style={{ background: 'rgba(255, 255, 255, 0.8)' }}>
                  <div className="feedback-header">
                    <div className="user-info">
                      <p><strong>Name:</strong> {feedback.name}</p>
                      <p><strong>Email:</strong> {feedback.email}</p>
                    </div>
                    <div className="rating">
                      <p><strong>Rating:</strong> {Array(feedback.rating).fill().map((_, i) => <span key={i}>⭐</span>)}</p>
                      {feedback.category && <p><strong>Category:</strong> <span className="category-badge">{feedback.category}</span></p>}
                    </div>
                  </div>
                  <div className="feedback-content">
                    <p><strong>Feedback:</strong></p>
                    <p className="feedback-text">{feedback.feedback}</p>
                  </div>
                  <div className="response-section">
                    <textarea
                      placeholder="Write your reply here..."
                      value={replies[feedback._id] || ""}
                      onChange={(e) => handleReplyChange(feedback._id, e.target.value)}
                    />
                    <div className="feedback-actions">
                      <button
                        className="feedback-action-btn reply-btn"
                        onClick={() => handleReply(feedback._id)}
                      >
                        <i className="fas fa-reply"></i> Reply
                      </button>
                      <button
                        className="feedback-action-btn email-btn"
                        onClick={() => SendEmail(feedback.email, replies[feedback._id])}
                        disabled={!replies[feedback._id]}
                      >
                        <i className="fas fa-envelope"></i> Send Email
                      </button>
                      <button
                        className="feedback-action-btn delete-btn"
                        onClick={() => handleDeleteClick(feedback._id)}
                      >
                        <i className="fas fa-trash"></i> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackManagement;
