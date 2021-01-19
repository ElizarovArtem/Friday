import {Dispatch} from "redux";
import {packsAPI, PackType} from "../Components/Packs/packs-api";

const InitialState: InitialStateType = {
    isLoading: "idle",
    error: null,
    packs: []
}

export const packsReducer = (state: InitialStateType = InitialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "SET-IS-LOADING":
            return {...state, isLoading: action.isLoading}
        case "SET-ERROR":
            return {...state, error: action.error}
        case "SET-PACKS":
            return {...state, packs: action.packs}
        default:
            return state
    }
};

// actions
const setErrorAC = (error: string | null) => {
    return {type: "SET-ERROR", error} as const
}
const setIsLoadingAC = (isLoading: IsLoadingValuesType) => {
    return {type: "SET-IS-LOADING", isLoading} as const
}
const setPacksAC = (packs: Array<PackType>) => {
    return {type: "SET-PACKS", packs} as const
}

// thunks
export const getPacksTC = () => (dispatch: Dispatch) => {
    dispatch(setIsLoadingAC("loading"))
    packsAPI.getPacks()
        .then(res => {
            dispatch(setPacksAC(res.data.cardPacks))
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

export const createPackTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setIsLoadingAC("loading"))
    packsAPI.createPack(title)
        .then(res => {
            dispatch(getPacksTC() as any)
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
export const deletePackTC = (id: string) => (dispatch: Dispatch) => {
    dispatch(setIsLoadingAC("loading"))
    packsAPI.deletePack(id)
        .then(res => {
            dispatch(getPacksTC() as any)
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
export const updatePackTC = (id: string, name: string) => (dispatch: Dispatch) => {
    dispatch(setIsLoadingAC("loading"))
    packsAPI.updatePack(id, name)
        .then(res => {
            dispatch(getPacksTC() as any)
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
type ActionTypes = ReturnType<typeof setPacksAC> | ReturnType<typeof setErrorAC> | ReturnType<typeof setIsLoadingAC>
type InitialStateType = {
    isLoading: IsLoadingValuesType
    error: string | null
    packs: Array<PackType>
}
export type IsLoadingValuesType = 'loading' | 'idle'