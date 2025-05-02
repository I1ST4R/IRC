import React, { createContext, useContext, useState } from 'react';

interface PersonalAccountContextType {
  isAccountOpen: boolean;
  toggleAccount: () => void;
}

const PersonalAccountContext = createContext<PersonalAccountContextType | undefined>(undefined);

export const PersonalAccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const toggleAccount = () => {
    setIsAccountOpen(!isAccountOpen);
  };

  return (
    <PersonalAccountContext.Provider value={{ isAccountOpen, toggleAccount }}>
      {children}
    </PersonalAccountContext.Provider>
  );
};

export const usePersonalAccount = () => {
  const context = useContext(PersonalAccountContext);
  if (context === undefined) {
    throw new Error('usePersonalAccount must be used within a PersonalAccountProvider');
  }
  return context;
}; 