import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './CustomerDetails.css';

const CustomerDetailsForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [tourId, setTourId] = useState(null);

  const { id } = useParams(); // Get the ID from the URL (if available)
  const navigate = useNavigate();

  // Fetch customer data if in update mode (i.e., if id is available)
  useEffect(() => {
    if (id) {
      // Fetch the current customer data for updating
      axios.get(`http://localhost:5000/api/customers/${id}`)
        .then(response => {
          const customer = response.data;
          setFirstName(customer.firstName);
          setLastName(customer.lastName);
          setContactNo(customer.contactNo);
          setEmail(customer.email);
          setTourId(customer.tourId);
        })
        .catch(err => console.error('Error fetching customer:', err)); // Log error, but do not display it
    }
  }, [id]);

  // Handle form submission (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const customerData = { firstName, lastName, contactNo, email };

    try {
      let response;
      if (id) {
        // Update existing customer
        response = await axios.put(`http://localhost:5000/api/customers/${id}`, customerData);
      } else {
        // Create new customer
        response = await axios.post('http://localhost:5000/api/customers', customerData);
      }

      if (response.data.success) {
        setTourId(response.data.tourId);
        setSuccessMessage(id ? 'Customer updated successfully!' : 'Customer submitted successfully!');

        // Only navigate to Pending Tours if it's an update
        if (id) {
          setTimeout(() => {
            navigate('/pendingtours'); // Navigate to Pending Tours page after update
          }, 2000); // Delay before redirecting
        } else {
          setTimeout(() => {
            // Navigate to the Transport Form with the generated tourId for new customers
            navigate(`/Transport/${response.data.tourId}`);
          }, 2000); // Delay before redirecting
        }
      }s
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  return (
    <div className=" customer-form-container">
      <form className="customer-form" onSubmit={handleSubmit}>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <h2 className="customer-form-title" >{id ? 'Update Customer Details' : 'Customer Details Form'}</h2>
        </div>
        <label className="form-label">First Name:</label>
        <input
          className='form-input'
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <label className='form-label'>Last Name:</label>
        <input
          className='form-input'
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <label className='form-label'>Contact No:</label>
        <input
          className='form-input'
          type="text"
          value={contactNo}
          onChange={(e) => setContactNo(e.target.value)}
          required
        />

        <label className='form-label'>Email Address:</label>
        <input
          className='form-input'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button className='submit-button' type="submit">{id ? 'Update' : 'Submit'}</button>

        {/* Success message */}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default CustomerDetailsForm;
