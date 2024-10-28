import React, { useState } from 'react';
import axios from 'axios';

const AddTransaction = () => {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [initialIncome, setInitialIncome] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('income'); // Default to 'income'
  const [message, setMessage] = useState('');

  const handleAddTransaction = async () => {
    try {
      let userIdToUse = userId;

      // If no user ID is provided, create a new user
      if (!userId) {
        const userResponse = await axios.post('http://localhost:8080/api/users', {
          name,
          initialIncome: Number(initialIncome),
        });
        userIdToUse = userResponse.data.id;
        setMessage(`User created successfully! User ID: ${userIdToUse}`);
      }

      // Add the transaction for the user
      const transactionResponse = await axios.post(`http://localhost:8080/api/users/${userIdToUse}/transactions`, {
        type,
        amount: Number(amount), // Ensure amount is a number
        category,
      });

      if (transactionResponse.status === 200) {
        setMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} added successfully!`);
        setAmount(0);
        setCategory('');
      }
    } catch (error) {
      setMessage(`Failed to add ${type}. Please try again. create the new user `);
    }
  };

  return (
    <div className="container">
      <h2>Add {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
      <div className="form-group">
        <label>User ID (leave blank to create new user)</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="User ID"
          className="form-control"
        />
      </div>
      {!userId && (
        <>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Initial Income</label>
            <input
              type="number"
              value={initialIncome}
              onChange={(e) => setInitialIncome(e.target.value)}
              placeholder="Initial Income"
              className="form-control"
            />
          </div>
        </>
      )}
      <div className="form-group">
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)} className="form-control">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div className="form-group">
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="form-control"
        />
      </div>
      <button onClick={handleAddTransaction} className="btn btn-primary mt-2">Add {type.charAt(0).toUpperCase() + type.slice(1)}</button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};

export default AddTransaction;
