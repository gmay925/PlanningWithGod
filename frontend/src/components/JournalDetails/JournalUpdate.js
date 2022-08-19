import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import { useJournalsContext } from '../Hooks/useJournalsContext';
import { useAuthContext } from '../Hooks/useAuthContext';

const JournalUpdate = ({ journal }) => {
  const { dispatch } = useJournalsContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState(journal.title);
  const [gratitude, setGratitude] = useState(journal.gratitude);
  const [visualize, setVisualize] = useState(journal.visualize);
  const [error, setError] = useState(null);

  const handleEdit = async (e) => {
    e.preventDefault()
    
    if (!user) {
      return
    }
    
    const response = await fetch('/api/journals/' + journal._id, {
      method:'PUT',
      body: JSON.stringify({title, gratitude, visualize}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`, 
      }
    })
    const json = await response.json();
    
    if (response.ok) {
      setTitle('');
      setGratitude('');
      setVisualize('');
      dispatch({type: 'UPDATE_JOURNAL', payload: json})
    }
  }

  return (
    <Form className="update" onSubmit={handleEdit}>
      <h3>Edit Journal</h3>

      <label>Journal Entry Title:</label>
      <input 
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>What are you grateful for:</label>
      <input 
        type="text"
        onChange={(e) => setGratitude(e.target.value)}
        value={gratitude}
      />

      <label>Visualize how your future will be for 60 seconds. What did you see?</label>
      <input 
        type="text"
        onChange={(e) => setVisualize(e.target.value)}
        value={visualize}
      />

<div className="material-symbols-outlined" onClick={handleEdit}>edit</div>
      {error && <div className="error">{error}</div>}
    </Form>
  )
}
export default JournalUpdate;
