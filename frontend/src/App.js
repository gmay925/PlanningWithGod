import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './components/Hooks/useAuthContext';
import WorkoutPage from './components/WorkoutPage/WorkoutPage';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Landing from './components/Landing/Landing';
import Navbar from './components/NavBar/NavBar';
import JournalForm from './components/JournalDetails/JournalForm';
import GoalForm from './components/GoalDetails/GoalForm';

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route exact path="/" element={user ? <Landing /> : <Navigate to="/login" /> } />
            <Route exact path="/journals" element={user ? <JournalForm /> : <Navigate to="/login" />} />
            <Route exact path="/goals" element={user ? <GoalForm /> : <Navigate to="/login" />} />
            <Route path="/workouts" element={user ? <WorkoutPage /> : <Navigate to="/login" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;