import React, { createContext, useState, useEffect } from 'react';

const PasswordContext = createContext();

export const PasswordProvider = ({ children }) => {
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const addPassword = (newPassword) => {
    setPasswordArray(prevArray => {
      const updatedArray = [...prevArray, newPassword];
      localStorage.setItem("passwords", JSON.stringify(updatedArray));
      return updatedArray;
    });
  };

  return (
    <PasswordContext.Provider value={{ passwordArray, addPassword }}>
      {children}
    </PasswordContext.Provider>
  );
};

export default PasswordContext;