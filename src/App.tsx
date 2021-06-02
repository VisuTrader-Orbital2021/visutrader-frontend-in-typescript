import { withRouter } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import BaseRouter from './router/routes';

function App() {
  return (
    <div className="App">
      <Router>
        <BaseRouter />
      </Router>
    </div>
  );
}

export default withRouter(App);