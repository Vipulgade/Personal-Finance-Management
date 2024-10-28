import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import bankIcon from './asset/bank-icon.png'; // Adjust the path as necessary
import './css/nav.css'
const NavBar = () => {
    return (
        <div className="container-fluid">
            <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
                <Navbar.Brand href="/">
                    <img
                        src={bankIcon}
                        alt="Bank Icon"
                        style={{ width: '30px', marginRight: '10px' }}
                    />
                    Finance Manager
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/add-transaction">Add Transaction</Nav.Link>
                        <Nav.Link href="/view-balance">View Balance</Nav.Link>
                        <Nav.Link href="/view-transactions">View Transactions</Nav.Link>
                        <Nav.Link href="/welcome-screen">Create User</Nav.Link>
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <h1 className="text-center my-4 text-dark">Finance Manager</h1>
        </div>
    );
};

export default NavBar;
