import { useEffect, useState } from 'react';
import { useAuthContext } from '../Hooks/useAuthContext';
import { useAffirmationsContext } from '../Hooks/useAffirmationContext';
import AffirmationForm from './AffirmationForm';
import AffirmationDetails from './AffirmationDetails';


const AffirmationPage = () => {
  const {affirmations, dispatch} = useAffirmationsContext();
  const {user} = useAuthContext();

  useEffect(() => {
    const fetchAffirmations = async () => {
      const response = await fetch('/api/affirmations', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_AFFIRMATIONS', payload: json })
      }
    }
    if(user) {
      fetchAffirmations()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="goals">
        {affirmations && affirmations.map((affirmation) => (
          <AffirmationDetails key={affirmation._id} affirmation={affirmation} /> 
          ))}
      </div>
          <AffirmationForm />
    </div>
  )
}

export default AffirmationPage;
