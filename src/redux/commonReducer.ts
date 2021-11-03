const SET_IS_FETCHING = 'SET_FETCHING';

interface CommonReducerType {
    isFetching: boolean;
}
const initialState = {
    isFetching: false,
}

export const commonReducer = (state: CommonReducerType = initialState, action: CommonActionType) => {
    switch (action.type) {
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default: return state
    }
}
type CommonActionType =  setIsFetchingType 

interface setIsFetchingType { type: typeof SET_IS_FETCHING, isFetching: boolean };
export const setFetching = (isFetching: boolean): setIsFetchingType => ({ type: SET_IS_FETCHING, isFetching });

