import React, { createContext, useEffect, useMemo, useState } from 'react';

const contextData = {
  username: '',
  email: '',
  isLoggedIn: false,
};

const context = createContext(contextData);

export function ContextProvider({ children }) {
  const [userData, setUserData] = useState(contextData);
  const userContext = useMemo(
    () => ({ userData, setUserData }),
    [userData, setUserData],
  );

  useEffect(() => {
    let savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      savedUserData = JSON.parse(savedUserData);
      setUserData({ ...userData, ...savedUserData });
    }
  }, [userData.isLoggedIn]);

  return <context.Provider value={userContext}>{children}</context.Provider>;
}

export default context;
