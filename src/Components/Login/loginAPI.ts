import axios from "axios";

export const axiosInstance = axios.create({
    //baseURL: "https://neko-back.herokuapp.com/2.0/"
    baseURL: "http://localhost:7542/2.0/",
    withCredentials: true
})

export const loginAPI = {
    login(data: LoginRequestType) {
         return axiosInstance.post("auth/login", data)
    },
    logout() {
        return axiosInstance.delete("auth/me")
    },
    me() {
        return axiosInstance.post("auth/me")
    }
}

export type LoginRequestType = {
    email: string
    password: string
    rememberMe: boolean
}