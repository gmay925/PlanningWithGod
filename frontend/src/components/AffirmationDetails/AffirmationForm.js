import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import { useAffirmationsContext } from '../Hooks/useAffirmationContext';
import { useAuthContext } from '../Hooks/useAuthContext';

const AffirmationForm = () => {
  const { dispatch } = useAffirmationsContext();
  const { user } = useAuthContext();

  const [affirmations, setAffirmations] = useState('');
  const [believe, setBelieve] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [hasTypedAffirmations, setHasTypedAffirmations] = useState(false);
  const [hasTypedBelieve, setHasTypedBelieve] = useState(false);

  const isValidAffirmations = Boolean(affirmations);
  const isValidBelieve = Boolean(believe);
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const affirmation = { affirmations, believe }; 

    const response = await fetch('/api/affirmations', {
      method: 'POST',
      body: JSON.stringify(affirmation),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json();

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields || [])
    }
    if (response.ok) {
      setAffirmations('');
      setBelieve('');
      setError(null);
      setEmptyFields([]);
      dispatch({ type: 'CREATE_AFFIRMATION', payload: json })
    }
  };

  return (
    <Form className="create" onSubmit={handleSubmit}>
      <Form.Label>Affirm:</Form.Label>
      <Form.Control 
        required
        isInvalid={hasTypedAffirmations && !isValidAffirmations}
        className={emptyFields.includes('affirmations') ? 'error' : ''}
        placeholder="I am"
        onChange={(e) => { setAffirmations(e.target.value)
        setHasTypedBelieve(true)
      }}
      />
      <Form.Label>Do you believe?</Form.Label>
      <Form.Control
      required
      isInvalid={hasTypedBelieve && !isValidBelieve}
      className={emptyFields.includes('believe') ? 'error' : ''}
      placeholder="I am"
      onChange={(e) => { setBelieve(e.target.value)
      setHasTypedBelieve(true)
    }}
      />
      <button>Add Affirmation</button>
      {error && <div className="error">{error}</div>}
    </Form>
  );
}

export default AffirmationForm;