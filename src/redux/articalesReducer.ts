import { ThunkAction } from "redux-thunk";
import { articaleData } from "../API/API";
import { AppDispatch, AppStateType } from "./rootReducer";

const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_FETCHING = 'SET_FETCHING';
const SET_ARTICLES = 'SET_ARTICLES';

/* {
    "slug": "how-to-train-your-dragon",
    "title": "How to train your dragon",
    "description": "Ever wonder how?",
    "body": "It takes a Jacobian",
    "tagList": ["dragons", "training"],
    "createdAt": "2016-02-18T03:22:56.637Z",
    "updatedAt": "2016-02-18T03:48:35.824Z",
    "favorited": false,
    "favoritesCount": 0,
    "author": {
      "username": "jake",
      "bio": "I work at statefarm",
      "image": "https://i.stack.imgur.com/xHWG8.jpg",
      "following": false
    }
  } */

interface authorType {
    username: string;
    bio: string;
    image: string;
    following: boolean;

}
interface articlesType {
    slug: string;
    title: string;
    description: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
    favorited: boolean;
    favoritesCount: number;
    author: authorType

}

interface articlesReducerType {
    currentPage: number;
    pageSize: number;
    isFetching: boolean;
    articles: Array<articlesType>
}

const initialState = {
    currentPage: 1,
    pageSize: 5,
    isFetching: false,
    articles: [] as Array<articlesType>
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

        default: return state
    }
}
type newArticalActionType = setCurrentPageType | setFetchingType | setArticlesType
interface setCurrentPageType { type: typeof SET_CURRENT_PAGE, currentPage: number };
export const setCurrentPage = (currentPage: number): setCurrentPageType => ({ type: SET_CURRENT_PAGE, currentPage });
interface setFetchingType { type: typeof SET_FETCHING, isFetching: boolean };
export const setFetching = (isFetching: boolean): setFetchingType => ({ type: SET_FETCHING, isFetching });
interface setArticlesType { type: typeof SET_ARTICLES, articles: Array<articlesType> };
export const setArticles = (articles: Array<articlesType>): setArticlesType => ({ type: SET_ARTICLES, articles });

export const getArticles = (currentPage: number, pageSize: number): ThunkAction<void, AppStateType, unknown, newArticalActionType> => async (dispatch: AppDispatch, getState) => {
    dispatch(setFetching(true))
    const response = await articaleData.getArticalePage(currentPage, pageSize)
    console.log(response);
    dispatch(setFetching(false))

    

}
