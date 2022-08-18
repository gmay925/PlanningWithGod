import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import { useGoalsContext } from '../Hooks/useGoalContext';
import { useAuthContext } from '../Hooks/useAuthContext';

const GoalForm = () => {
  const { dispatch } = useGoalsContext();
  const { user } = useAuthContext();

  const [goals, setGoals] = useState('');
  const [timeFrame, setTimeFrame] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const goal = { goals, timeFrame };

    const response = await fetch('/api/goals', {
      method: 'POST',
      body: JSON.stringify(goal),
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
      setGoals('');
      setTimeFrame('');
      setError(null);
      setEmptyFields([]);
      dispatch({ type: 'CREATE_GOAL', payload: json })
    }
  };

  return (
    <Form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Goal</h3>

      <label>Goal:</label>
      <input 
        type="text"
        value={goals}
        className={emptyFields.includes('goals') ? 'error' : ''}
        onChange={(e) => setGoals(e.target.value)}
        placeholder="Add a goal"
      />
      <label>Time:</label>
      <input 
        type="text"
        value={timeFrame}
        className={emptyFields.includes('timeFrame') ? 'error' : ''}
        onChange={(e) => setTimeFrame(e.target.value)}
        placeholder="What time frame?"
      />
      <button>Add Goal</button>
      {error && <div className="error">{error}</div>}
    </Form>
  );
}

export default GoalForm;
