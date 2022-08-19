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
  const [hasTypedTitle, setHasTypedTitle] = useState(false);
  const [hasTypedMinutes, setHasTypedMinutes] = useState(false);
  const [hasTypedReps, setHasTypedReps] = useState(false);

  const isValidTitle = Boolean(title);
  const isValidMinutes = Boolean(minutes);
  const isValidReps = Boolean(reps);
  const allValid = isValidTitle && isValidMinutes
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

      <Form.Label>Exercise Title:</Form.Label>
      <Form.Control
        required
        isInvalid={hasTypedTitle && !isValidTitle}
        placeholder="Exercise Title"
        className={emptyFields.includes('title') ? 'error' : ''}
        onChange={(e) => { setTitle(e.target.value)
        setHasTypedTitle(true)
      }}
      />

      <Form.Label>Minutes:</Form.Label>
      <Form.Control
      required
      isInvalid={hasTypedMinutes && !isValidMinutes}
      type="number"
      placeholder="How long?"
      className={emptyFields.includes('minutes') ? 'error' : ''}
      onChange={(e) => { setMinutes(e.target.value)
      setHasTypedMinutes(true)
    }}
      />

      <Form.Label>Reps:</Form.Label>
      <Form.Control
      required
      isInvalid={hasTypedReps && !isValidReps}
      type="number"
      placeholder="How many?"
      className={emptyFields.includes('minutes') ? 'error' : ''}
      onChange={(e) => { setReps(e.target.value)
      setHasTypedReps(true)
    }}
     />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </Form>
  );
}

export default WorkoutForm;
