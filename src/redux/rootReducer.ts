import { newArticalReducer } from './newArticleReducer';
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { authReducer } from "./authReducer";
import thunkMiddleware from 'redux-thunk';
import { articalesReducer } from './articalesReducer';

const loadFromLocalStorage = () => {
    try {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : undefined;
    } catch (e) {
        console.error(e);
        return undefined;
    }
};


export const rootReduser = combineReducers({
    auth: authReducer,
    newArtical: newArticalReducer,
    articles: articalesReducer
})

export type AppStateType = ReturnType<typeof rootReduser>
export type AppDispatch = typeof store.dispatch

const preloadUserData = loadFromLocalStorage()
//@ts-ignore
const composeEnhancers = (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReduser, preloadUserData, composeEnhancers(applyMiddleware(thunkMiddleware)
));

/* store.subscribe(() => {
    saveToLocalStorage(store.getState());
});
 */