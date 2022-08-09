import { useState } from 'react'
import { useGoalsContext } from "../Hooks/useGoalContext";
import { useAuthContext } from '../Hooks/useAuthContext';
import Form from "react-bootstrap/Form";

const GoalForm = () => {
  const { dispatch } = useGoalsContext()
  const { user } = useAuthContext()

  const [goals, setGoals] = useState('')
  const [time, setTime] = useState('');
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const goal = {goals, time}

    const response = await fetch('/api/goals', {
      method: 'POST',
      body: JSON.stringify(goal),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setGoals('')
      setTime('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_GOAL', payload: json})
    }
  }

  return (
    <Form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Goal</h3>

      <label>Goal:</label>
      <input 
        type="text"
        onChange={(e) => setGoals(e.target.value)}
        value={goals}
        className={emptyFields.includes('goal') ? 'error' : ''}
      />
      <button>Add Goal</button>
      {error && <div className="error">{error}</div>}
    </Form>
  )
}

export default GoalForm;