import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './login.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { StoreState } from '../store/reducers/auth';
import { authLogin } from '../store/actions/auth';
import { Dispatch } from 'redux';
import { CircularProgress } from '@material-ui/core';

type LoginProps = {
    isAuthenticated: boolean,
    history: any,
    error: any,
    loading: boolean,
    login: any,
};

function Login({ isAuthenticated, history, error, loading, login } : LoginProps) {
    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.currentTarget;

        login(target.username.value, target.password.value)
    }

    useEffect(() => {
        if (isAuthenticated) {
            history.push("/");
        }
    }, [isAuthenticated]);

    return (
        <div>
            <Router>
                <img
                    className="main-logo"
                    src="visutrader-logo.png"
                    alt="VisuTrader Logo"
                />
                { error }
                { loading && <CircularProgress /> }
                <form className="form-row" autoComplete="off" onSubmit={handleSubmit}>
                    <TextField name="username" className="username" label="Username" variant="outlined" />
                    <TextField name="password" className="password" type="password" label="Password" variant="outlined" />
                    <Button variant="contained" color="primary" type="submit">Log In</Button>
                </form>
            </Router>
        </div>
    );
}

const mapStateToProps = (state : StoreState) => {
    return {
        isAuthenticated: state.token !== null,
        error: state.error,
        loading: state.loading,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        // @ts-ignore type exists
        login: (username : string, password : string) => dispatch(authLogin(username, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)