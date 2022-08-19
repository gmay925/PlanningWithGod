import React, { createContext, useReducer } from 'react';

export const AffirmationsContext = createContext();

export const affirmationsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_AFFIRMATIONS':
      return {
        affirmations: action.payload,
      };
    case 'CREATE_AFFIRMATION':
      return {
        affirmations: [action.payload, ...state.affirmations],
        };
    case 'DELETE_AFFIRMATION':
      return {
        affirmations: state.affirmations.filter((w) => w._id !== action.payload._id),
      };
      default:
        return state;
  }
};

export function AffirmationsContextProvider({ children }) {
  const [state, dispatch] = useReducer(affirmationsReducer, { 
    affirmations: null,
  });

  return (
    <AffirmationsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AffirmationsContext.Provider>
  );
};