import React, { createContext, useContext, useState } from 'react';
import { usePOSLogic } from '@/hooks/usePOSLogic';

const POSContext = createContext(null);

export const usePOS = () => {
  const context = useContext(POSContext);
  if (!context) {
    throw new Error('usePOS must be used within a POSProvider');
  }
  return context;
};

export const POSProvider = ({ children }) => {
  const posLogic = usePOSLogic();

  return (
    <POSContext.Provider value={posLogic}>
      {children}
    </POSContext.Provider>
  );
};