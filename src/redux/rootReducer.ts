import { newArticalReducer } from './newArticleReducer';
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { authReducer } from "./authReducer";
import thunkMiddleware from 'redux-thunk';
import { articalesReducer } from './articalesReducer';
import { commonReducer } from './commonReducer';

export const rootReduser = combineReducers({
    auth: authReducer,
    newArtical: newArticalReducer,
    articles: articalesReducer,
    common: commonReducer
})

export type AppStateType = ReturnType<typeof rootReduser>
export type AppDispatch = typeof store.dispatch
//@ts-ignore
const composeEnhancers = (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReduser, composeEnhancers(applyMiddleware(thunkMiddleware)
));

