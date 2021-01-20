import React, {useEffect} from "react";
import {Table} from "../Table/Table";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {CardType} from "../Packs/packs-api";
import {IsLoadingValuesType} from "../../store/login-reducer";
import {createCardTC, deleteCardTC, getCardsTC, updateCardTC} from "../../store/packs-reducer";
import { useParams } from "react-router-dom";

type ParamType = {
    id: string
}
export const Cards = () => {
    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.packs.cards)
    const isLoading = useSelector<AppRootStateType, IsLoadingValuesType>(state => state.packs.isLoading)
    const dispatch = useDispatch()
    const {id} = useParams<ParamType>()

    useEffect(() => {
        dispatch(getCardsTC(id))
    },[dispatch])

    const updateCard = (cardId: string) => {
        dispatch(updateCardTC(cardId, 'More difficult Question', id))
    }
    const deleteCard = (cardId: string) => dispatch(deleteCardTC(cardId, id))
    const createCard = () => dispatch(createCardTC({
        cardsPack_id: id,
        question: "Difficult Question",
        answer: "Long Answer"
    }))

    return (
        <div>
            <h1>Cards</h1>
            {isLoading === "loading" ?
                <div style={{position: "absolute", left: "48%", top: "100px"}}>Loading...</div>
                :
                null }
            <Table
                updateItem={updateCard}
                deleteItem={deleteCard}
                createItem={createCard}
                cards={cards}
                fieldNames={["Question", "Answer", "Grade", "Add item", "Updated"]}
            />
        </div>
    )
}