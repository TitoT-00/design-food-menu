import React, { createContext, useContext, useState } from 'react';

const initialMenuItems = [
  // Main Course
  { id: '1', name: 'Spicy Arrabiata Penne', price: 12.99, category: 'Main Course', description: 'Penne pasta with spicy tomato sauce', imageUrl: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg' },
  { id: '2', name: 'Margherita Pizza', price: 12.99, category: 'Main Course', description: 'Fresh tomatoes, mozzarella, and basil', imageUrl: 'https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg' },
  { id: '3', name: 'Chicken Alfredo', price: 14.99, category: 'Main Course', description: 'Creamy pasta with grilled chicken', imageUrl: 'https://www.themealdb.com/images/media/meals/syqypv1486981727.jpg' },
  // Starters
  { id: '4', name: 'Caesar Salad', price: 7.99, category: 'Starters', description: 'Crisp romaine with classic Caesar dressing', imageUrl: 'https://www.themealdb.com/images/media/meals/wvqpwt1468339226.jpg' },
  { id: '5', name: 'Garlic Bread', price: 4.99, category: 'Starters', description: 'Toasted bread with garlic butter', imageUrl: 'https://www.themealdb.com/images/media/meals/xqwwpy1483908697.jpg' },
  // Beverages
  { id: '6', name: 'Iced Tea', price: 2.99, category: 'Beverages', description: 'Fresh brewed and chilled', imageUrl: 'https://www.themealdb.com/images/media/meals/qxutws1486978099.jpg' },
  { id: '7', name: 'Lemonade', price: 2.99, category: 'Beverages', description: 'Freshly squeezed', imageUrl: 'https://www.themealdb.com/images/media/meals/vrspxv1511722107.jpg' },
  // Desserts
  { id: '8', name: 'Chocolate Cake', price: 6.99, category: 'Desserts', description: 'Rich and decadent', imageUrl: 'https://www.themealdb.com/images/media/meals/wpputp1511812960.jpg' },
  { id: '9', name: 'Apple Pie', price: 4.99, category: 'Desserts', description: 'Classic American dessert', imageUrl: 'https://www.themealdb.com/images/media/meals/xvsurr1511719182.jpg' }
];

const MenuContext = createContext();

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [categories, setCategories] = useState(() => {
    // Initialize categories from initial menu items
    const uniqueCategories = new Set(initialMenuItems.map(item => item.category));
    return Array.from(uniqueCategories);
  });

  const addMenuItem = (newItem) => {
    setMenuItems([...menuItems, { ...newItem, id: Date.now().toString() }]);
    
    // Add new category if it doesn't exist
    if (!categories.includes(newItem.category)) {
      setCategories([...categories, newItem.category]);
    }
  };

  const updateMenuItem = (updatedItem) => {
    setMenuItems(menuItems.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ));
  };

  const deleteMenuItem = (itemId) => {
    setMenuItems(menuItems.filter(item => item.id !== itemId));
  };

  return (
    <MenuContext.Provider value={{ 
      menuItems, 
      categories,
      addMenuItem, 
      updateMenuItem, 
      deleteMenuItem 
    }}>
      {children}
    </MenuContext.Provider>
  );
};
