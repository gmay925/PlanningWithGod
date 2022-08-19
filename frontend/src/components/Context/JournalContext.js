import { createContext, useReducer } from 'react';

export const JournalsContext = createContext()

export const journalsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_JOURNALS':
      return { 
        journals: action.payload 
      }
    case 'CREATE_JOURNAL':
      return { 
        journals: [action.payload, ...state.journals] 
      }
    case 'DELETE_JOURNAL':
      return { 
        journals: state.journals.filter(w => w._id !== action.payload._id) 
      };
      case 'UPDATE_JOURNAL':
      return {
        journals: state.journals.map(
          (w) => {
            if(w._id == action.payload._id){
              return action.payload
            }
            return w
          }),
      };
    default:
      return state
  }
}

export const JournalsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(journalsReducer, { 
    journals: null
  })
  
  return (
    <JournalsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </JournalsContext.Provider>
  )
}