import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { useAuthContext } from './components/Hooks/useAuthContext';
import WorkoutPage from './components/WorkoutDetails/WorkoutPage';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Landing from './components/Landing/Landing';
import Navbar from './components/NavBar/NavBar';
import JournalHome from './components/JournalDetails/JournalHome';
import GoalPage from './components/GoalDetails/GoalPage';
import AffirmationPage from './components/AffirmationDetails/AffirmationPage'

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route exact path="/" element={user ? <Landing /> : <Navigate to="/login" />} />
            <Route path="/journals" element={user ? <JournalHome /> : <Navigate to="/journals" />} />
            <Route exact path="/goals" element={user ? <GoalPage /> : <Navigate to="/goals" />} />
            <Route path="/affirmations" element={user ? <AffirmationPage /> : <Navigate to="/affirmations" />} />
            <Route path="/workouts" element={user ? <WorkoutPage /> : <Navigate to="/workouts" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
            <Route path="*" element={<Navigate replace to='/'/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
