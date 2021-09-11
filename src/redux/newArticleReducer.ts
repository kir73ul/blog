import { loginAPI } from "../API/API";
import { AppDispatch } from "./rootReducer";

const SET_TAGS = 'SET_TAGS';
const REMOVE_TAG = 'REMOVE_TAG';

interface newArticalReducerType {
    tags: string[];
}

const initialState = {
    tags: ['', 'hi', 'there']

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
                tags: [...state.tags.filter(tag => tag !== action.tag)]
            }
        default: return state
    }
}
type newArticalActionType = setTagsType | removeTagType
interface setTagsType { type: typeof SET_TAGS, tag: string };
export const setTags = (tag: string): setTagsType => ({ type: SET_TAGS, tag });
interface removeTagType { type: typeof REMOVE_TAG, tag: string };
export const removeTag = (tag: string): removeTagType => ({ type: REMOVE_TAG, tag });

