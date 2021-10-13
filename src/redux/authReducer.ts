import { saveToken, saveUserData } from './../API/API';
import { loginAPI } from "../API/API";
import { AppDispatch, AppStateType } from "./rootReducer";
import { ThunkAction } from 'redux-thunk';

const AUTH_USER = 'AUTH_USER';
const GET_ERROR = 'GET_ERROR';
const GET_USERS_DATA = 'GET_USERS_DATA';
const SET_IS_FETCHING = 'SET_FETCHING';
const CLEAN_ERROR = 'CLEAN_ERROR';
const LOG_OUT = 'LOG_OUT';
const SET_SUCCESS = 'SET_SUCCESS';

export interface errorsType {
    [key: string]: string[];
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
    isFetching: boolean;
    isAuth: boolean;
    isSuccess: boolean;
    users: usersType;
    error: errorsType | null;
}

const initialState = {
    isFetching: false,
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
    error: null
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
                error: action.error
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case GET_USERS_DATA:
            return {
                ...state,
                users: { ...state.users, ...action.usersData }
            }
        case CLEAN_ERROR:
            return {
                ...state,
                error: null
            }
        case LOG_OUT:
            return {
                ...state,
                isAuth: false
            }
        case SET_SUCCESS:
            return {
                ...state,
                isSuccess: action.isSuccess
            }
        default: return state
    }
}
type AuthActionType = setUserAuthType | getErrorType | setIsFetchingType | setUsersDataType | cleanErrorType | logOutType | setSuccsesType
interface setUserAuthType { type: typeof AUTH_USER };
export const setUserAuth = (): setUserAuthType => ({ type: AUTH_USER });
interface setUsersDataType { type: typeof GET_USERS_DATA, usersData: usersType };
export const setUsersData = (usersData: usersType): setUsersDataType => ({ type: GET_USERS_DATA, usersData });
interface setIsFetchingType { type: typeof SET_IS_FETCHING, isFetching: boolean };
const setFetching = (isFetching: boolean): setIsFetchingType => ({ type: SET_IS_FETCHING, isFetching });
interface cleanErrorType { type: typeof CLEAN_ERROR };
export const cleanError = (): cleanErrorType => ({ type: CLEAN_ERROR });
interface getErrorType { type: typeof GET_ERROR, error: errorsType };
export const getError = (error: errorsType): getErrorType => ({ type: GET_ERROR, error });
interface logOutType { type: typeof LOG_OUT };
const logOut = (): logOutType => ({ type: LOG_OUT });
interface setSuccsesType { type: typeof SET_SUCCESS, isSuccess: boolean };
const setSuccses = (isSuccess: boolean): setSuccsesType => ({ type: SET_SUCCESS, isSuccess });



export const getMeAuth = (loginData: string): ThunkAction<void, AppStateType, unknown, AuthActionType> => async (dispatch: AppDispatch, getState) => {
    dispatch(cleanError())
    dispatch(setFetching(true))
    const response = await loginAPI.aythtorizeMe(loginData)
    if (response.data.user) {
        debugger
        saveToken(response.data.user.token)
        saveUserData(response.data.user)
        dispatch(setFetching(false))
        dispatch(setUserAuth())
        dispatch(setUsersData(response.data.user))
    } else if (response.data.errors) {
        dispatch(setFetching(false))
        dispatch(getError(response.data.errors))
    }
}

export const getRegistration = (redisterData: string): ThunkAction<void, AppStateType, unknown, AuthActionType> => async (dispatch: AppDispatch, getState) => {
    dispatch(cleanError())
    dispatch(setFetching(true))
    const response = await loginAPI.registrateMe(redisterData)
    if (response.data.user) {
        saveToken(response.data.user.token)
        dispatch(setFetching(false))
        dispatch(setUserAuth())
        dispatch(setUsersData(response.data.user))
    } else if (response.data.errors) {
        dispatch(setFetching(false))
        dispatch(getError(response.data.errors))
    }
}
export const updateUserInfo = (updateData: userDataType): ThunkAction<void, AppStateType, unknown, AuthActionType> => async (dispatch: AppDispatch, getState) => {
    const updateDataJSON = JSON.stringify(updateData)
    dispatch(cleanError())
    dispatch(setFetching(true))
    const response = await loginAPI.updateUserData(updateDataJSON);
    debugger
    dispatch(setFetching(false))
    if (response.status === 200) {
        dispatch(setUsersData(response.data.user))
        dispatch(setSuccses(true))
        setTimeout(() => {
            dispatch(setSuccses(false))
        }, 4000)
    } else if (response.status !== 200) {
        dispatch(getError(response.data))
    }

}
export const logout = (): ThunkAction<void, AppStateType, unknown, AuthActionType> => async (dispatch: AppDispatch, getState) => {
    localStorage.clear()
    dispatch(logOut())
}