import { Routes, Route } from 'react-router-dom';
import { screen, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import App from './App';

describe('App', () => {
  it('should navigate to log in if non-authorized user attempts to go to preferences', async () => {
    localStorage.removeItem('loggedIn');

    await renderAndWait(
      <Routes>
        <Route exact path="/preferences" element={<AuthRoute><div>authenticated</div></AuthRoute>} />
        <Route exact path="/login" element={<Login />} />
      </Routes>,
      '/preferences',
    );

    await waitFor(() => {
      expect(screen.queryByText('authenticated')).not.toBeInTheDocument();
    });
  });
});