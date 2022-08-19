import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Navbar from '../NavBar/NavBar';
import Description from './Description';

const Landing = () => (
  <div className="landing-page">
    <h1>"Write the vision and make it plain upon tablets, that he may run that readeth it."</h1>
   <Link id="user-journal" to="/journals">
    <button>Go to Journals</button>
   </Link>
   <Link id="user-workout" to="/workouts">
    <button>Go to Workouts</button>
   </Link>
   <Link id="user-goals" to="/goals">
    <button>Go to Goals</button>
   </Link>
   <Link id="user-affirmations" to="/affirmations">
    <button>Go to Affirmations</button>
   </Link>
   <Description />
  </div>
);

export default Landing;