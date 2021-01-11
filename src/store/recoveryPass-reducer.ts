
import { recoveryPassAPI } from "../Components/PasswordRecovery/recoveryPassAPI";

const FORGOT_PASS = 'FORGOT_PASS';
const CHANGE_EMAIL = 'CHANGE_EMAIL';
const EMAIL_SENDED = 'EMAIL_SENDED';

type ForgotPassType = {
    type: typeof FORGOT_PASS
    error: string
}

type UserEmailType = {
    type: typeof CHANGE_EMAIL
    email: string
}

type EmailSendedType = {
    type: typeof EMAIL_SENDED
    emailSended: boolean
}



export const forgotPassAC = (error: string): ForgotPassType => {
    return {
        type: FORGOT_PASS,
        error
    }
}

export const userEmailAC = (email: string): UserEmailType => {
    return {
        type: CHANGE_EMAIL,
        email
    }
}

export const emailSended = (emailSended: boolean): EmailSendedType => {
    return {
        type: EMAIL_SENDED,
        emailSended
    }
}

export const sendRecoveryMess = (email: string) => (dispatch: (action:ActionTypes) => void) => {
    
    recoveryPassAPI.sendEmail(email).then(res => {
        dispatch(emailSended(true));
    } ).catch(err => {
        dispatch(forgotPassAC(err.response.data.error))
    })
}

export const addUserEmail = (email: string) => (dispatch: (action:ActionTypes) => void) => {
    dispatch(userEmailAC(email));
}

const InitialState = {
    error: '',
    email: '',
    emailSended: false 
}


export const recoveryPassReducer = (state: InitialStateType = InitialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case FORGOT_PASS: 
            return {
                    ...state,
                    error: action.error
            }

        case CHANGE_EMAIL: 
        return {
            ...state,
            email: action.email
        }    

        case EMAIL_SENDED: 
        return {
            ...state,
            emailSended: action.emailSended
        }
        default:
            return state
    }
};

type ActionTypes = ForgotPassType | UserEmailType | EmailSendedType
type InitialStateType = typeof InitialState;