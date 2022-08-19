import { useAffirmationsContext } from '../Hooks/useAffirmationContext';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { AuthContext } from '../Context/AuthContext';
import AffirmationPage from './AffirmationPage';
import { AffirmationsContext} from '../Context/AffirmationContext';


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


describe('AffirmationForm', () => {
  it('should be an empty input field', async ()=>{
    await renderAndWait(
    <MemoryRouter initialEntries={['/']} initialIndex={0}>
       <AuthContext.Provider value={{}}>
        <AffirmationsContext.Provider value={{}}>
      <Routes>
        <Route path="/" element={<AffirmationPage />} />
      </Routes>
        </AffirmationsContext.Provider>
        </AuthContext.Provider>
    </MemoryRouter>)
    const affirmationInput = screen.getByPlaceholderText('I am')
    expect(affirmationInput.value).toEqual('');

  })

  it('should add affirmation to affirmation form', async ()=>{
    await renderAndWait(
    <MemoryRouter initialEntries={['/']} initialIndex={0}>
       <AuthContext.Provider value={{}}>
        <AffirmationsContext.Provider value={{}}>
      <Routes>
        <Route path="/" element={<AffirmationPage />} />
      </Routes>
        </AffirmationsContext.Provider>
        </AuthContext.Provider>
    </MemoryRouter>)
    const affirmationInput = screen.getByPlaceholderText('I am');
    fireEvent.change(affirmationInput, { target: { value: 'Strong'}});
    expect(affirmationInput.value).toEqual('Strong');
  })
})