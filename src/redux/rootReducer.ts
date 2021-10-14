import { newArticalReducer } from './newArticleReducer';
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { authReducer, setUsersData } from "./authReducer";
import thunkMiddleware from 'redux-thunk';
import { articalesReducer } from './articalesReducer';
import { saveUserData } from '../API/API';

const loadFromLocalStorage = () => {
    try {
        const userData = localStorage.getItem('userData');
        //@ts-ignore
        console.log(JSON.parse(userData))
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
//@ts-ignore
export const store = createStore(rootReduser, preloadUserData, composeEnhancers(applyMiddleware(thunkMiddleware)
));

/* store.subscribe(() => {
    console.log(store.getState());

}); */
