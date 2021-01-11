import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true
})



export const recoveryPassAPI = {
    sendEmail(email: string) {
        axios.post('auth/forgot',
            {
                email: email,
                from: "AlexB admin",
                message: "<div style=\"background-color: lime; padding: 15px\"> password recovery link: <a href=\'http://localhost:3000/#/set-new-password/$token$\'>link</a></div>\`"
            }).then(res => res.data.info).catch(res => res.error);
    }
}