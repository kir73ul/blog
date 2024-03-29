import { articleAPI, likeAPI } from './../API/API';
import { ThunkAction } from "redux-thunk";
import { AppDispatch, AppStateType } from "./rootReducer";
import { setFetching } from './commonReducer';
import { getError, setOnlyCreated, setSuccses } from './newArticleReducer';

const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_ARTICLES = 'SET_ARTICLES';
const GET_TOTAL_ARTICLES = 'GET_TOTAL_ARTICLES';
const SET_FAVORITE_UNFAVORITE = 'SET_FAVORITE_UNFAVORITE';
const SET_CURRENT_SLUG = 'SET_CURRENT_SLUG';
const SET_CURRENT_ARTICLE = 'SET_CURRENT_ARTICLE';
const SET_IS_REMOVE_SUCCESS = 'SET_IS_REMOVE_SUCCESS';
const SET_IS_LIKE_PUSHED = 'SET_IS_LIKE_PUSHED';
const SET_MODAL_OPEN = 'SET_MODAL_OPEN';

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
    articleList: articlesType[];
    currentArticle: articlesType | null;
    total: number;
    currentSlug: string;
    isRemoveSuccess: boolean;
    isModalOpened: boolean;
    isLikePushed: boolean;
}

const initialState = {
    currentPage: 1,
    pageSize: 5,
    articleList: [],
    currentArticle: null,
    total: 0,
    currentSlug: '',
    isRemoveSuccess: false,
    isModalOpened: false,
    isLikePushed: false
}

