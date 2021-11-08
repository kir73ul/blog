import { ArticalError } from './../../redux/newArticleReducer';
export const convertDate = (inboxDate: string) => {
    const months = ['January', 'Febrary', 'March', 'April', 'May', 'June', 'Jule', 'August', 'September', 'Oktomber', 'November', 'December']
    const createDate = new Date(inboxDate)
    const year = createDate.getFullYear()
    const month = months[createDate.getMonth()]
    const date = createDate.getDate()
    return `${month} ${date}, ${year}`
}
interface objType {
    [key: string]: string
}
export const getDifferenceValue = (obj1: objType, obj2: objType) => {
    const result: any = {
        user: {}
    }
    for (let keyObj1 in obj1) {
        if (obj1[keyObj1] !== obj2[keyObj1]) {
            result.user[keyObj1] = obj1[keyObj1]
        }
    }
    return result
}
export const hasErrorOnInput = (error: ArticalError | null | undefined, value: string) => {
    console.log(value);
    console.log(error ? Object.keys(error) : null);

    return (error && Object.keys(error).find(elem => elem.includes(value)))
}

export const getErrorInfo = (error: ArticalError | null | undefined, value: string) => {
    console.log(error);

    for (let key in error) {
        if (key.includes(value)) {
            return error[key]
        }
    }
    return
}
