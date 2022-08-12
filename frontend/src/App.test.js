import { render, screen } from '@testing-library/react';
import App from './App';
import WorkoutPage from './components/WorkoutPage/WorkoutPage';

// test('renders login page', () => {
//   render(<App />);
//   const linkElement = screen.getByText('LoginPage');
//   expect(linkElement).toBeInTheDocument();
// });

describe('App', () => {
  it('should navigate to log in if non-authorized user attempts to go to different page', async () => {
    localStorage.removeItem('loggedIn');

    await renderAndWait(
      <Routes>
        <Route exact path="/workouts" element={<WorkoutPage />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>,
      '/workouts',
    );

    await waitFor(() => {
      expect(screen.queryByText('authenticated')).not.toBeInTheDocument();
    });
  });

  it('should render preferences if authorized user attempts to go to preferences', async () => {
    localStorage.setItem('loggedIn', 'true');
    fetchMock.mockIf('/preferences', () => Promise.resolve(
      JSON.stringify({
        name: 'name',
        email: 'email@email.com',
        phoneNumber: '(222) 222-2222',
      }),
    ));

    await renderAndWait(
      <Routes>
        <Route exact path="/preferences" element={<AuthRoute><div>authenticated</div></AuthRoute>} />
        <Route exact path="/login" element={<Login />} />
      </Routes>,
      '/preferences',
    );

    await waitFor(() => {
      expect(screen.getByText('authenticated')).toBeInTheDocument();
    });
  });

  it('should redirect to landing page if nonexistent path is entered when logged in', async () => {
    localStorage.setItem('loggedIn', 'true');
    fetchMock.mockIf('/preferences', () => Promise.resolve(
      JSON.stringify({
        name: 'name',
        email: 'email@email.com',
        phoneNumber: '(222) 222-2222',
      }),
    ));

    await renderAndWait(<App/>);

    await waitFor(() => {
      expect(screen.getByText("Let's Eat")).toBeInTheDocument();
    });
  });

  it('should redirect to landing not logged in and nonexistent path is entered', async () => {
    localStorage.removeItem('loggedIn');

    await renderAndWait(<App />);

    await waitFor(() => {
      expect(screen.getByText("Let's Eat")).toBeInTheDocument();
    });
  });
});
