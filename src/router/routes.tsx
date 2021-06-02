import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import Home from '../pages/home';
import Login from '../pages/login';
import SignUp from '../pages/signup';

const BaseRouter = () => (
    <div>
        <Router>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/" component={Home} />
        </Router>
    </div>
);

export default BaseRouter;