import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
const Landing = () => (
  <div className="landing">
   <h1>When executing a vision that God has placed on your heart, it starts with a dream or idea.
    The dream becomes a plan, the plan is then executed. The goal of this planner is to help navigate 
    through life.
   </h1>
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
  </div>
);

export default Landing;