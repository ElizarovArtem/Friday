import axios from "axios";
import {DataRegistrationType} from "./Registration";

export const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0/",
    // baseURL: 'http://localhost:7542/2.0',
    withCredentials: true
})

export const registerAPI = {
    register(data: DataRegistrationType) {
        return instance.post<CommonResponseType<ResponseRegisterType>>('/auth/register', data)
    }
}

//types
export type CommonResponseType<T = {}> = {
    data: T
    messages: Array<string>
    fieldsErrors: Array<string>
    resultCode: number
}
type ResponseRegisterType = {
    addedUser: any
    error?: string
}