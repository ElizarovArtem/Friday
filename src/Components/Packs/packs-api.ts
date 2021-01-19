import axios from "axios";

export const axiosInstance = axios.create({
    //baseURL: "https://neko-back.herokuapp.com/2.0/",
    baseURL: "http://localhost:7542/2.0/",
    withCredentials: true
})

export const packsAPI = {
    getPacks(pageCount: number = 500, page: number = 1) {
        return axiosInstance.get<GetPacksResponseType>(`cards/pack?pageCount=${pageCount}&page=${page}`)
    },
    createPack(title: string) {
        return axiosInstance.post(`cards/pack`, {cardsPack: {name: title}})
    },
    deletePack(id: string) {
        return axiosInstance.delete(`cards/pack?id=${id}`)
    },
    updatePack(id:string, name: string) {
        return axiosInstance.put(`cards/pack`, {cardsPack: {_id: id, name}})
    }
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

type GetPacksResponseType = {
    cardPacks: Array<PackType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}