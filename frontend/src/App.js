import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './components/Hooks/useAuthContext';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Navbar from './components/NavBar/NavBar';
import WorkoutForm from './components/WorkoutDetails/WorkoutForm';
// import JournalForm from './components/JournalDetails/JournalForm';

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />
            <Route exact path="/workouts" element={user ? <WorkoutForm /> : <Navigate to="/" />} />
          {/* <Route exact path="/journals" element={user ? <JournalForm /> : <Navigate to="/journals" />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;