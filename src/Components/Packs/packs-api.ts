import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0/",
    // baseURL: "http://localhost:7542/2.0/",
    withCredentials: true
})

export const packsAPI = {
    getPacks(packName: string, min: number, max: number, pageCount: number = 15, page: number = 1) {
        return axiosInstance
            .get<GetPacksResponseType>(`cards/pack?pageCount=${pageCount}&page=${page}&packName=${packName}&min=${min}&max=${max}`)
    },
    createPack(title: string) {
        return axiosInstance.post(`cards/pack`, {cardsPack: {name: title}})
    },
    deletePack(id: string) {
        return axiosInstance.delete(`cards/pack?id=${id}`)
    },
    updatePack(id: string, name: string) {
        return axiosInstance.put(`cards/pack`, {cardsPack: {_id: id, name}})
    },
    getCards(cardsPAckId: string, pageCount: number = 500, page: number = 1) {
        return axiosInstance
            .get<GetCardsResponseType>(`cards/card?cardsPack_id=${cardsPAckId}&pageCount=${pageCount}&page=${page}`)
    },
    createCard(reqModel: CreateCardRequestType) {
        return axiosInstance.post(`cards/card`, {card: reqModel})
    },
    deleteCard(id: string) {
        return axiosInstance.delete(`cards/card?id=${id}`)
    },
    updateCard(id: string, question: string) {
        return axiosInstance.put(`cards/card`, {card: {_id: id, question}})
    },
    updateCardGrade(id: string, grade: number) {
        return axiosInstance.put(`cards/card`, {card: {_id: id, grade}})
    },

}

export type CreateCardRequestType = {
    cardsPack_id: string
    question: string
    answer: string
}
export type PackType = {
    _id: string
    user_id: string
    name: string
    path: string
    cardsCount: number
    grade: number
    shots: number
    rating: number
    type: string
    created: string
    updated: string
    __v: number
}
export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    __v: number
    _id: string
}
type GetPacksResponseType = {
    cardPacks: Array<PackType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}
type GetCardsResponseType = {
    cards: Array<CardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}