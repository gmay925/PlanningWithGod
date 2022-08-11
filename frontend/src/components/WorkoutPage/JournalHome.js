import { useEffect } from "react";
import { useJournalsContext } from "../Hooks/useJournalsContext";
import { useAuthContext } from '../Hooks/useAuthContext';
import JournalDetails from '../JournalDetails/JournalDetails';
import JournalForm from "../JournalDetails/JournalForm";

const JournalHome = () => {
  const {journals, dispatch} = useJournalsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchJournals = async () => {
      const response = await fetch('/api/journals', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_JOURNALS', payload: json})
      }
    }

    if (user) {
      fetchJournals()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="journals">
        {journals && journals.map((journal) => (
          <JournalDetails key={journal._id} journal={journal} />
        ))}
      </div>
      <JournalForm />
    </div>
  )
}

export default JournalHome;