export const articalesReducer = (state: articlesReducerType = initialState, action: newArticalActionType) => {
    switch (action.type) {
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_ARTICLES:
            return {
                ...state,
                articleList: action.articleList
            }
        case GET_TOTAL_ARTICLES:
            return {
                ...state,
                total: action.total
            }
        case SET_FAVORITE_UNFAVORITE:
            return {
                ...state,
                articleList: state.articleList.map(article => {
                    return article.slug === action.slug ? { ...article, ...action.articleData } : article
                })
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
        case SET_IS_REMOVE_SUCCESS:
            return {
                ...state,
                isRemoveSuccess: action.isRemoveSuccess
            }
        case SET_MODAL_OPEN:
            return {
                ...state,
                isModalOpened: action.isModalOpened
            }
        case SET_IS_LIKE_PUSHED:
            return {
                ...state,
                isLikePushed: action.isLikePushed
            }
        default: return state
    }
}
type newArticalActionType = setCurrentPageType | setArticlesType | getTotalArticlesType | setFavoriteUnfavoriteType | setCurrentSlugType | setCurrentArticleType | setIsRemoveSuccessType | setLikePushedType | setIsModalOpenedType
interface setCurrentPageType { type: typeof SET_CURRENT_PAGE, currentPage: number };
export const setCurrentPage = (currentPage: number): setCurrentPageType => ({ type: SET_CURRENT_PAGE, currentPage });
interface setArticlesType { type: typeof SET_ARTICLES, articleList: Array<articlesType> };
export const setArticles = (articleList: Array<articlesType>): setArticlesType => ({ type: SET_ARTICLES, articleList });
interface getTotalArticlesType { type: typeof GET_TOTAL_ARTICLES, total: number };
export const getTotalArticles = (total: number): getTotalArticlesType => ({ type: GET_TOTAL_ARTICLES, total });
interface setFavoriteUnfavoriteType { type: typeof SET_FAVORITE_UNFAVORITE, articleData: articlesType, slug: string };
export const setFavoriteUnfavorite = (articleData: articlesType, slug: string): setFavoriteUnfavoriteType => ({ type: SET_FAVORITE_UNFAVORITE, articleData, slug });
interface setCurrentSlugType { type: typeof SET_CURRENT_SLUG, slug: string };
export const setCurrentSlug = (slug: string): setCurrentSlugType => ({ type: SET_CURRENT_SLUG, slug });
interface setCurrentArticleType { type: typeof SET_CURRENT_ARTICLE, currentArticle: articlesType };
export const setCurrentArticle = (currentArticle: articlesType): setCurrentArticleType => ({ type: SET_CURRENT_ARTICLE, currentArticle });
interface setIsRemoveSuccessType { type: typeof SET_IS_REMOVE_SUCCESS, isRemoveSuccess: boolean };
export const setIsRemoveSuccess = (isRemoveSuccess: boolean): setIsRemoveSuccessType => ({ type: SET_IS_REMOVE_SUCCESS, isRemoveSuccess });
interface setLikePushedType { type: typeof SET_IS_LIKE_PUSHED, isLikePushed: boolean };
export const setLikePushed = (isLikePushed: boolean): setLikePushedType => ({ type: SET_IS_LIKE_PUSHED, isLikePushed });
interface setIsModalOpenedType { type: typeof SET_MODAL_OPEN, isModalOpened: boolean };
export const setIsModalOpened = (isModalOpened: boolean): setIsModalOpenedType => ({ type: SET_MODAL_OPEN, isModalOpened });

export const createOrEditArticle = (articleData: any, slug: string, isEditingArticle: boolean): ThunkAction<void, AppStateType, unknown, newArticalActionType> => async (dispatch: AppDispatch, getState) => {
    dispatch(setFetching(true))
    let response
    isEditingArticle ? response = await articleAPI.editArticle(articleData, slug) : response = await articleAPI.createArticle(articleData);
    dispatch(setFetching(false))
    if (response.status === 200) {
        dispatch(setCurrentSlug(response.data.article.slug))
        dispatch(setCurrentArticle(response.data.article))
        dispatch(setSuccses(true))
        setTimeout(() => {
            dispatch(setSuccses(false))
        }, 4000)
        if (!isEditingArticle) {
            dispatch(setOnlyCreated(response.data.article.slug))
            setTimeout(() => {
                dispatch(setOnlyCreated(null))
            }, 10000)
        }
    } else if (response.response.data.errors) {
        return dispatch(getError(response.response.data.errors))
    } else if (response.status === 500) {
        return dispatch(getError({ [response.status]: [response.data] }))
    } else throw new Error()
}

export const getArticles = (currentPage: number, pageSize: number): ThunkAction<void, AppStateType, unknown, newArticalActionType> => async (dispatch: AppDispatch, getState) => {
    dispatch(setFetching(true))
    const response = await articleAPI.getArticles(currentPage, pageSize)
    dispatch(setFetching(false))
    if (response.status === 200) {
        dispatch(getTotalArticles(response.data.articlesCount))
        dispatch(setCurrentPage(currentPage))
        dispatch(setArticles(response.data.articles))
    } else if (response.status !== 200) {
        throw new Error(`Something went wrong. Please try again`)
    }
}

export const getSingleArticle = (slug: string): ThunkAction<void, AppStateType, unknown, newArticalActionType> => async (dispatch: AppDispatch, getState) => {
    dispatch(setFetching(true))
    const response = await articleAPI.getSingleArticleData(slug)
    dispatch(setFetching(false))
    if (response.status === 200) {
        dispatch(setCurrentSlug(response.data.article.slug))
        dispatch(setCurrentArticle(response.data.article))
    } else if (response.status !== 200) {
        throw new Error(`Something went wrong. Please try again`)
    }
}

export const makeFavoriteUnfavorite = (slug: string, favorite: boolean, isSingleArticlePage: boolean): ThunkAction<void, AppStateType, unknown, newArticalActionType> => async (dispatch: AppDispatch, getState) => {
    try {
        let response
        dispatch(setLikePushed(true))
        favorite ? response = await likeAPI.removeLike(slug) : response = await likeAPI.addLike(slug)
        dispatch(setLikePushed(false))
        if (response.status === 200 || response.status === 204) {
            isSingleArticlePage ? dispatch(setCurrentArticle(response.data.article)) : dispatch(setFavoriteUnfavorite(response.data.article, slug))
        } else if (response.data.errors) {
            throw new Error(`Something went wrong. Please try again`)
        }
    }
    catch (error) {
        throw new Error(`Something went wrong. Please try again`)
    }
}

export const removeArticle = (slug: string): ThunkAction<void, AppStateType, unknown, newArticalActionType> => async (dispatch: AppDispatch, getState) => {
    const response = await articleAPI.deleteArticle(slug)
    if (response.status === 200 || response.status === 204) {
        dispatch(setIsRemoveSuccess(true))
        setTimeout(() => {
            dispatch(setIsRemoveSuccess(false))
        }, 3000)
    } else if (response.status !== 200) {
        throw new Error(`Something went wrong. Please try again`)
    }
}
