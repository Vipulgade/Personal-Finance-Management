import React, { useState } from 'react';
import { Navbar, Nav, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const MainMenu = () => {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setUserId(e.target.value);
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
      setUser(response.data);
      setError('');
    } catch (err) {
      setError('User not found');
      setUser(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUserDetails();
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Hello, welcome to Personal Finance Management System!</h1>

      <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Card className="border border-danger p-4" style={{ width: '100%', maxWidth: '600px' }}>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUserId">
                <Form.Label>User ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter user ID"
                  value={userId}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Fetch User Details
              </Button>
            </Form>
            {error && <p className="text-danger mt-3">{error}</p>}
            {user && (
              <div className="mt-4 text-center">
                <h2>User Details</h2>
                <h4>Welcome -: {user.name}</h4>
                <h4>Account Number:- {user.id}</h4>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default MainMenu;
