import React, { useState } from "react";
import "./feedback.css";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    feedback: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000); // Hide message after 3s
  };

  return (
    <div className="feedback-container">
      <h2 className="feedback-title">We Value Your Feedback!</h2>
      
      {submitted && <p className="feedback-success">Feedback submitted successfully! </p>}
      
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="feedback-input-group">
          <label className="feedback-label">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="feedback-input"
            required
          />
        </div>

        <div className="feedback-input-group">
          <label className="feedback-label">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="feedback-input"
            required
          />
        </div>

        <div className="feedback-input-group">
          <label className="feedback-label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="feedback-input"
            required
          />
        </div>

        <div className="feedback-input-group">
          <label className="feedback-label">Describe Your Feedback</label>
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            className="feedback-textarea"
            required
          ></textarea>
        </div>

        <button type="submit" className="feedback-submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
