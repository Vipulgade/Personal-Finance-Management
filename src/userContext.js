import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleUserSubmit = (userData) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, handleUserSubmit }}>
      {children}
    </UserContext.Provider>
  );
};
