import './signup.css';
import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { authSignUp } from '../store/actions/auth';
import { StoreState } from '../store/reducers/auth';
import CircularProgress from '@material-ui/core/CircularProgress';

type SignUpProps = {
    isAuthenticated: boolean,
    history: any,
    error: any,
    loading: boolean,
    signup: any,
};

function SignUp({ isAuthenticated, history, error, loading, signup } : SignUpProps) {
    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.currentTarget;

        signup(target.username.value, target.email.value, target.password.value);
    }

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/');
        }
    }, [isAuthenticated])
    
    return (
        <div>
            <img
                className="main-logo"
                src="visutrader-logo.png"
                alt="VisuTrader Logo"
            />
            { error }
            { loading && <CircularProgress /> }
            {/* <div className="google-signup">
                <img className="google-icon" src="google-icon.jpg" alt="Google Icon"/>
                Sign Up with Google
            </div> */}
            <form className="form-row" noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField name="displayname" className="displayname" label="Display Name" variant="outlined" />
                <TextField name="username" className="username" label="Username" variant="outlined" />
                <TextField name="email" className="email" label="Email" variant="outlined" />
                <TextField name="password" className="password" type="password" label="Password" variant="outlined" />
                <Button variant="contained" color="primary" type="submit">Sign Up</Button>
                <p>By clicking "Sign Up", you agree to our <a href="/termsofservice">terms of service and privacy policy</a>.</p>
            </form>
        </div>
    );
}

const mapStateToProps = (state : StoreState) => {
    return {
        isAuthenticated: state.token !== null,
        error: state.error,
        loading: state.loading,
    }
};

const mapDispatchToProps = (dispatch : Dispatch) => {
    return {
        // @ts-ignore
        signup: (username : string, email : string, password : string) => dispatch(authSignUp(username, email, password))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)