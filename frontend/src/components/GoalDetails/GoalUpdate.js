import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import { useGoalsContext } from '../Hooks/useGoalContext';
import { useAuthContext } from '../Hooks/useAuthContext';

const GoalUpdate = ({ goal }) => {
  const { dispatch } = useGoalsContext();
  const { user } = useAuthContext();
  const [goals, setGoals] = useState(goal.goals);
  const [timeFrame, setTimeFrame] = useState(goal.timeFrame);
  const [error, setError] = useState(null);

  const handleEdit = async (e) => {
    e.preventDefault()
    
    if (!user) {
      return
    }
    
    const response = await fetch('/api/goals/' + goal._id, {
      method:'PUT',
      body: JSON.stringify({goals, timeFrame}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`, 
      }
    })
    const json = await response.json();
    
    if (response.ok) {
      setGoals('');
      setTimeFrame('');
      dispatch({type: 'UPDATE_GOAL', payload: json})
    }
  }

  return (
    <Form className="update" onSubmit={handleEdit}>
      <h3>Edit Goal</h3>

      <label>Goal:</label>
      <input 
        type="text"
        value={goals}
        onChange={(e) => setGoals(e.target.value)}
      />
      <label>Time Frame:</label>
      <input 
        type="text"
        value={timeFrame}
        onChange={(e) => setTimeFrame(e.target.value)}
      />
<div className="material-symbols-outlined test1" onClick={handleEdit}>edit</div>
      {error && <div className="error">{error}</div>}
    </Form>
   )

}
export default GoalUpdate;
