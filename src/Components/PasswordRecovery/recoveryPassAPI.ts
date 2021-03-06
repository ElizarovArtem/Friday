import axios from 'axios';


const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0/",
    // baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true
})



export const recoveryPassAPI = {

    sendEmail(email: string) {
       return instance.post('auth/forgot',
            {
                email,
                from: "AlexB admin",
                message: "<div style=\"background-color: lime; padding: 15px\"> password recovery link: <a href=\'http://elizarovartem.github.io/Friday/#/pas-enter/$token$\'>link</a></div>\`"
            })
    }
}