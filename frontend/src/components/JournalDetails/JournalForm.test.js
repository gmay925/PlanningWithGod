import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen, act, fireEvent } from '@testing-library/react';
import {AuthContext } from '../Context/AuthContext';
import JournalHome from '../WorkoutPage/JournalHome';
import { JournalsContext } from '../Context/JournalContext';

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


describe('Journal Form', () => {
  it('should be an empty form', async ()=>{
    await renderAndWait(
    <MemoryRouter initialEntries={['/']} initialIndex={0}>
       <AuthContext.Provider value={{}}>
        <JournalsContext.Provider value={{}}>
      <Routes>
        <Route path="/" element={<JournalHome />} />
      </Routes>
        </JournalsContext.Provider>
        </AuthContext.Provider>
    </MemoryRouter>)
    const journalTitleInput = screen.getByPlaceholderText('Journal Title');
    expect(journalTitleInput.value).toEqual('');

  });

  it('should add journal to journal page ', async ()=>{
    await renderAndWait(
    <MemoryRouter initialEntries={['/']} initialIndex={0}>
       <AuthContext.Provider value={{}}>
        <JournalsContext.Provider value={{}}>
      <Routes>
        <Route path="/" element={<JournalHome />} />
      </Routes>
        </JournalsContext.Provider>
        </AuthContext.Provider>
    </MemoryRouter>)
    const journalTitleInput = screen.getByPlaceholderText('Journal Title');
    fireEvent.change(journalTitleInput, { target: { value: 'Title'}});
    expect(journalTitleInput.value).toEqual('Title');
  });

  it('should submit journal entry', async ()=> {
    await renderAndWait(
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
         <AuthContext.Provider value={{}}>
          <JournalsContext.Provider value={{}}>
        <Routes>
          <Route path="/" element={<JournalHome />} />
        </Routes>
          </JournalsContext.Provider>
          </AuthContext.Provider>
      </MemoryRouter>)
      const submitButton = screen.getByRole('button', { name: 'Add Journal' });
      fireEvent.click(submitButton);
  })
});