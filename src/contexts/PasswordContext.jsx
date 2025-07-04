import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
const PasswordContext = createContext();

export const PasswordProvider = ({ children }) => {
  const [passwordArray, setPasswordArray] = useState([]);
  const [editingPassword, setEditingPassword] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch all passwords from the backend
  const getPasswords = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://localhost:3000/");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      // Map MongoDB's '_id' to 'id' for frontend consistency
      const formattedPasswords = data.map(item => ({ ...item, id: item._id || item.id }));
      setPasswordArray(formattedPasswords);
    } catch (e) {
      console.error("Failed to fetch passwords:", e);
      setError("Failed to load passwords. Please try again.");
      setPasswordArray([]);
    } finally {
      setLoading(false);
    }
  };

  // useEffect to fetch passwords on initial component mount
  useEffect(() => {
    getPasswords();
  }, []);

  // Function to add a new password to the backend
  const addPassword = async (newPassword) => {
    const tempId = uuidv4(); // Generate a temporary UUID for optimistic UI update
    const passwordWithTempId = { ...newPassword, id: tempId };
    // Optimistically add the new password to the UI
    setPasswordArray(prevArray => [...prevArray, passwordWithTempId]);
    try {
      const response = await fetch("http://localhost:3000/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPassword),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const addedPassword = await response.json();
      if (!addedPassword || !addedPassword._id) {
        console.error("Backend did not return a valid _id for the added password. Received:", addedPassword);
        throw new Error("Failed to add password: Missing unique ID from server response.");
      }
      // Replace the temporary item with the actual item from the backend response
      setPasswordArray(prevArray =>
        prevArray.map(item =>
          item.id === tempId ? { ...addedPassword, id: addedPassword._id} : item
        )
      );
    } catch (e) {
      console.error('Error adding password:', e);
      setError("Failed to add password. Please try again.");
      // Rollback the optimistic update if the API call fails
      setPasswordArray(prevArray => prevArray.filter(item => item.id !== tempId));
    }
  };

  // Function to update an existing password on the backend
  const updatePassword = async (updatedPassword) => {
    // Optimistically update the UI
    const originalPassword = passwordArray.find(p => p.id === updatedPassword.id);
    setPasswordArray(prevArray =>
      prevArray.map(item =>
        item.id === updatedPassword.id ? updatedPassword : item
      )
    );
    try {
      const idToUpdate = updatedPassword.id;
      // Create a new object for the request body that excludes _id and id
      // Use object destructuring to safely remove these fields
      const { _id, id, ...dataToSend } = updatedPassword;
      const response = await fetch(`http://localhost:3000/${idToUpdate}`, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend), // Send only dataToSend in the body
        });
      if (!response.ok) {
        // Attempt to parse error message from backend
        const errorBody = await response.json().catch(() => ({ message: 'No specific error message from server.' }));
        throw new Error(`HTTP error! Status: ${response.status}. Message: ${errorBody.message || 'Unknown error.'}`);
      }
      const data = await response.json();
      setPasswordArray(prevArray =>
       prevArray.map(item =>
        item.id === idToUpdate ? { ...data, id: data._id || data.id } : item
       )
      );
    }
    catch (e) {
      console.error('Error updating password:', e);
      setError("Failed to update password. Please try again. " + e.message); // Add error message to UI
      if (originalPassword) {
        setPasswordArray(prevArray =>
          prevArray.map(item =>
            item.id === originalPassword.id ? originalPassword : item
          )
        );
      }
    }
  };

  // Function to delete a password from the backend
  const deletePassword = async (idToDelete) => {
    // Optimistically remove from UI
    const originalPasswordArray = passwordArray; // Store for rollback
    setPasswordArray(prevArray => prevArray.filter(item => item.id !== idToDelete));

    try {
      const response = await fetch(`http://localhost:3000/${idToDelete}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // If deletion is successful, state is already updated
    } catch (e) {
      console.error('Error deleting password:', e);
      setError("Failed to delete password. Please try again.");
      // Rollback the optimistic update if the API call fails
      setPasswordArray(originalPasswordArray);
    }
  };

  const clearEditingPassword = () => {
    setEditingPassword(null);
  };

  return (
    <PasswordContext.Provider value={{
      passwordArray,
      addPassword,
      updatePassword,
      deletePassword,
      editingPassword,
      setEditingPassword,
      clearEditingPassword,
      loading,
      error,
    }}>
      {children}
    </PasswordContext.Provider>
  );
};

export default PasswordContext;