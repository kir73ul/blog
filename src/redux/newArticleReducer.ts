import { articaleData } from './../API/API';
import { ThunkAction } from "redux-thunk";
import { createOrEditArticle } from "../API/API";
import { AppDispatch, AppStateType } from "./rootReducer";
import { errorsType } from './authReducer';

const SET_TAGS = 'SET_TAGS';
const REMOVE_TAG = 'REMOVE_TAG';
const SET_IS_FETCHING = 'SET_FETCHING';
const SET_NEW_ARTICLE = 'SET_NEW_ARTICLE';
const GET_ERROR = 'GET_ERROR';


interface articleDataType {
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
    articleData: any,
    isFetching: boolean,
    error: errorsType | null
}

const initialState = {
    tags: ['hi', 'there'],
    articleData: {},
    isFetching: false,
    error: null

}

export const newArticalReducer = (state: newArticalReducerType = initialState, action: newArticalActionType) => {
    switch (action.type) {
        case SET_TAGS:
            return {
                ...state,
                tags: [...state.tags, action.tag]
            }
        case REMOVE_TAG:
            return {
                ...state,
                tags: [...state.tags.filter((tag, idx) => idx !== action.index)]
            }
        case SET_NEW_ARTICLE:
            const parsedArticleData = JSON.parse(action.articleData)
            return {
                ...state,
                articleData: { ...parsedArticleData }
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case GET_ERROR:
            return {
                ...state,
                error: action.error
            }
        default: return state
    }
}
type newArticalActionType = setTagsType | removeTagType | setNewArticleDataType | setIsFetchingType | getErrorType
interface setTagsType { type: typeof SET_TAGS, tag: string };
export const setTags = (tag: string): setTagsType => ({ type: SET_TAGS, tag });
interface removeTagType { type: typeof REMOVE_TAG, index: number };
export const removeTag = (index: number): removeTagType => ({ type: REMOVE_TAG, index });
interface setNewArticleDataType { type: typeof SET_NEW_ARTICLE, articleData: string };
export const setNewArticleData = (articleData: string): setNewArticleDataType => ({ type: SET_NEW_ARTICLE, articleData });
interface setIsFetchingType { type: typeof SET_IS_FETCHING, isFetching: boolean };
const setFetching = (isFetching: boolean): setIsFetchingType => ({ type: SET_IS_FETCHING, isFetching });
interface getErrorType { type: typeof GET_ERROR, error: errorsType };
export const getError = (error: errorsType): getErrorType => ({ type: GET_ERROR, error });

export const createNewArticle = (articleData: string): ThunkAction<void, AppStateType, unknown, newArticalActionType> => async (dispatch: AppDispatch, getState) => {
    dispatch(setFetching(true))
    const response = await createOrEditArticle.createArticle(articleData);
    dispatch(setFetching(true))
    debugger
    if (response.status === 200) {
        dispatch(setNewArticleData(response.data.article))
    }
    else if (response.data.error) {
        dispatch(getError(response.data.errors))
    }


}