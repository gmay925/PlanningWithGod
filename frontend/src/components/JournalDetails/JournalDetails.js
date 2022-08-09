import { useJournalsContext } from "../../Hooks/useJournalsContext";
import { useAuthContext } from "../../Hooks/useAuthContext";

//date-fns 
import formatDistanceToNow from 'date-fns/formatDistanceToNow';


const JournalDetails = ({ journal }) => {
  const { dispatch } = useJournalsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
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
      <p><strong>Gratitude: </strong>{journal.load}</p>
      <p><strong>Visualize </strong>{journal.reps}</p>
      <p>{formatDistanceToNow(new Date(journal.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default JournalDetails