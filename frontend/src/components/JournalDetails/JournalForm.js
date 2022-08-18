import { useState } from 'react'
import { useJournalsContext } from "../Hooks/useJournalsContext";
import { useAuthContext } from '../Hooks/useAuthContext';
import Form from "react-bootstrap/Form";

const JournalForm = () => {
  const { dispatch } = useJournalsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState('');
  const [gratitude, setGratitude] = useState('');
  const [visualize, setVisualize] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in')
      return
    }

    const journal = { title, gratitude, visualize };

    const response = await fetch('/api/journals', {
      method: 'POST',
      body: JSON.stringify(journal),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json();

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle('');
      setGratitude('');
      setVisualize('');
      setError(null);
      setEmptyFields([]);
      dispatch({type: 'CREATE_JOURNAL', payload: json});
    }
  }

  return (
    <Form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Journal</h3>

      <label>Journal Entry Title:</label>
      <input 
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Journal Title"
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>What are you grateful for:</label>
      <input 
        type="text"
        onChange={(e) => setGratitude(e.target.value)}
        value={gratitude}
        className={emptyFields.includes('gratitude') ? 'error' : ''}
      />

      <label>Visualize how your future will be for 60 seconds. What did you see?</label>
      <input 
        type="text"
        onChange={(e) => setVisualize(e.target.value)}
        value={visualize}
        className={emptyFields.includes('visualize') ? 'error' : ''}
      />

      <button>Add Journal</button>
      {error && <div className="error">{error}</div>}
    </Form>
  )
}

export default JournalForm;