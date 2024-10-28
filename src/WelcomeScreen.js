import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [initialIncome, setInitialIncome] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, initialIncome: Number(initialIncome) };
    try {
      const response = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const result = await response.json();
      const userId = result.id; // Assuming the response contains the user ID
      onSubmit({ ...userData, userId });
      setSuccessMessage(`User added successfully! User ID: ${userId}`);
      setTimeout(() => {
        navigate('/main-menu'); // Navigate to the main menu after showing the message
      }, 3000); // Adjust the delay as needed
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">User Registration</h1>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Initial Income</label>
          <input
            type="number"
            className="form-control"
            value={initialIncome}
            onChange={(e) => setInitialIncome(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Start</button>
      </form>
    </div>
  );
};

export default WelcomeScreen;
