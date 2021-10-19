import axios from 'axios';
import Cookies from 'universal-cookie';

export const cookies = new Cookies();

export const saveToken = (token: string) => {
    console.log(token);
    const cookyToken = cookies.set('tokenData', ('Token ' + token), { expires: new Date(2021, 10, 1), path: '/' });
    return cookyToken
}
export const removeToken = () => {
    return cookies.remove('tokenData')
}
const token = cookies.get('tokenData')
const instanceWithAuth = axios.create({
    baseURL: 'https://api.realworld.io/api/',
    headers: {
        'Content-Type': 'application/json'
    }
})

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
        return instanceWithAuth.post<UsersLType>('users/login', loginData).then(resp => resp).catch(error => error.response)
    },
    registrateMe(redisterData: string) {
        return instanceWithAuth.post<RegistrateType>('users', redisterData).then(resp => resp).catch(error => error.response)
    },
    updateUserData(updateData: string) {
        return instanceWithAuth.put('user', updateData)
            .then(resp => resp).catch(error => error.response)
    }
}
export const usersAPI = {
    getUsersInformation() {
        return instanceWithAuth.get('user').then(resp => resp).catch(error => error.response)
    }
}

export const likeAPI = {
    addLike(slug: string) {
        return instanceWithAuth.post(`articles/${slug}/favorite`).then(response => (response)).catch(error => (error));
    },
    removeLike(slug: string) {
        return instanceWithAuth.delete(`articles/${slug}/favorite`).then(response => (response)).catch(error => (error));
    }
}

export const articleAPI = {
    createArticle(createData: string) {
        return instanceWithAuth.post(`articles`, createData)
            .then(response => (response)).catch(error => (error));
    },
    editArticle(editData: string, slug: string) {
        return instanceWithAuth.put(`articles/${slug}`, editData)
            .then(response => (response)).catch(error => (error));
    },
    getSingleArticleData(slug: string) {
        return instanceWithAuth.get(`articles/${slug}`).then(response => (response)).catch(error => (error));
    },
    getArticles(currentPage = 0, pageSize = 5) {
        return instanceWithAuth.get(`articles?limit=${pageSize}?offset=${currentPage - 1}`).then(response => (response.data)).catch(error => (error));
    },
    deleteArticle(slug: string) {
        return instanceWithAuth.delete(`articles/${slug}`).then(response => (response)).catch(error => (error));
    }
}