import React, { createContext } from 'react'; 

export const UserContext = createContext({
  id: null, 
  setId: () => {},
  role: null,
  setRole: () => {},
})

