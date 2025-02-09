import React, { createContext, useState } from 'react';

// Create Context
export const TimerContext = createContext();

// Create Provider Component
export const TimerProvider = ({ children }) => {
  const [timers, setTimers] = useState([]); // Global State

  
  return (
    <TimerContext.Provider value={{ timers, setTimers }}>
      {children}
    </TimerContext.Provider>
  );
};
