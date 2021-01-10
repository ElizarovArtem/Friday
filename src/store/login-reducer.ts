import {Dispatch} from "redux";
import {loginAPI, LoginRequestType} from "../Components/Login/loginAPI";

const InitialState: InitialStateType = {
    isLoggedIn: false,
    error: null,
    isLoading: 'idle'
}

export const loginReducer = (state: InitialStateType = InitialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.isLoggedIn}
        case "SET-ERROR":
            return {...state, error: action.error}
        case "SET-IS-LOADING":
            return {...state, isLoading: action.isLoading}
        default:
            return state
    }
};

// actions
const setIsLoggedInAC = (isLoggedIn: boolean) => {
    return {type: "SET-IS-LOGGED-IN", isLoggedIn} as const
}
const setErrorAC = (error: string | null ) => {
    return {type: "SET-ERROR", error} as const
}
const setIsLoadingAC = (isLoading: IsLoadingValuesType ) => {
    return {type: "SET-IS-LOADING", isLoading} as const
}

// thunks
export const loginTC = (data: LoginRequestType) => (dispatch: Dispatch) => {
    dispatch(setIsLoadingAC("loading"))
    loginAPI.login(data)
        .then(res => {
            dispatch(setIsLoggedInAC(true))
            dispatch(setErrorAC(null))
            dispatch(setIsLoadingAC("idle"))
        })
        .catch(err => {
            if(err.response) {
                dispatch(setErrorAC(err.response.data.error))
            } else {
                dispatch(setErrorAC("Some error"))
            }
            dispatch(setIsLoadingAC("idle"))
        })
}

// types
type ActionTypes = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setErrorAC> | ReturnType<typeof setIsLoadingAC>
type InitialStateType = {
    isLoggedIn: boolean
    error: string | null
    isLoading: IsLoadingValuesType
}
export type IsLoadingValuesType = 'loading' | 'idle'