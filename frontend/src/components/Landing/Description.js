import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

const Description = () => (
  <div className="description">
    <div className="description-text">
      <h1>How to use Journal<br>
      </br> <Link id="user-journal" to="/journals">
    <button>Go to Journals</button>
   </Link> </h1>
      <h5><p>
      Create a journal entry with the title, begin to think about something you are grateful for.
       Express that in the gratitude field. Take 60 seconds to visualize yourself feeling grateful 
       and paint a picture in your mind for how you want to see life. 
          </p></h5>
      <h5>
      Whoever loves discipline loves knowledge, but whoever
       hates correction is stupid.
      </h5><br></br>
      <Row sm={10} md={6} className="description-image">
      <img src="../img/desk.jpg" alt="desk" />
      </Row><br></br>

      <h1>How to use Goals<br>
      </br> <Link id="user-goal" to="/goals">
    <button>Go to Goals</button>
   </Link> </h1>
      <h5><p>
      Set your goals in front of you more often. Keep a reminder of 
      what you are headed for and where you would like to be. 
          </p></h5>
      <h5>
      Whoever loves discipline loves knowledge, but whoever
       hates correction is stupid.
      </h5>
      <Col xs={12} sm={10} md={6} className="description-image">
      <img src="../img/desk.jpg" alt="desk" />
      </Col>
    </div>
  </div>
);
export default Description;