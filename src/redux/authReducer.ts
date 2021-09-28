import { loginAPI } from "../API/API";
import { AppDispatch, AppStateType } from "./rootReducer";
import { ThunkAction } from 'redux-thunk';

const AUTH_USER = 'AUTH_USER';
const GET_ERROR = 'GET_ERROR';
const GET_USERS_DATA = 'GET_USERS_DATA';
const SET_IS_FETCHING = 'SET_FETCHING';
const CLEAN_ERROR = 'CLEAN_ERROR';

interface errorsType {
    [key: string]: string[];
}
interface usersType {
    bio: string;
    createdAt: string;
    email: string;
    id: number | null;
    image: string;
    token: null | string;
    updatedAt: string;
    username: string;
}
interface authReducerType {
    isFetching: boolean;
    isAuth: boolean;
    users: usersType;
    error: errorsType | null;
}

const initialState = {
    isFetching: false,
    isAuth: false,
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
        default: return state
    }
}
type AuthActionType = setUserAuthType | getErrorType | setIsFetchingType | getUsersDataType | cleanErrorType
interface setUserAuthType { type: typeof AUTH_USER };
export const setUserAuth = (): setUserAuthType => ({ type: AUTH_USER });
interface getErrorType { type: typeof GET_ERROR, error: errorsType };
export const getError = (error: errorsType): getErrorType => ({ type: GET_ERROR, error });
interface getUsersDataType { type: typeof GET_USERS_DATA, usersData: usersType };
export const getUsersData = (usersData: usersType): getUsersDataType => ({ type: GET_USERS_DATA, usersData });
interface setIsFetchingType { type: typeof SET_IS_FETCHING, isFetching: boolean };
const setFetching = (isFetching: boolean): setIsFetchingType => ({ type: SET_IS_FETCHING, isFetching });
interface cleanErrorType { type: typeof CLEAN_ERROR };
export const cleanError = (): cleanErrorType => ({ type: CLEAN_ERROR });



export const getMeAuth = (loginData: string): ThunkAction<void, AppStateType, unknown, AuthActionType> => async (dispatch: AppDispatch, getState) => {
    dispatch(cleanError())
    dispatch(setFetching(true))
    const response = await loginAPI.aythtorizeMe(loginData)
    debugger
    if (response.data.user) {
        dispatch(setFetching(false))
        dispatch(setUserAuth())
        dispatch(getUsersData(response.data.user))
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
        dispatch(setFetching(false))
        dispatch(setUserAuth())
        dispatch(getUsersData(response.data.user))
    } else if (response.data.errors) {
        dispatch(setFetching(false))
        dispatch(getError(response.data.errors))
    }
}
export const updateUserInfo = (updateData: string, token: string): ThunkAction<void, AppStateType, unknown, AuthActionType> => async (dispatch: AppDispatch, getState) => {
    dispatch(cleanError())
    dispatch(setFetching(true))
    const response = await loginAPI.updateUserData(updateData, token);
    debugger
    if (response.data.user) {
        debugger

    } else if (response.data.errors) {
        dispatch(setFetching(false))
        dispatch(getError(response.data.errors))
    }

}
