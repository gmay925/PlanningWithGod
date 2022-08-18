import React, { createContext, useReducer } from 'react';

export const GoalsContext = createContext();

export const goalsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_GOALS':
      return {
        goals: action.payload,
      };
    case 'CREATE_GOAL':
      return {
        goals: [action.payload, ...state.goals],
      };
    case 'DELETE_GOAL':
      return {
        goals: state.goals.filter((w) => w._id !== action.payload._id),
      };
      case 'UPDATE_GOAL':
      return {
        goals: state.goals.map(
          (w) => {
            if(w._id == action.payload._id){
              return action.payload
            }
            return w
          }),
      };
    default:
      return state;
  }
};

export function GoalsContextProvider({ children }) {
  const [state, dispatch] = useReducer(goalsReducer, { 
    goals: null,
  });

  return (
    <GoalsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </GoalsContext.Provider>
  );
};