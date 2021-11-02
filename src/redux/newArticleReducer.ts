import { ThunkAction } from "redux-thunk";
import { articleAPI } from "../API/API";
import { AppDispatch, AppStateType } from "./rootReducer";
import { errorsType } from './authReducer';
import { setCurrentArticle, setCurrentSlug } from "./articalesReducer";
import { setFetching } from "./commonReducer";

const SET_NEW_ARTICLE = 'SET_NEW_ARTICLE';
const SET_SUCCESS = 'SET_SUCCESS';
const GET_ARTICLE_ERROR = 'GET_ARTICLE_ERROR';
const ZEROIZE_ARTICLE = 'ZEROIZE_ARTICLE';
const ZEROIZE_TAGS = 'ZEROIZE_TAGS';
const SET_ONLY_CREATED = 'SET_ONLY_CREATED';


export interface articleDataType {
    slug: string,
    title: string,
    description: string,
    body: string,
    tagList: string[],
    createdAt: string,
    updatedAt: string,
    favorited: boolean,
    favoritesCount: 0,
    author: {
        username: string,
        bio: string,
        image: string,
        following: boolean
    }
}
interface newArticalReducerType {
    tags: string[];
    articleData: articleDataType | null;
    isSuccess: boolean;
    errorArtical: errorsType | null;
    onlyCreatedSlug: string | null;
}
const initialState = {
    tags: [],
    articleData: null,
    isSuccess: false,
    errorArtical: null,
    onlyCreatedSlug: null
}

export const newArticalReducer = (state: newArticalReducerType = initialState, action: newArticalActionType) => {
    switch (action.type) {
        case SET_NEW_ARTICLE:
            return {
                ...state,
                articleData: { ...action.articleData }
            }
        case GET_ARTICLE_ERROR:
            return {
                ...state,
                errorArtical: action.error
            }
        case SET_SUCCESS:
            return {
                ...state,
                isSuccess: action.isSuccess
            }
        case ZEROIZE_ARTICLE:
            return {
                ...state,
                articleData: null
            }
        case ZEROIZE_TAGS:
            return {
                ...state,
                tags: []
            }
        case SET_ONLY_CREATED:
            return {
                ...state,
                onlyCreatedSlug: action.onlyCreatedSlug
            }
        default: return state
    }
}
type newArticalActionType =  setNewArticleDataType | getErrorType | setSuccsesType | zeroizeArticleType | zeroizeTagsType | setOnlyCreatedType

interface setNewArticleDataType { type: typeof SET_NEW_ARTICLE, articleData: any };
export const setNewArticleData = (articleData: any): setNewArticleDataType => ({ type: SET_NEW_ARTICLE, articleData });
interface getErrorType { type: typeof GET_ARTICLE_ERROR, error: errorsType };
export const getError = (error: errorsType): getErrorType => ({ type: GET_ARTICLE_ERROR, error });
interface setSuccsesType { type: typeof SET_SUCCESS, isSuccess: boolean };
const setSuccses = (isSuccess: boolean): setSuccsesType => ({ type: SET_SUCCESS, isSuccess });
interface zeroizeArticleType { type: typeof ZEROIZE_ARTICLE };
export const zeroizeArticle = (): zeroizeArticleType => ({ type: ZEROIZE_ARTICLE });
interface zeroizeTagsType { type: typeof ZEROIZE_TAGS };
export const zeroizeTags = (): zeroizeTagsType => ({ type: ZEROIZE_TAGS });
interface setOnlyCreatedType { type: typeof SET_ONLY_CREATED, onlyCreatedSlug: string | null };
export const setOnlyCreated = (onlyCreatedSlug: string | null): setOnlyCreatedType => ({ type: SET_ONLY_CREATED, onlyCreatedSlug });

export const createNewArticle = (articleData: any): ThunkAction<void, AppStateType, unknown, newArticalActionType> => async (dispatch: AppDispatch, getState) => {
    dispatch(setFetching(true))
    const response = await articleAPI.createArticle(articleData);
    dispatch(setFetching(false))
    if (response.status === 200) {
        dispatch(setCurrentSlug(response.data.article.slug))
        dispatch(setCurrentArticle(response.data.article))
        dispatch(zeroizeArticle())
        dispatch(zeroizeTags())
        dispatch(setSuccses(true))
        dispatch(setOnlyCreated(response.data.article.slug))
        setTimeout(() => {
            dispatch(setSuccses(false))
        }, 4000)
        setTimeout(() => {
            dispatch(setOnlyCreated(null))
        }, 10000)
    }
    else if (response.status !== 200) {
        response.response.data.errors ? dispatch(getError(response.response.data.errors)) : dispatch(getError({ [response.status]: response.data }))
    }
}
export const getArticleData = (slug: string): ThunkAction<void, AppStateType, unknown, newArticalActionType> => async (dispatch: AppDispatch, getState) => {
    dispatch(setFetching(true))
    const response = await articleAPI.getSingleArticleData(slug);
    dispatch(setFetching(false))
    if (response.status === 200) {
        dispatch(setNewArticleData(response.data.article))
    } else if (response.status !== 200) {
        dispatch(getError(response.data.errors));
    }
}
export const editArticle = (articleData: any, slug: string): ThunkAction<void, AppStateType, unknown, newArticalActionType> => async (dispatch: AppDispatch, getState) => {
    dispatch(setFetching(true))
    const response = await articleAPI.editArticle(articleData, slug);
    dispatch(setFetching(false))
    if (response.status === 200) {
        dispatch(setCurrentSlug(response.data.article.slug))
        dispatch(setSuccses(true))
        setTimeout(() => {
            dispatch(zeroizeArticle())
            dispatch(zeroizeTags())
            dispatch(setSuccses(false))
        }, 4000)
    }
    else if (response.data.error) {
        dispatch(getError(response.data.errors))
    }
}