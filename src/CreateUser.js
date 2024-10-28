import React, { useState } from 'react';

const CreateUser = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [initialIncome, setInitialIncome] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, initialIncome });
  };

  return (
    <div className="container">
      <h1>Hello, welcome to Personal Finance Management System!</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Initial Income</label>
          <input type="number" className="form-control" value={initialIncome} onChange={(e) => setInitialIncome(Number(e.target.value))} />
        </div>
        <button type="submit" className="btn btn-primary">Start</button>
      </form>
    </div>
  );
};

export default CreateUser;
