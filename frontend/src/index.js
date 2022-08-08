import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from '../src/components/Context/AuthContext';
import { WorkoutsContextProvider } from '../src/components/Context/WorkoutContext';
// import { JournalContextProvider } from '../src/components/Context/JournalContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
      <WorkoutsContextProvider>
        <App />
      </WorkoutsContextProvider>
    </AuthContextProvider>
);