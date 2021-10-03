import { singleArticle, likeAPI } from './../API/API';
import { ThunkAction } from "redux-thunk";
import { articaleData } from "../API/API";
import { AppDispatch, AppStateType } from "./rootReducer";

const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_FETCHING = 'SET_FETCHING';
const SET_ARTICLES = 'SET_ARTICLES';
const GET_TOTAL_ARTICLES = 'GET_TOTAL_ARTICLES';
const SET_FAVORITE_UNFAVORITE = 'SET_FAVORITE_UNFAVORITE';
const SET_CURRENT_SLUG = 'SET_CURRENT_SLUG';
const SET_CURRENT_ARTICLE = 'SET_CURRENT_ARTICLE';


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
    currentArticle: articlesType | null;
    total: number;
    currentSlug: string;
}

const initialState = {
    currentPage: 1,
    pageSize: 5,
    isFetching: false,
    articles: [] as Array<articlesType>,
    currentArticle: null,
    total: 0,
    currentSlug: ''
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
        case SET_FAVORITE_UNFAVORITE:
            return {
                ...state,
                ...state.articles,
                favorited: action.favorited
            }
        case SET_CURRENT_SLUG:
            return {
                ...state,
                currentSlug: action.slug
            }
        case SET_CURRENT_ARTICLE:
            return {
                ...state,
                currentArticle: { ...state.currentArticle, ...action.currentArticle }
            }

        default: return state
    }
}
type newArticalActionType = setCurrentPageType | setFetchingType | setArticlesType | getTotalArticlesType | setFavoriteUnfavoriteType | setCurrentSlugType | setCurrentArticleType
interface setCurrentPageType { type: typeof SET_CURRENT_PAGE, currentPage: number };
export const setCurrentPage = (currentPage: number): setCurrentPageType => ({ type: SET_CURRENT_PAGE, currentPage });
interface setFetchingType { type: typeof SET_FETCHING, isFetching: boolean };
export const setFetching = (isFetching: boolean): setFetchingType => ({ type: SET_FETCHING, isFetching });
interface setArticlesType { type: typeof SET_ARTICLES, articles: Array<articlesType> };
export const setArticles = (articles: Array<articlesType>): setArticlesType => ({ type: SET_ARTICLES, articles });
interface getTotalArticlesType { type: typeof GET_TOTAL_ARTICLES, total: number };
export const getTotalArticles = (total: number): getTotalArticlesType => ({ type: GET_TOTAL_ARTICLES, total });
interface setFavoriteUnfavoriteType { type: typeof SET_FAVORITE_UNFAVORITE, favorited: boolean };
export const setFavoriteUnfavorite = (favorited: boolean): setFavoriteUnfavoriteType => ({ type: SET_FAVORITE_UNFAVORITE, favorited });
interface setCurrentSlugType { type: typeof SET_CURRENT_SLUG, slug: string };
export const setCurrentSlug = (slug: string): setCurrentSlugType => ({ type: SET_CURRENT_SLUG, slug });
interface setCurrentArticleType { type: typeof SET_CURRENT_ARTICLE, currentArticle: articlesType };
export const setCurrentArticle = (currentArticle: articlesType): setCurrentArticleType => ({ type: SET_CURRENT_ARTICLE, currentArticle });



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
    dispatch(setCurrentArticle(response))
    dispatch(setFetching(false))
}

export const makeFavorite = (slug: string): ThunkAction<void, AppStateType, unknown, newArticalActionType> => async (dispatch: AppDispatch, getState) => {
    const response = await likeAPI.addLike(slug)
    if (response.status === 'ok') {
        setFavoriteUnfavorite(true)
    }
}