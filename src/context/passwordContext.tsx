import React, { createContext, useContext, useState } from 'react';

interface ForgotPasswordContextProps {
    isRedirected: boolean,
    setIsRedirected: React.Dispatch<React.SetStateAction<boolean>>
}

const ForgotPasswordContext = createContext<ForgotPasswordContextProps>({
    isRedirected: false,
    setIsRedirected: () => {},
});

export const ForgotPasswordProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRedirected, setIsRedirected] = useState(false);
  return (
    <ForgotPasswordContext.Provider value={{ isRedirected, setIsRedirected }}>
      {children}
    </ForgotPasswordContext.Provider>
  );
};

export const useForgotPassword = () => useContext(ForgotPasswordContext);
