import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useAuthContext } from '../Hooks/useAuthContext';
import { useGoalsContext } from '../Hooks/useGoalContext';
import React, {useEffect, useState} from 'react';
import GoalUpdate from './GoalUpdate';

const GoalDetails = ({ goal }) => {
  const { dispatch } = useGoalsContext();
  const { user } = useAuthContext();
  const [click, setClick] = useState(false)

  useEffect(() => {
    setClick(false)
  }, [goal])

  const handleDelete = async () => {
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
      <p><strong>Time Frame: </strong>{goal.timeFrame}</p>
      <p>{formatDistanceToNow(new Date(goal.createdAt), { addSuffix: true })}</p>
      {click && <GoalUpdate goal={goal} />}
      <span className='goal-update'>
        <div className="material-symbols-outlined test" onClick={()=> setClick(true)}>edit</div></span>
        <span className='goal-delete'>
        <div className="material-symbols-outlined test1" onClick={handleDelete}>delete</div>
      </span>
  </div>
  );
};




export default GoalDetails;
