import { useGoalsContext } from '../Context/GoalContext';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { AuthContext } from '../Context/AuthContext';
import GoalPage from '../GoalDetails/GoalPage';
import { GoalsContext } from '../Context/GoalContext';


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


describe('GoalForm', () => {
  it('should be an empty form', async ()=>{
    await renderAndWait(
    <MemoryRouter initialEntries={['/']} initialIndex={0}>
       <AuthContext.Provider value={{}}>
        <GoalsContext.Provider value={{}}>
      <Routes>
        <Route path="/" element={<GoalPage />} />
      </Routes>
        </GoalsContext.Provider>
        </AuthContext.Provider>
    </MemoryRouter>)
    const goalInput = screen.getByPlaceholderText('Add a goal')
    expect(goalInput.value).toEqual('');

  })

  it('should add goal to form ', async ()=>{
    await renderAndWait(
    <MemoryRouter initialEntries={['/']} initialIndex={0}>
       <AuthContext.Provider value={{}}>
        <GoalsContext.Provider value={{}}>
      <Routes>
        <Route path="/" element={<GoalPage />} />
      </Routes>
        </GoalsContext.Provider>
        </AuthContext.Provider>
    </MemoryRouter>)
    const goalInput = screen.getByPlaceholderText('Add a goal');
    fireEvent.change(goalInput, { target: { value: 'Grow'}});

    const timeInput = screen.getByPlaceholderText('What time frame?');
    fireEvent.change(timeInput, { target: { value: '12 days'}});
    
  })
})