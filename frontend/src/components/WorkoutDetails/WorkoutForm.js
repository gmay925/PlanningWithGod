import { React, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useWorkoutsContext } from '../Hooks/useWorkoutsContext';
import { useAuthContext } from '../Hooks/useAuthContext';

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState('');
  const [minutes, setMinutes] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in')
      return
    }

    const workout = { title, minutes, reps };

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle('');
      setMinutes('');
      setReps('');
      setError(null);
      setEmptyFields([]);
      dispatch({ type: 'CREATE_WORKOUT', payload: json });
    }
  };

  return (
    <Form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Exercise Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Exercise Title"
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Minutes:</label>
      <input
        type="number"
        value={minutes}
        placeholder="How long?"
        className={emptyFields.includes('minutes') ? 'error' : ''}
        onChange={(e) => setMinutes(e.target.value)}
      />

      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </Form>
  );
}

export default WorkoutForm;
