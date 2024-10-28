import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewBalance = () => {
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [ setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(''); // Initialize with an empty string

  const fetchUserData = async (userId) => {
    try {
      const userResponse = await axios.get(`http://localhost:8080/api/users/${userId}`);
      setUser(userResponse.data);
    } catch (error) {
      setError('Error fetching user details.');
      console.error('Error fetching user details:', error);
    }
  };

  const fetchBalance = async (userId) => {
    try {
      const balanceResponse = await axios.get(`http://localhost:8080/api/users/${userId}/balance`);
      setBalance(balanceResponse.data);
    } catch (error) {
      setError('Error fetching balance.');
      console.error('Error fetching balance:', error);
    }
  };

  const fetchTransactions = async (userId) => {
    try {
      const transactionsResponse = await axios.get(`http://localhost:8080/api/users/${userId}/transactions`);
      setTransactions(transactionsResponse.data);
    } catch (error) {
      
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserData(userId);
      fetchBalance(userId);
    }
  }, [userId]);

  const handleSearch = () => {
    if (userId) {
      setLoading(true);
      setError('');
      fetchUserData(userId);
      fetchTransactions(userId).finally(() => setLoading(false));
    } else {
      setError('Please enter a valid user ID.');
    }
  };

  return (
    <div className="container">
      <h2>Transaction History</h2>
      {error && <p className="text-danger">{error}</p>}
      <div className="mb-4">
        <label htmlFor="userId">User ID:</label>
        <input
          type="text"
          id="userId"
          name="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="form-control"
        />
        <button onClick={handleSearch} className="btn btn-primary mt-2">Search</button>
      </div>
      {loading && <p>Loading...</p>}
      {user && (
        <div className="mb-4">
          <h4>User Details</h4>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Name:</strong> {user.name}</p>
        </div>
      )}
      <h4>Current Balance: ${balance}</h4>
      
      
    </div>
  );
};

export default ViewBalance;
