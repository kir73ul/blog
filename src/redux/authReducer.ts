import { loginAPI } from "../API/API";
import { AppDispatch, AppStateType } from "./rootReducer";
import { ThunkAction } from 'redux-thunk';

const AUTH_USER = 'AUTH_USER';
const SET_AUTH_EMAIL = 'SET_AUTH_EMAIL';
const SET_AUTH_PASSWORD = 'SET_AUTH_PASSWORD';
const GET_ERROR = 'GET_ERROR';
const SET_AUTH_USERNAME = 'SET_AUTH_USERNAME';
const GET_TOKEN = 'GET_TOKEN';
const SET_IS_FETCHING = 'SET_FETCHING';

interface authReducerType {
    isFetching: boolean;
    isAuth: boolean;
    email: string;
    password: string;
    username: string;
    error: string;
    token: string;
}

const initialState = {
    isFetching: false,
    isAuth: false,
    email: '',
    password: '',
    username: '',
    error: '',
    token: ''
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
        case GET_TOKEN:
            return {
                ...state,
                token: action.token
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }

        default: return state
    }
}
type AuthActionType = setUserAuthType | setAuthEmailType | setAuthPasswordType | getErrorType | setAuthUsernameType | getTokenType | setIsFetchingType
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
interface getTokenType { type: typeof GET_TOKEN, token: string };
export const getToken = (token: string): getTokenType => ({ type: GET_TOKEN, token });
interface setIsFetchingType { type: typeof SET_IS_FETCHING, isFetching: boolean };
const setFetching = (isFetching: boolean): setIsFetchingType => ({ type: SET_IS_FETCHING, isFetching });


export const getMeAuth = (loginData: string): ThunkAction<void, AppStateType, unknown, AuthActionType> => async (dispatch: AppDispatch, getState) => {
    dispatch(setFetching(true))
    const response = await loginAPI.aythtorizeMe(loginData)
    if (response.data.user) {
        dispatch(setFetching(false))
        dispatch(setUserAuth())
        dispatch(getToken(response.token))
    } else if (response.data.error) {
        dispatch(setFetching(false))
        dispatch(getError(response.data.error))
    }
}

export const getRegistration = (redisterData: string): ThunkAction<void, AppStateType, unknown, AuthActionType> => async (dispatch: AppDispatch, getState) => {
    dispatch(setFetching(true))
    const response = await loginAPI.registrateMe(redisterData)
    if (response.data.user) {
        dispatch(setFetching(false))
        dispatch(setUserAuth())
        dispatch(getToken(response.token))
    } else if (response.data.error) {
        dispatch(setFetching(false))
        dispatch(getError(response.data.error))
    }
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
