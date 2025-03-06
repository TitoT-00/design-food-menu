import React, { createContext, useContext, useState, useEffect } from 'react';

const TitleContext = createContext();

export const useTitle = () => {
  const context = useContext(TitleContext);
  if (!context) {
    throw new Error('useTitle must be used within a TitleProvider');
  }
  return context;
};

export const TitleProvider = ({ children }) => {
  const [title, setTitle] = useState('Food Menu POS');
  const [storeName, setStoreName] = useState('Food Menu POS');

  useEffect(() => {
    document.title = title;
  }, [title]);

  const updateTitle = (newTitle) => {
    setTitle(newTitle);
  };

  const updateStoreName = (newName) => {
    setStoreName(newName);
    localStorage.setItem('storeName', newName);
  };

  // Initialize store name from localStorage
  useEffect(() => {
    const savedName = localStorage.getItem('storeName');
    if (savedName) {
      setStoreName(savedName);
    }
  }, []);

  return (
    <TitleContext.Provider value={{ 
      title,
      storeName,
      updateTitle,
      updateStoreName
    }}>
      {children}
    </TitleContext.Provider>
  );
};
