import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://conduit.productionready.io/api/',

    headers: {
        "Authorization": "Token jwt.token.here",
/*         "X-Requested-With": "XMLHttpRequest",
 */        "Content-Type": "application/json; charset=utf-8"
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
export interface loginDataType {
    users: UsersLType;
}
export const loginAPI = {
    aythtorizeMe(/* loginData: loginDataType */email: string, password: string) {
        const response = instance.post<UsersLType>('users/login', { email, password }).then(resp => resp)
        console.log(response);
        return
    },
    registrateMe(username: string, email: string, password: string) {
        const response = instance.post<RegistrateType>('users', { username, email, password }).then(resp => resp)
        console.log(response);
        return response
    },
    getUserIformation() {
        const response = instance.get('users').then(resp => resp)
        console.log(response);
        return response
    }
}

export const articaleData = {
    getArticalePage(currentPage = 1, pageSize = 5) {
        return instance.get(`api/articles?page=${currentPage}&limit=${pageSize}`).then(response => response.data)
    }
}