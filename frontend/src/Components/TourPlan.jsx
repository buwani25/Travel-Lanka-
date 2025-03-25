import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./TourPlan.css";

const TourPlanForm = () => {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstDestination: "",
    firstFromDate: "",
    firstToDate: "",
    secondDestination: "",
    secondFromDate: "",
    secondToDate: "",
    tourGuide: "",
    guideLanguage: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const tourPlanData = {
      tourId,
      ...formData,
      guideLanguage: formData.tourGuide === "Yes" ? formData.guideLanguage : undefined,
    };

    try {
      const response = await axios.post(`http://localhost:5000/api/tour-plan`, tourPlanData);

      if (response.data.success) {
        setSuccessMessage("Tour Plan submitted successfully!");
        setTimeout(() => {
          navigate("/CusDashboard");
        }, 2000);
      }
    } catch (err) {
      console.error("Error submitting tour plan:", err);
      setErrorMessage("Failed to submit tour plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tour-plan-container">
      <form onSubmit={handleSubmit} className="tour-plan-form">
        <h2 className="form-title">Tour Plan</h2>
        <p className="tour-id">Tour ID: {tourId}</p>

        <label className="form-label">First Destination:</label>
        <input
          type="text"
          name="firstDestination"
          className="form-label"
          value={formData.firstDestination}
          onChange={handleChange}
          required
        />

        <div className="form-group-row">
          <div className="form-group">
            <label className="form-label">From:</label>
            <input
              type="date"
              name="firstFromDate"
              value={formData.firstFromDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">To:</label>
            <input
              type="date"
              name="firstToDate"
              className="form-input"
              value={formData.firstToDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <label className="form-label">Second Destination:</label>
        <input
          type="text"
          name="secondDestination"
          className="form-input"
          value={formData.secondDestination}
          onChange={handleChange}
          required
        />

        <div className="form-group-row">
          <div className="form-group">
            <label className="form-label">From:</label>
            <input
              type="date"
              name="secondFromDate"
              className="form-input"
              value={formData.secondFromDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">To:</label>
            <input
              type="date"
              name="secondToDate"
              className="form-input"
              value={formData.secondToDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <label className="form-label">Do you prefer a Tour Guide?</label>
        <select name="tourGuide" className="form-select" value={formData.tourGuide} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        {formData.tourGuide === "Yes" && (
          <div className="form-group">
            <label className="form-label">Preferred Guide Language:</label>
            <select
              name="guideLanguage"
              className="form-select"
              value={formData.guideLanguage}
              onChange={handleChange}
              required
            >
              <option value="">Select Language</option>
              <option value="Sinhala">Sinhala</option>
              <option value="English">English</option>
              <option value="Tamil">Tamil</option>
            </select>
          </div>
        )}

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default TourPlanForm;
