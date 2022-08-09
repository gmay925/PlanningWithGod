import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from '../src/components/Context/AuthContext';
import { WorkoutsContextProvider } from '../src/components/Context/WorkoutContext';
import { JournalsContextProvider } from './components/Context/JournalContext';
import { GoalsContextProvider } from './components/Context/GoalContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
      <GoalsContextProvider>
      <WorkoutsContextProvider>
        <JournalsContextProvider>
        <App />
        </JournalsContextProvider>
      </WorkoutsContextProvider>
      </GoalsContextProvider>
    </AuthContextProvider>
);