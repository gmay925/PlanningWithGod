import React, { createContext, useReducer } from 'react';

export const AffirmationsContext = createContext();

export const allergiesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_AFFIRMATIONS':
      return {
        affirmations: action.payload,
      };
      case 'ADD_AFFIRMATIONS':
  }
}