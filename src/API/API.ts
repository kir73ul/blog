import { userUpdateType } from './../redux/authReducer';
import axios from 'axios';
import { store } from '../redux/rootReducer';

export const saveToken = (userData: JSON) => {
    return localStorage.setItem('tokenData', JSON.stringify(('Token ' + userData)));
}

const instanceWithoutAuth = axios.create({
    baseURL: 'https://api.realworld.io/api',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': '/',
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
        /*         'Access-Control-Allow-Headers': 'Content-Type, Authorization, Access-Control-Allow-Origin ',
         */
    }
})
const instanceWithAuth = axios.create({
    baseURL: 'https://api.realworld.io/api',
/*     withCredentials: true,
 */    headers: {
        'Credential': 'true',
        'Set-Cookie': 'HttpOnly',
        'Authorization': localStorage.getItem('tokenData'),
        'Content-Type': 'application/json; charset=utf-8',
        /*         'Accept': '/',
                'Host': 'https://api.realworld.io/api',
                'Origin': 'http://localhost:3000/' */
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
        return instanceWithoutAuth.post<UsersLType>('users/login', loginData).then(resp => resp).catch(error => error.response)
    },
    registrateMe(redisterData: string) {
        return instanceWithoutAuth.post<RegistrateType>('users', redisterData).then(resp => resp).catch(error => error.response)
    },
    updateUserData(updateData: userUpdateType) {
        return instanceWithAuth.put('user', JSON.stringify(updateData))
            .then(resp => resp).catch(error => error.response)
    }
}

export const articaleData = {
    getArticalePage(currentPage = 1, pageSize = 5) {
        return instanceWithoutAuth.get(`articles?limit=${pageSize}?offset=${pageSize * currentPage}`).then(response => (response.data)).catch(error => (error));
    }
}

export const singleArticle = {
    getsingleArticleData(slug: string) {
        return instanceWithoutAuth.get(`articles/${slug}`).then(response => (response.data.article)).catch(error => (error));
    }
}

export const likeAPI = {
    addLike(slug: string) {
        return instanceWithAuth.post(`articles/:${slug}/favorite`/* , {
            headers: {
                Authorization: `Token ${token}`
            }
        } */).then(response => (response.data)).catch(error => (error));
    },
    removeLike(slug: string) {
        return instanceWithAuth.delete(`articles/:${slug}/favorite`).then(response => (response.data)).catch(error => (error));
    }
}