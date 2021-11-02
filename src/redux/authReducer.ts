import { saveToken, usersAPI, loginAPI, removeToken } from '../API/API';
import { AppDispatch, AppStateType } from "./rootReducer";
import { ThunkAction } from 'redux-thunk';
import { setFetching } from './commonReducer';

const AUTH_USER = 'AUTH_USER';
const GET_ERROR = 'GET_ERROR';
const GET_USERS_DATA = 'GET_USERS_DATA';
const CLEAN_ERROR = 'CLEAN_ERROR';
const LOG_OUT = 'LOG_OUT';
const SET_SUCCESS = 'SET_SUCCESS';

export interface errorsType {
    [key: string]: string[];
}
interface allErrorsType {
    [key: string]: errorsType | string
}
interface usersType {
    bio: string;
    createdAt: string;
    email: string;
    id: number | null;
    image: string;
    token: string | null;
    updatedAt: string;
    username: string;
}
export interface userDataType {
    user: userUpdateType
}
export interface userUpdateType {
    email: string;
    image: string;
    username: string;
    password: string;
}
interface authReducerType {
    isAuth: boolean;
    isSuccess: boolean;
    users: usersType;
    allErrors: allErrorsType | null;

}

const initialState = {
    isAuth: false,
    isSuccess: false,
    users: {
        bio: '',
        createdAt: '',
        email: '',
        id: null,
        image: '',
        token: null,
        updatedAt: '',
        username: ''
    },
    allErrors: null
}

export const authReducer = (state: authReducerType = initialState, action: AuthActionType) => {
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state,
                isAuth: true
            }
        case GET_ERROR:
            return {
                ...state,
                allErrors: { [action.whichError]: action.error }
            }
        case GET_USERS_DATA:
            return {
                ...state,
                users: { ...state.users, ...action.usersData }
            }
        case CLEAN_ERROR:
            return {
                ...state,
                allErrors: null
            }
        case LOG_OUT:
            return {
                ...state, ...initialState
            }
        case SET_SUCCESS:
            return {
                ...state,
                isSuccess: action.isSuccess
            }
        default: return state
    }
}
type AuthActionType = setUserAuthType | getErrorType | setUsersDataType | cleanErrorType | logOutType | setSuccsesType
interface setUserAuthType { type: typeof AUTH_USER };
export const setUserAuth = (): setUserAuthType => ({ type: AUTH_USER });
interface setUsersDataType { type: typeof GET_USERS_DATA, usersData: usersType };
export const setUsersData = (usersData: usersType): setUsersDataType => ({ type: GET_USERS_DATA, usersData });
interface cleanErrorType { type: typeof CLEAN_ERROR };
export const cleanError = (): cleanErrorType => ({ type: CLEAN_ERROR });
interface getErrorType { type: typeof GET_ERROR, error: errorsType, whichError: string };
export const getError = (error: errorsType, whichError: string): getErrorType => ({ type: GET_ERROR, error, whichError });
interface logOutType { type: typeof LOG_OUT };
const logOut = (): logOutType => ({ type: LOG_OUT });
interface setSuccsesType { type: typeof SET_SUCCESS, isSuccess: boolean };
const setSuccses = (isSuccess: boolean): setSuccsesType => ({ type: SET_SUCCESS, isSuccess });

export const getUserInfo = (): ThunkAction<void, AppStateType, unknown, AuthActionType> => async (dispatch: AppDispatch, getState) => {
    const response = await usersAPI.getUsersInformation()
    if (response.status === 200) {
        dispatch(setUserAuth())
        dispatch(setUsersData(response.data.user))
    } else if (response.status !== 200) {
        throw new Error(response.data.errors)
    }
}

export const getMeAuth = (loginData: string): ThunkAction<void, AppStateType, unknown, AuthActionType> => async (dispatch: AppDispatch, getState) => {
    dispatch(cleanError())
    dispatch(setFetching(true))
    const response = await loginAPI.aythtorizeMe(loginData)
    dispatch(setFetching(false))
    if (response.data.user) {
        dispatch(setUsersData(response.data.user))
        saveToken(getState().auth.users.token)
        dispatch(setUserAuth())
    } else if (response.data.errors) {
        dispatch(setFetching(false))
        dispatch(getError(response.data.errors, 'signIn'))
        setTimeout(() => {
            dispatch(cleanError())
        }, 5000)
    }
}
export const getRegistration = (redisterData: string): ThunkAction<void, AppStateType, unknown, AuthActionType> => async (dispatch: AppDispatch, getState) => {
    dispatch(cleanError())
    dispatch(setFetching(true))
    const response = await loginAPI.registrateMe(redisterData)
    dispatch(setFetching(false))
    if (response.status === 200) {
        dispatch(setUsersData(response.data.user))
        dispatch(setSuccses(true))
        saveToken(getState().auth.users.token)
        dispatch(setUserAuth())
        setTimeout(() => {
            dispatch(setSuccses(false))
        }, 4000)
    } else if (response.status !== 200) {
        dispatch(setFetching(false))
        dispatch(getError(response.data.errors, 'signUp'))
        setTimeout(() => {
            dispatch(cleanError())
        }, 5000)
    }
}
export const updateUserInfo = (updateData: userDataType): ThunkAction<void, AppStateType, unknown, AuthActionType> => async (dispatch: AppDispatch, getState) => {
    try {
        const updateDataJSON = JSON.stringify(updateData)
        dispatch(cleanError())
        dispatch(setFetching(true))
        const response = await loginAPI.updateUserData(updateDataJSON);
        dispatch(setFetching(false))
        if (response.status === 200) {
            getUserInfo()
            dispatch(setUsersData(response.data.user))
            dispatch(setSuccses(true))
            saveToken(getState().auth.users.token)
            setTimeout(() => {
                dispatch(setSuccses(false))
            }, 4000)
        } else if (response.status !== 200) {
            response.data.errors ? dispatch(getError(response.data.errors, 'updateError'))
                :
                dispatch(getError({ [response.status]: response.data }, 'updateError'))
            setTimeout(() => {
                dispatch(cleanError())
            }, 5000)
        }
    }
    catch (err: any) {
        console.log(err);
        dispatch(getError({ [err.name]: err.message }, 'updateError'))
    }

}
export const logout = (): ThunkAction<void, AppStateType, unknown, AuthActionType> => async (dispatch: AppDispatch, getState) => {
    removeToken()
    dispatch(logOut())
}