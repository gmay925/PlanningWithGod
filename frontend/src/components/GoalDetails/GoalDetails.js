import { useGoalsContext } from "../Hooks/useGoalsContext";
import { useAuthContext } from "../Hooks/useAuthContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';


const GoalDetails = ({ goal }) => {
  const { dispatch } = useGoalsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/goals/' + goal._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_GOAL', payload: json})
    }
  }

  return (
    <div className="goal-details">
      <h4>{goal.goals}</h4>
      <p><strong>Goal </strong>{goal.goals}</p>
      <p>{formatDistanceToNow(new Date(goal.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default GoalDetails