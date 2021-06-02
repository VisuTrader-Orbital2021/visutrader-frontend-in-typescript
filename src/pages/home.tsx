import {
    BrowserRouter as Router
} from 'react-router-dom';
import './home.css';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { StoreState } from '../store/reducers/auth';
import { authLogout } from '../store/actions/auth';
import { Dispatch } from 'redux';

type HomeProps = {
  isAuthenticated: boolean,
  logoutHandler: any,
};

function Home({ isAuthenticated, logoutHandler } : HomeProps) {
  return (
    <Router>
      <div>
        <img
            className="main-logo"
            src="visutrader-logo.png"
            alt="VisuTrader Logo"
        />
        <div className="button-row">
            {
              isAuthenticated ?
                (
                  <div>
                    <p> Logged in </p>
                    <p className="padding"></p>
                    <Button className="signout" variant="contained" color="default" size="large" onClick={event => logoutHandler()}>Sign Out</Button>
                  </div>
                ) : (
                  <div>
                    <Button className="login" variant="contained" color="default" size="large" onClick={event => window.location.href="/login"}>Log In</Button>
                    <p className="padding"></p>
                    <Button className="signup" variant="contained" color="default" size="large" onClick={event => window.location.href="/signup"}>Sign Up</Button>
                  </div>
                )
            }
          </div>
      </div>
    </Router>
  );
}

const mapStateToProps = (state : StoreState) => {
  return {
    isAuthenticated: state.token !== null,
  }
}

const mapDispatchToProps = (dispatch : Dispatch) => {
  return {
    logoutHandler: () => dispatch(authLogout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);