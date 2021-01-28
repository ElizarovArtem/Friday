import {Dispatch} from "redux";
import {CardType, CreateCardRequestType, packsAPI, PackType} from "../Components/Packs/packs-api";
import {strict} from "assert";
import {AppRootStateType} from "./store";

const InitialState: InitialStateType = {
    isLoading: "idle",
    error: null,
    packs: [],
    cards: [],
    searchValue: '',
    min: 0,
    max: 100,
    packsOnPage: 10,
    currentPage: 1,
    totalPacksCount: 0,
    showSuccessModal: false
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
        case "SET-SEARCH-VALUE":
            return {...state, searchValue: action.searchValue, min: action.min, max: action.max}
        case "SET-PACKS-ON-PAGE":
            return {...state, packsOnPage: action.value}
        case "SET-CURRENT-PAGE":
            return {...state, currentPage: action.currentPage}
        case "SET-TOTAL-PACKS":
            return {...state, totalPacksCount: action.totalPacks}
        case "SET-SHOW-SUCCESS-MODAL":
            return {...state, showSuccessModal: action.show}
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
export const setSearchValueAC = (searchValue: string, min: number, max: number) => {
    return {type: "SET-SEARCH-VALUE", searchValue, min, max} as const
}
export const setPacksOnPageAC = (value: number) => {
    return {type: "SET-PACKS-ON-PAGE", value} as const
}
export const setCurrentPageAC = (currentPage: number) => {
    return {type: "SET-CURRENT-PAGE", currentPage} as const
}
const setTotalPacksAC = (totalPacks: number) => {
    return {type: "SET-TOTAL-PACKS", totalPacks} as const
}
export const setShowSuccessModalAC = (show: boolean) => {
    return {type: "SET-SHOW-SUCCESS-MODAL", show} as const
}

// thunks
export const getPacksTC = () => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    dispatch(setIsLoadingAC("loading"))

    const state = getState()
    const searchName = state.packs.searchValue
    const min = state.packs.min
    const max = state.packs.max
    const packsOnPage = state.packs.packsOnPage
    const currentPage = state.packs.currentPage

    packsAPI.getPacks(searchName, min, max, packsOnPage, currentPage)
        .then(res => {
            dispatch(setPacksAC(res.data.cardPacks))
            dispatch(setIsLoadingAC("idle"))
            dispatch(setTotalPacksAC(res.data.cardPacksTotalCount))
        })
        .catch(err => {
            if (err.response) {
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
            dispatch(setShowSuccessModalAC(true))
            setTimeout(() => {
                dispatch(setShowSuccessModalAC(false))
            }, 2000)
        })
        .catch(err => {
            if (err.response) {
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
            if (err.response) {
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
            if (err.response) {
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
            if (err.response) {
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
            if (err.response) {
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
            if (err.response) {
                dispatch(setErrorAC(err.response.data.error))
            } else {
                dispatch(setErrorAC("Some error"))
            }
            dispatch(setIsLoadingAC("idle"))
        })
}
export const updateCardTC = (id: string, question: string, packId: string, answer?: string) => (dispatch: Dispatch) => {
    dispatch(setIsLoadingAC("loading"))
    packsAPI.updateCard(id, question, answer)
        .then(res => {
            dispatch(getCardsTC(packId) as any)
            dispatch(setIsLoadingAC("idle"))
        })
        .catch(err => {
            if (err.response) {
                dispatch(setErrorAC(err.response.data.error))
            } else {
                dispatch(setErrorAC("Some error"))
            }
            dispatch(setIsLoadingAC("idle"))
        })
}
export const updateCardGradeTC = (id: string, grade: number) => (dispatch: Dispatch) => {
    dispatch(setIsLoadingAC("loading"))
    packsAPI.updateCardGrade(id, grade)
        .then(res => {
            dispatch(setIsLoadingAC("idle"))
            dispatch(setShowSuccessModalAC(true))
            setTimeout(() => {
                dispatch(setShowSuccessModalAC(false))
            }, 2000)
        })
        .catch(err => {
            if (err.response) {
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
    | ReturnType<typeof setSearchValueAC>
    | ReturnType<typeof setPacksOnPageAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setTotalPacksAC>
    | ReturnType<typeof setShowSuccessModalAC>
type InitialStateType = {
    isLoading: IsLoadingValuesType
    error: string | null
    packs: Array<PackType>
    cards: Array<CardType>
    searchValue: string
    min: number
    max: number
    packsOnPage: number
    currentPage: number
    totalPacksCount: number
    showSuccessModal: boolean
}
export type IsLoadingValuesType = 'loading' | 'idle'