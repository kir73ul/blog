import { userUpdateType } from './../redux/authReducer';
import axios from 'axios';
import { store } from '../redux/rootReducer';

export const saveToken = (userData: JSON) => {
    return localStorage.setItem('tokenData', JSON.stringify(userData));
}

const instance = axios.create({
/*     baseURL: 'https://conduit.productionready.io/api/',
 */    baseURL: 'https://api.realworld.io/api',
/*     withCredentials: true,
 */    headers: {
        'Authorization': `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZEBhc2RrcmFmdC5ydSIsInVzZXJuYW1lIjoiYWxiMTIzNCIsInBhc3N3b3JkIjoiJDJhJDEwJDVCLldHNFFFbFNBeEt1RHRhUi9OLi5wTTRsTWRwZkVQUmJlbW5TU0pFTklwdDVRNm1adEsyIiwiYmlvIjpudWxsLCJpbWFnZSI6Imh0dHBzOi8vcmVhbHdvcmxkLXRlbXAtYXBpLmhlcm9rdWFwcC5jb20vaW1hZ2VzL3NtaWxleS1jeXJ1cy5qcGVnIiwiaWF0IjoxNjMzMTg4NTEwLCJleHAiOjE2MzgzNzI1MTB9.vJY_JjHB_EOrP4cdGah26LqJe9xk6Aqsf31i4o96RfY`,
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': '/',
        'Access-Control-Allow-Origin': 'http://localhost:3000/',
        /*         'Access-Control-Allow-Headers': 'Content-Type, Authorization, Access-Control-Allow-Origin ',
         */
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
    updateUserData(updateData: userUpdateType) {
        return instance.put('user', JSON.stringify(updateData))
            .then(resp => resp).catch(error => error.response)
    }
}

export const articaleData = {
    getArticalePage(currentPage = 1, pageSize = 5) {
        return instance.get(`articles?limit=${pageSize}?offset=${pageSize * currentPage}`).then(response => (response.data)).catch(error => (error));
    }
}

export const singleArticle = {
    getsingleArticleData(slug: string) {
        return instance.get(`articles/${slug}`).then(response => (response.data.article)).catch(error => (error));
    }
}

export const likeAPI = {
    addLike(slug: string) {
        return instance.post(`articles/:${slug}/favorite`/* , {
            headers: {
                Authorization: `Token ${token}`
            }
        } */).then(response => (response.data)).catch(error => (error));
    },
    removeLike(slug: string) {
        return instance.delete(`articles/:${slug}/favorite`).then(response => (response.data)).catch(error => (error));
    }
}