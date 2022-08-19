import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useAuthContext } from '../Hooks/useAuthContext';
import { useAffirmationsContext } from '../Hooks/useAffirmationContext';
import React, {useEffect, useState} from 'react';

const AffirmationDetails = ({ affirmation }) => {
  const { dispatch } = useAffirmationsContext();
  const { user } = useAuthContext();
  const [click, setClick] = useState(false)

  useEffect(() => {
    setClick(false)
  }, [affirmation])

  const handleDelete = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/affirmations/' + affirmation._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_AFFIRMATION', payload: json})
    };
  };

  return (
    <div className="workout-details">
      <h4>{affirmation.affirmations}</h4>
      <p><strong>Affirmation</strong>{affirmation.affirmations}</p>
      <p><strong>Do You Believe </strong>{affirmation.believe}</p>
      <p>{formatDistanceToNow(new Date(affirmation.createdAt), { addSuffix: true })}</p>
      <span className='affirmation-update'>
        <div className="material-symbols-outlined test1" onClick={handleDelete}>delete</div>
      </span>
  </div>
  )
}




export default AffirmationDetails;