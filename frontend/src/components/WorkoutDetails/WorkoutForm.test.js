// import WorkoutForm from "./WorkoutForm";
// import WorkoutPage from "../WorkoutPage/WorkoutPage";
// import { useWorkoutsContext } from "../Hooks/useWorkoutsContext";
// import { WorkoutsContextProvider, WorkoutsContext} from "../Context/WorkoutContext";
import { useAuthContext } from '../Hooks/useAuthContext';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen, act } from '@testing-library/react';
import { AuthContext } from '../Context/AuthContext'
import { useContext } from 'react';
import WorkoutPage from '../WorkoutPage/WorkoutPage';

const TestingComponent = () => {
  const { user, dispatch } = useContext(AuthContext);
}

async function wait() {
  await act(() => new Promise((resolve) => { setTimeout(resolve);}));
}

async function renderAndWait(jsx) {
  render(jsx);
  await wait();
}


describe('WorkoutForm', () => {
  it('should be an empty form', async ()=>{
    await renderAndWait(
    <MemoryRouter initialEntries={['/']} initialIndex={0}>
      <Routes>
        <Route path="/" element={<WorkoutPage />} />
      </Routes>
    </MemoryRouter>)
    const exerciseTitleInput = screen.getByPlaceholderText('Exercise Title')
    expect(exerciseTitleInput.value).toBe('');

  })
})

describe('<AuthContextProvider />', () => {
  it('provides expected AuthContext object to child elements', () => {
    render(
      <AuthContext.Provider>
        <WorkoutPage />
      </AuthContext.Provider>
    )
  })
})