import {DataRegistrationType} from "../Components/Registration/Registration";
import {Dispatch} from "redux";
import {registerAPI} from "../Components/Registration/registration-API";


const InitialState: InitialStateType = {
    isNewUser: false
}

export const registrationReducer = (state: InitialStateType = InitialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "auth/SET-REGISTERED-USER":
            return {...state, isNewUser: action.isRegistered}
        default:
            return state
    }
};

export const setRegisteredUserAC = (isRegistered: boolean) => ({type: 'auth/SET-REGISTERED-USER', isRegistered} as const)


//thunks
export const registerUserTC = (data: DataRegistrationType) => (dispatch: Dispatch<ActionTypes>) => {
    registerAPI.register(data)
        .then(res => {
            console.log(res)
            dispatch(setRegisteredUserAC(true))
        })
        .catch(err => {
            alert(err)
        })
}


//types
type ActionTypes = ReturnType<typeof setRegisteredUserAC>
type InitialStateType = {
    isNewUser: boolean
}