import {Dispatch} from "redux";
import {loginAPI, LoginRequestType} from "../Components/Login/loginAPI";

const InitialState = {
    isLoggedIn: false,
    error: ''
}

export const loginReducer = (state: InitialStateType = InitialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.isLoggedIn}
        case "SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
};

// actions
const setIsLoggedInAC = (isLoggedIn: boolean) => {
    return {type: "SET-IS-LOGGED-IN", isLoggedIn} as const
}
const setErrorAC = (error: string ) => {
    return {type: "SET-ERROR", error} as const
}


// thunks

export const loginTC = (data: LoginRequestType) => (dispatch: Dispatch) => {
    loginAPI.login(data)
        .then(res => {
            debugger
            dispatch(setIsLoggedInAC(true))
            dispatch(setErrorAC(''))
        })
        .catch(err => {
            dispatch(setErrorAC(err.response.data.error))
        })
}

// types
type ActionTypes = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setErrorAC>
type InitialStateType = typeof InitialState