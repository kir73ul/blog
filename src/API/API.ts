import axios from 'axios';

const instance = axios.create({
    /* withCredentials: true, */
    baseURL: 'https://conduit.productionready.io/api/',
    headers: {
        /* 'Authorization': 'Token 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', */
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
    getUserIformation() {
        const response = instance.get('users').then(resp => resp)
        console.log(response);
        return response
    }
}

export const articaleData = {
    getArticalePage(currentPage = 1, pageSize = 5) {
        debugger
        return instance.get(`articles?limit=${pageSize}`).then(response => (response.data)).catch(error => console.log(error));

    }
}