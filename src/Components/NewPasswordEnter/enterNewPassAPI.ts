import axios from 'axios';


const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0/",
    // baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true
})



export const enterNewPassAPI = {

    sendNewPass(password: string, resetPasswordToken: string) {
       return instance.post('auth/set-new-password',
            {
                password,
                resetPasswordToken
            })
    }
}