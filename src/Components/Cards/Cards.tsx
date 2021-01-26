import React, {useEffect} from "react";
import {Table} from "../Table/Table";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {CardType} from "../Packs/packs-api";
import {IsLoadingValuesType} from "../../store/login-reducer";
import {createCardTC, deleteCardTC, getCardsTC, updateCardTC} from "../../store/packs-reducer";
import {NavLink, useParams} from "react-router-dom";
import {TableItem} from "../Table/TableItem/TableItem";

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

    const updateCard = (cardId: string, newTitle: string, answer?: string) => {
        dispatch(updateCardTC(cardId, newTitle, id, answer))
    }
    const deleteCard = (cardId: string) => dispatch(deleteCardTC(cardId, id))
    const createCard = (question: string, answer?: string) => dispatch(createCardTC({
        cardsPack_id: id,
        question: question,
        answer: answer ? answer : ""
    }))

    return (
        <div>
            <h1>Cards</h1>
            {isLoading === "loading" ?
                <div style={{position: "absolute", left: "48%", top: "100px"}}>Loading...</div>
                :
                null }
            <Table
                createItem={createCard}
                cards={cards}
                fieldNames={["Question", "Answer", "Grade", "Add item", "Updated"]}
            >
                {cards && cards.map(p => <TableItem
                    key={p._id}
                    updateItem={updateCard}
                    deleteItem={deleteCard}
                    cardItem={p}
                    children1={<><div>{p && p.question}</div>
                        <div>{p && p.answer}</div>
                        <div>{p && p.grade}</div></>}
                />)}
            </Table>
        </div>
    )
}