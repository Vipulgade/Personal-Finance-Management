import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import WelcomeScreen from './WelcomeScreen';
import MainMenu from './MainMenu';
import ViewBalance from './ViewBalance';
import ViewTransactions from './ViewTransactions';
import AddTransaction from './AddTransaction';
import NavBar from './NavBar1';


const App = () => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const handleUserSubmit = async (userData) => {
        try {
            const response = await axios.post('http://localhost:8080/api/users', userData);
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
        } catch (error) {
            console.error('There was an error creating the user!', error);
        }
    };

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    return (
        <div className='content'>
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<UserCheck user={user} setUser={setUser} />} />
                <Route path="/welcome-screen" element={<WelcomeScreen onSubmit={handleUserSubmit} />} />
                <Route path="/view-balance" element={<ViewBalance userId={user?.id} />} />
                <Route path="/add-transaction" element={<AddTransaction userId={user?.id} />} />
                <Route path="/view-transactions" element={<ViewTransactions userId={user?.id} />} />
                <Route path="/main-menu" element={<MainMenu user={user} />} />
            </Routes>
        </Router></div>
    );
};

const UserCheck = ({ user, setUser }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkUserInDatabase = async () => {
            if (user) {
                try {
                    const response = await axios.get(`http://localhost:8080/api/users/${user.id}`);
                    if (!response.data) {
                        setUser(null);
                        navigate('/create-user');
                    }
                } catch (error) {
                    console.error('User not found in database:', error);
                    setUser(null);
                    navigate('/create-user');
                }
            } else {
                navigate('/create-user');
            }
        };

        checkUserInDatabase();
    }, [user, navigate, setUser]);

    return user ? <MainMenu user={user} /> : null;
};

export default App;
