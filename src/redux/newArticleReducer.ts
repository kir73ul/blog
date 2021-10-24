import { ThunkAction } from "redux-thunk";
import { articleAPI } from "../API/API";
import { AppDispatch, AppStateType } from "./rootReducer";
import { errorsType } from './authReducer';
import { setCurrentArticle, setCurrentSlug } from "./articalesReducer";

const SET_TAGS = 'SET_TAGS';
const REMOVE_TAG = 'REMOVE_TAG';
const SET_IS_FETCHING = 'SET_FETCHING';
const SET_NEW_ARTICLE = 'SET_NEW_ARTICLE';
const SET_SUCCESS = 'SET_SUCCESS';
const GET_ARTICLE_ERROR = 'GET_ARTICLE_ERROR';
const ZEROIZE_ARTICLE = 'ZEROIZE_ARTICLE';
const ZEROIZE_TAGS = 'ZEROIZE_TAGS';


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
    isFetching: boolean;
    isSuccess: boolean;
    errorArtical: errorsType | null;
}

const initialState = {
    tags: [],
    articleData: null,
    isSuccess: false,
    isFetching: false,
    errorArtical: null
}

export const newArticalReducer = (state: newArticalReducerType = initialState, action: newArticalActionType) => {
    switch (action.type) {
        case SET_TAGS:
            return state.articleData ?
                {
                    ...state,
                    articleData: {
                        ...state.articleData,
                        tagList: [...state.articleData.tagList, action.tag]
                    },
                }
                :
                {
                    ...state,
                    tags: [...state.tags, action.tag]
                }
        case REMOVE_TAG:
            return state.articleData ?
                {
                    ...state,
                    articleData: {
                        ...state.articleData,
                        tagList: [...state.articleData.tagList.filter((tag, idx) => idx !== action.index)]
                    },
                }
                :
                {
                    ...state,
                    tags: [...state.tags.filter((tag, idx) => idx !== action.index)]
                }
        case SET_NEW_ARTICLE:
            return {
                ...state,
                articleData: { ...action.articleData }
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
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
        default: return state
    }
}
type newArticalActionType = setTagsType | removeTagType | setNewArticleDataType | setIsFetchingType | getErrorType | setSuccsesType | zeroizeArticleType | zeroizeTagsType
interface setTagsType { type: typeof SET_TAGS, tag: string };
export const setTags = (tag: string): setTagsType => ({ type: SET_TAGS, tag });
interface removeTagType { type: typeof REMOVE_TAG, index: number };
export const removeTag = (index: number): removeTagType => ({ type: REMOVE_TAG, index });
interface setNewArticleDataType { type: typeof SET_NEW_ARTICLE, articleData: any };
export const setNewArticleData = (articleData: any): setNewArticleDataType => ({ type: SET_NEW_ARTICLE, articleData });
interface setIsFetchingType { type: typeof SET_IS_FETCHING, isFetching: boolean };
const setFetching = (isFetching: boolean): setIsFetchingType => ({ type: SET_IS_FETCHING, isFetching });
interface getErrorType { type: typeof GET_ARTICLE_ERROR, error: errorsType };
export const getError = (error: errorsType): getErrorType => ({ type: GET_ARTICLE_ERROR, error });
interface setSuccsesType { type: typeof SET_SUCCESS, isSuccess: boolean };
const setSuccses = (isSuccess: boolean): setSuccsesType => ({ type: SET_SUCCESS, isSuccess });
interface zeroizeArticleType { type: typeof ZEROIZE_ARTICLE };
export const zeroizeArticle = (): zeroizeArticleType => ({ type: ZEROIZE_ARTICLE });
interface zeroizeTagsType { type: typeof ZEROIZE_TAGS };
export const zeroizeTags = (): zeroizeTagsType => ({ type: ZEROIZE_TAGS });

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
        setTimeout(() => {
            dispatch(setSuccses(false))
        }, 4000)

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
        dispatch(setCurrentArticle(response.data.article))
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