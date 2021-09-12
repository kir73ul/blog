import axios from 'axios';
import { store } from '../redux/rootReducer';

const instance = axios.create({
    /* withCredentials: true, */
    baseURL: 'https://conduit.productionready.io/api/',
    headers: {
        /*         'Authorization': `Token ${token}`, */
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': '/',
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    }
})


export interface UsersLType {
    email: string;
    password: string;
}
export interface RegistrateType {
    username: string;
    email: string;
    password: string;
}

export const loginAPI = {
    aythtorizeMe(loginData: string) {
        return instance.post<UsersLType>('users/login', loginData).then(resp => resp).catch(error => error.response)
    },
    registrateMe(redisterData: string) {
        return instance.post<RegistrateType>('users', redisterData).then(resp => resp).catch(error => error.response)

    },
    updateUserData(updateData: string) {
        return instance.put('user', updateData).then(resp => resp).catch(error => error.response)
    }
}

export const articaleData = {
    getArticalePage(currentPage = 1, pageSize = 5) {
        return instance.get(`articles?limit=${currentPage * pageSize}`).then(response => (response.data)).catch(error => (error));
    }
}

export const singleArticle = {
    getsingleArticleData(slug: string) {
        return instance.get(`articles/:${slug}`).then(response => (response.data)).catch(error => (error));
    }
}