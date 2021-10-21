import { saveToken, usersAPI, loginAPI, cookies, removeToken } from './../API/API';
import { AppDispatch, AppStateType } from "./rootReducer";
import { ThunkAction } from 'redux-thunk';
import { debounce } from 'lodash';

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
    isFetching: boolean;
    isAuth: boolean;
    isSuccess: boolean;
    users: usersType;
    allErrors: allErrorsType | null;

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
type AuthActionType = setUserAuthType | getErrorType | setIsFetchingType | setUsersDataType | cleanErrorType | logOutType | setSuccsesType
interface setUserAuthType { type: typeof AUTH_USER };
export const setUserAuth = (): setUserAuthType => ({ type: AUTH_USER });
interface setUsersDataType { type: typeof GET_USERS_DATA, usersData: usersType };
export const setUsersData = (usersData: usersType): setUsersDataType => ({ type: GET_USERS_DATA, usersData });
interface setIsFetchingType { type: typeof SET_IS_FETCHING, isFetching: boolean };
const setFetching = (isFetching: boolean): setIsFetchingType => ({ type: SET_IS_FETCHING, isFetching });
interface cleanErrorType { type: typeof CLEAN_ERROR };
export const cleanError = (): cleanErrorType => ({ type: CLEAN_ERROR });
interface getErrorType { type: typeof GET_ERROR, error: errorsType, whichError: string };
export const getError = (error: errorsType, whichError: string): getErrorType => ({ type: GET_ERROR, error, whichError });
interface logOutType { type: typeof LOG_OUT };
const logOut = (): logOutType => ({ type: LOG_OUT });
interface setSuccsesType { type: typeof SET_SUCCESS, isSuccess: boolean };
const setSuccses = (isSuccess: boolean): setSuccsesType => ({ type: SET_SUCCESS, isSuccess });

export const getUserInfo = (): ThunkAction<void, AppStateType, unknown, AuthActionType> => async (dispatch: AppDispatch, getState) => {
    try {
        const response = await usersAPI.getUsersInformation()
        if (response.status === 200) {
            dispatch(setUserAuth())
            dispatch(setUsersData(response.data.user))
        } else if (response.status !== 200) {
            console.log(response.data.errors)
        }
    } catch (err) {
        console.log(err);

    }

}

export const getMeAuth = (loginData: string): ThunkAction<void, AppStateType, unknown, AuthActionType> => async (dispatch: AppDispatch, getState) => {
    dispatch(cleanError())
    dispatch(setFetching(true))
    const response = await loginAPI.aythtorizeMe(loginData)
    if (response.data.user) {
        saveToken(response.data.user.token)
        dispatch(setFetching(false))
        dispatch(setUserAuth())
        dispatch(setUsersData(response.data.user))
    } else if (response.data.errors) {
        dispatch(setFetching(false))
        dispatch(getError(response.data.errors, 'signIn'))
    }
}

export const getRegistration = (redisterData: string): ThunkAction<void, AppStateType, unknown, AuthActionType> => async (dispatch: AppDispatch, getState) => {
    dispatch(cleanError())
    dispatch(setFetching(true))
    const response = await loginAPI.registrateMe(redisterData)
    if (response.status === 200) {
        saveToken(response.data.user.token)
        dispatch(setFetching(false))
        dispatch(setUserAuth())
        dispatch(setUsersData(response.data.user))
    } else if (response.status !== 200) {
        dispatch(setFetching(false))
        dispatch(getError(response.data.errors, 'signUp'))
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
            saveToken(response.data.user.token)
            dispatch(setUsersData(response.data.user))
            dispatch(setSuccses(true))
            setTimeout(() => {
                dispatch(setSuccses(false))
            }, 4000)
        } else if (response.status !== 200) {
            response.data.errors ? dispatch(getError(response.data.errors, 'updateError'))
                :
                dispatch(getError({ [response.status]: response.data }, 'updateError'))
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