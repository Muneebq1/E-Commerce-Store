import React, { createContext, useReducer } from 'react'
import { reducer } from './reducer';


let initialState = {
  user: {},
  isLogin: null,
  baseUrl: (window.location.href.includes('localhost')) 
  ? 
  `http://localhost:5001/api/v1` : `/api/v1`
  
}

export const GlobalContext = createContext(initialState);

export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}