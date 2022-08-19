import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useJournalsContext } from "../Hooks/useJournalsContext";
import { useAuthContext } from "../Hooks/useAuthContext";
import React, {useEffect, useState} from 'react';
import JournalUpdate from './JournalUpdate';

const JournalDetails = ({ journal }) => {
  const { dispatch } = useJournalsContext()
  const { user } = useAuthContext();
  const [click, setClick] = useState(false)

  useEffect(() => {
    setClick(false)
  }, [journal])

  const handleDelete = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/journals/' + journal._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_JOURNAL', payload: json})
    }
  }

  return (
    <div className="journal-details">
      <h4>{journal.title}</h4>
      <p><strong>Gratitude: </strong>{journal.gratitude}</p>
      <p><strong>Visualize </strong>{journal.visualize}</p>
      <p>{formatDistanceToNow(new Date(journal.createdAt), { addSuffix: true })}</p>
      {click && <JournalUpdate journal={journal} />}
      <span className='journal-update'>
        <div className="material-symbols-outlined test" onClick={()=> setClick(true)}>edit</div></span>
        <span className='journal-delete'>
        <div className="material-symbols-outlined test1" onClick={handleDelete}>delete</div>
      </span>
    </div>
  )
}

export default JournalDetails;