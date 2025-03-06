import React, { createContext, useContext, useState, useEffect } from 'react';

const TaxTipContext = createContext();

export const useTaxTip = () => {
  const context = useContext(TaxTipContext);
  if (!context) {
    throw new Error('useTaxTip must be used within a TaxTipProvider');
  }
  return context;
};

export const TaxTipProvider = ({ children }) => {
  const [salesTax, setSalesTax] = useState(() => {
    const saved = localStorage.getItem('salesTax');
    return saved ? parseFloat(saved) : 8.875;
  });

  const [defaultTipOptions, setDefaultTipOptions] = useState(() => {
    const saved = localStorage.getItem('tipOptions');
    return saved ? JSON.parse(saved) : [19, 20, 22];
  });

  useEffect(() => {
    localStorage.setItem('salesTax', salesTax.toString());
  }, [salesTax]);

  useEffect(() => {
    localStorage.setItem('tipOptions', JSON.stringify(defaultTipOptions));
  }, [defaultTipOptions]);

  const updateSalesTax = (newTax) => {
    setSalesTax(parseFloat(newTax));
  };

  const updateTipOptions = (newOptions) => {
    setDefaultTipOptions(newOptions);
  };

  return (
    <TaxTipContext.Provider value={{
      salesTax,
      defaultTipOptions,
      updateSalesTax,
      updateTipOptions
    }}>
      {children}
    </TaxTipContext.Provider>
  );
};
