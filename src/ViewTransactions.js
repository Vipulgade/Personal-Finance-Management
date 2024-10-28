import React, { useState, useEffect } from 'react';
import { getUserDetails, getUserTransactions } from './apiService';

const ViewTransactions = () => {
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchUserData = async (id) => {
        try {
            const response = await getUserDetails(id);
            console.log('User data:', response.data); // Debugging log
            setUser(response.data);
        } catch (err) {
            setError('Failed to fetch user data. Please try again.');
            console.error('Error fetching user data:', err);
        }
    };

    const fetchTransactions = async (id) => {
        try {
            const response = await getUserTransactions(id);
            console.log('Transactions data:', response.data); // Debugging log
            setTransactions(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            setError('Failed to fetch transactions. Please try again.');
            console.error('Error fetching transactions:', err);
        }
    };

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

    useEffect(() => {
        console.log('Transactions state:', transactions); // Debugging log
    }, [transactions]);

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
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Total Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length > 0 ? (
                        transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.id}</td>
                                <td>{transaction.date}</td>
                                <td>{transaction.category}</td>
                                <td>${transaction.amount}</td>
                                <td>{transaction.type}</td>
                                <td>{transaction.totalBalance}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No transactions found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ViewTransactions;
