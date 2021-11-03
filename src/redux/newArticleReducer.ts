import { errorsType } from './authReducer';

const SET_SUCCESS = 'SET_SUCCESS';
const GET_ARTICLE_ERROR = 'GET_ARTICLE_ERROR';
const SET_ONLY_CREATED = 'SET_ONLY_CREATED';

/*   */
interface newArticalReducerType {
    isSuccess: boolean;
    errorArtical: errorsType | null;
    onlyCreatedSlug: string | null;
}
const initialState = {
    isSuccess: false,
    errorArtical: null,
    onlyCreatedSlug: null
}

export const newArticalReducer = (state: newArticalReducerType = initialState, action: newArticalActionType) => {
    switch (action.type) {
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
        case SET_ONLY_CREATED:
            return {
                ...state,
                onlyCreatedSlug: action.onlyCreatedSlug
            }
        default: return state
    }
}
type newArticalActionType = | getErrorType | setSuccsesType | setOnlyCreatedType

interface getErrorType { type: typeof GET_ARTICLE_ERROR, error: errorsType };
export const getError = (error: errorsType): getErrorType => ({ type: GET_ARTICLE_ERROR, error });
interface setSuccsesType { type: typeof SET_SUCCESS, isSuccess: boolean };
export const setSuccses = (isSuccess: boolean): setSuccsesType => ({ type: SET_SUCCESS, isSuccess });
interface setOnlyCreatedType { type: typeof SET_ONLY_CREATED, onlyCreatedSlug: string | null };
export const setOnlyCreated = (onlyCreatedSlug: string | null): setOnlyCreatedType => ({ type: SET_ONLY_CREATED, onlyCreatedSlug });

