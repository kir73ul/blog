import { singleArticle } from './../API/API';
import { ThunkAction } from "redux-thunk";
import { articaleData } from "../API/API";
import { AppDispatch, AppStateType } from "./rootReducer";

const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_FETCHING = 'SET_FETCHING';
const SET_ARTICLES = 'SET_ARTICLES';
const GET_TOTAL_ARTICLES = 'GET_TOTAL_ARTICLES';

interface authorType {
    username: string;
    bio: string;
    image: string;
    following: boolean;

}
export interface articlesType {
    slug: string;
    title: string;
    description: string;
    body: string;
    createdAt: string;
    updatedAt: Date;
    favorited: boolean;
    favoritesCount: number;
    author: authorType;
    tagList: string[];

}

interface articlesReducerType {
    currentPage: number;
    pageSize: number;
    isFetching: boolean;
    articles: Array<articlesType>;
    total: number;
}

const initialState = {
    currentPage: 1,
    pageSize: 5,
    isFetching: false,
    articles: [] as Array<articlesType>,
    total: 0
}

export const articalesReducer = (state: articlesReducerType = initialState, action: newArticalActionType) => {
    switch (action.type) {
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case SET_ARTICLES:
            return {
                ...state,
                articles: action.articles
            }
        case GET_TOTAL_ARTICLES:
            return {
                ...state,
                total: action.total
            }

        default: return state
    }
}
type newArticalActionType = setCurrentPageType | setFetchingType | setArticlesType | getTotalArticlesType
interface setCurrentPageType { type: typeof SET_CURRENT_PAGE, currentPage: number };
export const setCurrentPage = (currentPage: number): setCurrentPageType => ({ type: SET_CURRENT_PAGE, currentPage });
interface setFetchingType { type: typeof SET_FETCHING, isFetching: boolean };
export const setFetching = (isFetching: boolean): setFetchingType => ({ type: SET_FETCHING, isFetching });
interface setArticlesType { type: typeof SET_ARTICLES, articles: Array<articlesType> };
export const setArticles = (articles: Array<articlesType>): setArticlesType => ({ type: SET_ARTICLES, articles });
interface getTotalArticlesType { type: typeof GET_TOTAL_ARTICLES, total: number };
export const getTotalArticles = (total: number): getTotalArticlesType => ({ type: GET_TOTAL_ARTICLES, total });

export const getArticles = (currentPage: number, pageSize: number): ThunkAction<void, AppStateType, unknown, newArticalActionType> => async (dispatch: AppDispatch, getState) => {
    dispatch(setFetching(true))
    const response = await articaleData.getArticalePage(currentPage, pageSize)
    dispatch(getTotalArticles(response.articlesCount))
    dispatch(setArticles(response.articles))
    dispatch(setFetching(false))
}
export const getSingleArticle = (slug: string): ThunkAction<void, AppStateType, unknown, newArticalActionType> => async (dispatch: AppDispatch, getState) => {
    dispatch(setFetching(true))
    const response = await singleArticle.getsingleArticleData(slug)
    console.log(response);
    dispatch(setFetching(false))
}