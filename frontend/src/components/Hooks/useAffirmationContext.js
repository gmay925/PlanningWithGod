import { AffirmationsContext } from '../Context/AffirmationContext';
import { useContext } from 'react';

export const useAffirmationsContext = () => {
  const context = useContext(AffirmationsContext)

  if(!context) {
    throw Error('useAffirmationsContext must be used inside an AffirmationsContextProvider')
  }

  return context
}