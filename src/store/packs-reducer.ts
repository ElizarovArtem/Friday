import {Dispatch} from "redux";
import {CardType, CreateCardRequestType, packsAPI, PackType} from "../Components/Packs/packs-api";

const InitialState: InitialStateType = {
    isLoading: "idle",
    error: null,
    packs: [],
    cards: []
}

export const packsReducer = (state: InitialStateType = InitialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "SET-IS-LOADING":
            return {...state, isLoading: action.isLoading}
        case "SET-ERROR":
            return {...state, error: action.error}
        case "SET-PACKS":
            return {...state, packs: action.packs}
        case "SET-CARDS":
            return {...state, cards: action.cards}
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
const setCardsAC = (cards: Array<CardType>) => {
    return {type: "SET-CARDS", cards} as const
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

export const getCardsTC = (cardsPackId: string) => (dispatch: Dispatch) => {
    dispatch(setIsLoadingAC("loading"))
    packsAPI.getCards(cardsPackId)
        .then(res => {
            dispatch(setCardsAC(res.data.cards))
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
export const createCardTC = (model: CreateCardRequestType) => (dispatch: Dispatch) => {
    dispatch(setIsLoadingAC("loading"))
    packsAPI.createCard(model)
        .then(res => {
            dispatch(getCardsTC(model.cardsPack_id) as any)
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
export const deleteCardTC = (id: string, packId: string) => (dispatch: Dispatch) => {
    dispatch(setIsLoadingAC("loading"))
    packsAPI.deleteCard(id)
        .then(res => {
            dispatch(getCardsTC(packId) as any)
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
export const updateCardTC = (id: string, question: string, packId: string) => (dispatch: Dispatch) => {
    dispatch(setIsLoadingAC("loading"))
    packsAPI.updateCard(id, question)
        .then(res => {
            dispatch(getCardsTC(packId) as any)
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
type ActionTypes =
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof setPacksAC>
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof setIsLoadingAC>
type InitialStateType = {
    isLoading: IsLoadingValuesType
    error: string | null
    packs: Array<PackType>
    cards: Array<CardType>
}
export type IsLoadingValuesType = 'loading' | 'idle'