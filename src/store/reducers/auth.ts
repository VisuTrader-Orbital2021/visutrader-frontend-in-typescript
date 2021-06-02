import { AnyAction } from 'redux';
import * as actionTypes from '../actions/actionTypes';

export type StoreState = {
    token: string | null,
    // TODO: Change error type
    error: any,
    loading: boolean
};

const initialState : StoreState = {
    token: null,
    error: null,
    loading: false,
}

export const authStart = (state : StoreState, action : AnyAction) => {
    return {
        ...state,
        error: null,
        loading: true,
    }
}

export const authSuccess = (state : StoreState, action : AnyAction) => {
    return {
        ...state,
        token: action.token,
        error: null,
        loading: false,
    }
}

export const authFail = (state : StoreState, action : AnyAction) => {
    return {
        ...state,
        error: action.error,
        loading: false,
    }
}

export const authLogout = (state : StoreState, action : AnyAction) => {
    return {
        ...state,
        token: null,
        error: null,
        loading: false,
    }
}

const reducer = (state : StoreState = initialState, action : AnyAction) => {
    switch(action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        default:
            return state;
    }
}

export default reducer;