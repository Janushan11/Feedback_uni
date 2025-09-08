import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { jsPDF } from "jspdf";
import "../../../../Project/ITP/src/CSS/AdminDashboard.css";
import "../../../../Project/ITP/src/CSS/FeedbackManagement.css";

const FeedbackManagement = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
    const [replies, setReplies] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");

    // Categories adjusted for repairs & products
    const categories = [
        "All",
        "Repair Service",
        "Product Quality",
        "Delivery/Installation",
        "Support",
        "Suggestions"
    ];

    // Fetch all feedbacks
    const fetchFeedbacks = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get("http://localhost:5000/api/feedback/all");
            const onlyUnreplied = data.filter((feedback) => !feedback.response);
            setFeedbacks(onlyUnreplied);
            setFilteredFeedbacks(onlyUnreplied);
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

    // Category filter
    const handleCategoryFilter = (category) => {
        setActiveCategory(category);
        if (category === "All") {
            setFilteredFeedbacks(feedbacks);
        } else {
            const filtered = feedbacks.filter(
                (f) => f.category && f.category.includes(category)
            );
            setFilteredFeedbacks(filtered);
        }
    };

    // Handle reply
    const handleReplyChange = (id, value) => {
        setReplies((prev) => ({ ...prev, [id]: value }));
    };

    const handleReply = async (id) => {
        const reply = replies[id]?.trim();
        if (!reply) {
            Swal.fire("Error", "Please enter a reply before submitting.", "warning");
            return;
        }
        try {
            const res = await axios.put(
                `http://localhost:5000/api/feedback/reply/${id}`,
                { reply }
            );
            if (res.status === 200) {
                setReplies((prev) => ({ ...prev, [id]: "" }));
                fetchFeedbacks();
                Swal.fire("Success", "Reply submitted successfully!", "success");
            }
        } catch (error) {
            console.error("Error replying:", error);
            Swal.fire("Error", "Could not send reply. Try again.", "error");
        }
    };

    // Delete feedback
    const handleDeleteClick = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This feedback will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#83142C",
            cancelButtonColor: "#dc3545",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) confirmDelete(id);
        });
    };

    const confirmDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/feedback/delete/${id}`);
            fetchFeedbacks();
            Swal.fire("Deleted!", "Feedback has been deleted.", "success");
        } catch (error) {
            console.error("Error deleting feedback:", error);
            Swal.fire("Error", "Could not delete feedback.", "error");
        }
    };

    // Send email
    const SendEmail = async (toEmail, reply) => {
        try {
            const subject = "Response to Your Feedback";
            const htmlContent = `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
          <h2 style="color: #007bff;">Feedback Response</h2>
          <p>Dear Customer,</p>
          <p>We value your input regarding our repairs and products. Here is our response:</p>
          <blockquote style="border-left: 5px solid #007bff; margin: 10px 0; padding-left: 10px;">${reply}</blockquote>
          <p>Thank you for helping us improve our services and products.</p>
          <p><strong>Feedback Management Team – Repairs & Products</strong></p>
        </div>
      `;
            await axios.post("http://localhost:5000/api/feedback/send-email", {
                toEmail,
                subject,
                htmlContent
            });
            Swal.fire("Success", "Email sent successfully!", "success");
        } catch (error) {
            console.error("Error sending email:", error);
            Swal.fire("Error", "Could not send email.", "error");
        }
    };

    // Export PDF
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFont("helvetica");
        doc.setFontSize(18);
        doc.text("Feedback Report – Repairs & Products", 20, 20);

        let y = 35;
        feedbacks.forEach((f, i) => {
            if (y > 270) {
                doc.addPage();
                y = 20;
            }
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.text(`Feedback #${i + 1}`, 20, y);
            y += 7;
            doc.text(`Name: ${f.name}`, 20, y);
            y += 6;
            doc.text(`Email: ${f.email}`, 20, y);
            y += 6;
            doc.text(`Category: ${f.category}`, 20, y);
            y += 6;
            doc.text(`Rating: ${f.rating} ⭐`, 20, y);
            y += 6;
            doc.text(`Feedback: ${f.feedback}`, 20, y);
            y += 12;
        });
        doc.save("feedbacks_report.pdf");
    };

    return (
        <div className="feedback-container" style={{ padding: "2rem" }}>
            <div className="dashboard-header">
                <div className="header-content">
                    <h1>Feedback Management System – Repairs & Products</h1>
                    <p>Manage, respond, and analyze customer reviews and feedback</p>
                </div>
                <div className="date-display">
                    <i className="fas fa-calendar-alt"></i>
                    <span>{new Date().toLocaleDateString()}</span>
                </div>
            </div>

            <div className="dashboard-grid">
                <div className="feedback-section">
                    {/* Category Filter */}
                    <div className="category-filter-bar">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`category-filter-btn ${
                                    activeCategory === category ? "active" : ""
                                }`}
                                onClick={() => handleCategoryFilter(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="actions-bar">
                        <button className="download-pdf-btn" onClick={generatePDF}>
                            <i className="fas fa-file-pdf"></i> Export PDF
                        </button>
                    </div>

                    {/* Feedback List */}
                    {isLoading ? (
                        <div className="loading-spinner">
                            <div className="spinner"></div>
                            <p>Loading feedbacks...</p>
                        </div>
                    ) : filteredFeedbacks.length === 0 ? (
                        <div className="no-feedback-message">
                            <i className="fas fa-comments"></i>
                            <p>
                                No {activeCategory !== "All" ? activeCategory + " " : ""}feedback
                                available.
                            </p>
                        </div>
                    ) : (
                        <div className="feedback-list">
                            {filteredFeedbacks.map((f) => (
                                <div key={f._id} className="feedback-card">
                                    {/* Header */}
                                    <div className="feedback-header">
                                        <div className="user-info">
                                            <p>
                                                <strong>Name:</strong> {f.name}
                                            </p>
                                            <p>
                                                <strong>Email:</strong> {f.email}
                                            </p>
                                        </div>
                                        <div className="rating">
                                            <p>
                                                <strong>Rating:</strong>{" "}
                                                {Array(f.rating)
                                                    .fill()
                                                    .map((_, i) => (
                                                        <span key={i}>⭐</span>
                                                    ))}
                                            </p>
                                            {f.category && (
                                                <p>
                                                    <strong>Category:</strong>{" "}
                                                    <span className="category-badge">{f.category}</span>
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Feedback */}
                                    <div className="feedback-content">
                                        <p>
                                            <strong>Feedback:</strong>
                                        </p>
                                        <p className="feedback-text">{f.feedback}</p>
                                    </div>

                                    {/* Actions */}
                                    <div className="response-section">
                    <textarea
                        placeholder="Write your reply here..."
                        value={replies[f._id] || ""}
                        onChange={(e) =>
                            handleReplyChange(f._id, e.target.value)
                        }
                    />
                                        <div className="feedback-actions">
                                            <button
                                                className="feedback-action-btn reply-btn"
                                                onClick={() => handleReply(f._id)}
                                            >
                                                <i className="fas fa-reply"></i> Reply
                                            </button>
                                            <button
                                                className="feedback-action-btn email-btn"
                                                onClick={() => SendEmail(f.email, replies[f._id])}
                                                disabled={!replies[f._id]}
                                            >
                                                <i className="fas fa-envelope"></i> Send Email
                                            </button>
                                            <button
                                                className="feedback-action-btn delete-btn"
                                                onClick={() => handleDeleteClick(f._id)}
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
