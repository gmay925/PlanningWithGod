import { useWorkoutsContext } from '../Hooks/useWorkoutsContext';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { AuthContext } from '../Context/AuthContext';
import WorkoutPage from './WorkoutPage';
import WorkoutForm from './WorkoutForm';
import { WorkoutsContext} from '../Context/WorkoutContext';


async function wait() {
  await act(() => new Promise((resolve) => { setTimeout(resolve);}));
}

async function renderAndWait(jsx) {
  render(jsx);
  await wait();
}

// runs before any tests start running
beforeAll(() => {
  jest.spyOn(global, "fetch").mockImplementation((url, config)=> {
    console.log(url, config)
  });
});

// runs after all tests have finished
afterAll(() => {
  global.fetch.mockClear();
});


describe('WorkoutForm', () => {
  it('should be an empty form', async ()=>{
    await renderAndWait(
    <MemoryRouter initialEntries={['/']} initialIndex={0}>
       <AuthContext.Provider value={{}}>
        <WorkoutsContext.Provider value={{}}>
      <Routes>
        <Route path="/" element={<WorkoutPage />} />
      </Routes>
        </WorkoutsContext.Provider>
        </AuthContext.Provider>
    </MemoryRouter>)
    const exerciseTitleInput = screen.getByPlaceholderText('Exercise Title')
    expect(exerciseTitleInput.value).toEqual('');

  })

  it('should add workout to workout page ', async ()=>{
    await renderAndWait(
    <MemoryRouter initialEntries={['/']} initialIndex={0}>
       <AuthContext.Provider value={{}}>
        <WorkoutsContext.Provider value={{}}>
      <Routes>
        <Route path="/" element={<WorkoutPage />} />
      </Routes>
        </WorkoutsContext.Provider>
        </AuthContext.Provider>
    </MemoryRouter>)
    const exerciseTitleInput = screen.getByPlaceholderText('Exercise Title');
    fireEvent.change(exerciseTitleInput, { target: { value: 'Weights'}});
    expect(exerciseTitleInput.value).toEqual('Weights');
  })

  it('should provide feedback on valid title', async () => {
    await renderAndWait(
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
      <AuthContext.Provider value={{}}>
       <WorkoutsContext.Provider value={{}}>
     <Routes>
       <Route path="/" element={<WorkoutPage />} />
     </Routes>
       </WorkoutsContext.Provider>
       </AuthContext.Provider>
   </MemoryRouter>
    )
    const input = screen.getByPlaceholderText('Exercise Title');
    fireEvent.change(input, { target: { value: 'Run'}});
    
  })
  it('should provide error on missing inputs', async () => {
    await renderAndWait(
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
      <AuthContext.Provider value={{}}>
       <WorkoutsContext.Provider value={{}}>
     <Routes>
       <Route path="/" element={<WorkoutPage />} />
     </Routes>
       </WorkoutsContext.Provider>
       </AuthContext.Provider>
   </MemoryRouter>
    )
    const minuteInput = screen.findByLabelText('Minutes:')
    fireEvent.change(minutesInput, { target: { value: '3'}});
    
  })
})