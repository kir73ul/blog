import { userDataType } from './../redux/authReducer';
import axios from 'axios';
import { store } from '../redux/rootReducer';

export const saveToken = (userData: string) => {
    return localStorage.setItem('tokenData', ('Token ' + userData));
}

const instanceWithoutAuth = axios.create({
    baseURL: 'https://api.realworld.io/api/',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    }
})
const token = localStorage.getItem('tokenData')
const instanceWithAuth = axios.create({
    baseURL: 'https://api.realworld.io/api/',
/*     withCredentials: true,
 */    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://api.realworld.io/api',
        'Access-Control-Allow-Headers': 'Content-Type,  Access-Control-Allow-Origin',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET, PUT, DELETE, POST'

    }
})
//; charset=utf-8 ,         'Authorization': token,

instanceWithAuth.interceptors.request.use((config) => {
    config.headers.Authorization = token;
    return config
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
        return instanceWithoutAuth.post<UsersLType>('users/login', loginData).then(resp => resp).catch(error => error.response)
    },
    registrateMe(redisterData: string) {
        return instanceWithoutAuth.post<RegistrateType>('users', redisterData).then(resp => resp).catch(error => error.response)
    },
    updateUserData(updateData: string) {
        return instanceWithAuth.put('user', updateData)
            .then(resp => resp).catch(error => error.response)
    }
}

export const articaleData = {
    getArticalePage(currentPage = 1, pageSize = 5) {

        return instanceWithoutAuth.get(`articles?limit=${pageSize}?offset=${currentPage}`).then(response => (response.data)).catch(error => (error));
    }
}

export const singleArticle = {
    getsingleArticleData(slug: string) {
        return instanceWithoutAuth.get(`articles/${slug}`).then(response => (response.data.article)).catch(error => (error));
    }
}

export const likeAPI = {
    addLike(slug: string) {
        return instanceWithAuth.post(`articles/:${slug}/favorite`).then(response => (response)).catch(error => (error));
    },
    removeLike(slug: string) {
        return instanceWithAuth.delete(`articles/:${slug}/favorite`).then(response => (response)).catch(error => (error));
    }
}

export const createOrEditArticle = {
    createArticle(createData: string) {
        return instanceWithAuth.post(`articles`, createData)
            .then(response => (response)).catch(error => (error));
    }
}