import { loginDataType } from './../API/API';
import { loginAPI } from "../API/API";
import { AppDispatch, AppStateType } from "./rootReducer";
import { ThunkAction } from 'redux-thunk';
import Password from 'antd/lib/input/Password';

const AUTH_USER = 'AUTH_USER';
const SET_AUTH_EMAIL = 'SET_AUTH_EMAIL';
const SET_AUTH_PASSWORD = 'SET_AUTH_PASSWORD';
const GET_ERROR = 'GET_ERROR';
const SET_AUTH_USERNAME = 'SET_AUTH_USERNAME';

interface authReducerType {
    isAuth: boolean;
    email: string;
    password: string;
    username: string;
    error: string;
}

const initialState = {
    isAuth: false,
    email: '',
    password: '',
    username: '',
    error: ''
}

export const authReducer = (state: authReducerType = initialState, action: AuthActionType) => {
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state,
                isAuth: true
            }
        case SET_AUTH_EMAIL:
            return {
                ...state,
                email: action.email
            }
        case SET_AUTH_PASSWORD:
            return {
                ...state,
                password: action.password
            }
        case GET_ERROR:
            return {
                ...state,
                error: action.error
            }
        case SET_AUTH_USERNAME:
            return {
                ...state,
                username: action.username
            }

        default: return state
    }
}
type AuthActionType = setUserAuthType | setAuthEmailType | setAuthPasswordType | getErrorType | setAuthUsernameType
interface setUserAuthType { type: typeof AUTH_USER };
export const setUserAuth = (): setUserAuthType => ({ type: AUTH_USER });
interface setAuthEmailType { type: typeof SET_AUTH_EMAIL, email: string };
export const setAuthEmail = (email: string): setAuthEmailType => ({ type: SET_AUTH_EMAIL, email });
interface setAuthPasswordType { type: typeof SET_AUTH_PASSWORD, password: string };
export const setAuthPassword = (password: string): setAuthPasswordType => ({ type: SET_AUTH_PASSWORD, password });
interface setAuthUsernameType { type: typeof SET_AUTH_USERNAME, username: string };
export const setAuthUsername = (username: string): setAuthUsernameType => ({ type: SET_AUTH_USERNAME, username });
interface getErrorType { type: typeof GET_ERROR, error: string };
export const getError = (error: string): getErrorType => ({ type: GET_ERROR, error });


export const getMeAuth = (email: string, password: string): ThunkAction<void, AppStateType, unknown, AuthActionType> => async (dispatch: AppDispatch, getState) => {
    (getUserData())
    setAuthEmail(email)
    setAuthPassword(password)
    const response = await loginAPI.aythtorizeMe(email, password)
    if (false) {
        debugger
        dispatch(setUserAuth())
    } /* else {
        getError()
    } */

}

export const getRegistration = (username: string, email: string, password: string): ThunkAction<void, AppStateType, unknown, AuthActionType> => async (dispatch: AppDispatch, getState) => {
    setAuthUsername(username)
    setAuthEmail(email)
    setAuthPassword(password)
    const response = await loginAPI.registrateMe(username, email, password);
    if (response) {
        debugger
        dispatch(setUserAuth())
    } /* else {
        getError()
    } */

}
export const getUserData = (): ThunkAction<void, AppStateType, unknown, AuthActionType> => async (dispatch: AppDispatch, getState) => {
    debugger

    const response = await loginAPI.getUserIformation();
    if (response) {
        /*         debugger
                setAuthUsername(username)
                setAuthEmail(email)
                setAuthPassword(password) */
        dispatch(setUserAuth())
    } /* else {
        getError()
    } */

}
