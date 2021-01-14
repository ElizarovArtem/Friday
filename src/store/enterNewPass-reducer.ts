
import { enterNewPassAPI } from "../Components/NewPasswordEnter/enterNewPassAPI";


const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
const SET_ERROR = 'SET_ERROR';
const SEND_NEW_PASS_SUCCES = 'SEND_NEW_PASS_SUCCES';

export const setError = (error: string): SetErrorPasswordType => {
    return {
        type: SET_ERROR,
        error
    }
}

export const changePassword = (password: string):ChangePasswordType  => {
    return {
        type: CHANGE_PASSWORD,
        password
    }
}

export const succesfullChange = (succes: boolean): SuccesfullPassChange => {
    return {
        type: SEND_NEW_PASS_SUCCES,
        succes
    }
}

export const sendNewPassword = (newPassword: string, token: string) => (dispatch: (action:ActionTypes) => void) => {
        enterNewPassAPI.sendNewPass(newPassword,token).then(res => {
            dispatch(succesfullChange(true))
        }).catch(error => {
            dispatch(setError(error.response.data.error));
        })
        
}

const InitialState = {
    newPassword:'',
    error: '',
    succes: false
}



export const enterNewPassReducer = (state: InitialStateType = InitialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case CHANGE_PASSWORD: 
            return {
                ...state,
                newPassword: action.password
            }
        case SET_ERROR: 
            return {
                ...state,
                error: action.error
            }    
        case SEND_NEW_PASS_SUCCES:
            return {
                ...state,
                succes: action.succes
            }    
        default:
            return state
    }
};


type ChangePasswordType = {
    type: typeof CHANGE_PASSWORD,
    password: string 
}
type SetErrorPasswordType = {
    type: typeof SET_ERROR,
    error: string 
}

type SuccesfullPassChange = {
    type: typeof SEND_NEW_PASS_SUCCES,
    succes: boolean
}
type ActionTypes = ChangePasswordType | SetErrorPasswordType | SuccesfullPassChange
type InitialStateType = typeof InitialState