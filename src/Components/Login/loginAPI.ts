import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:7542/2.0/",
    withCredentials: true
})

export const loginAPI = {
    login(data: LoginRequestType) {
         return axiosInstance.post("auth/login", data)
    }
}

export type LoginRequestType = {
    email: string
    password: string
    rememberMe: boolean
}