import s from "../Table.module.css";
import SuperButton from "../../../SuperComponents/c2-SuperButton/SuperButton";
import {NavLink} from "react-router-dom";
import React from "react";
import {CardType, PackType} from "../../Packs/packs-api";

type TableItemPropsType = {
    packItem?: PackType
    cardItem?: CardType
    deleteItem: (id: string) => void
    updateItem: (id: string) => void
}
export const TableItem = ({packItem, cardItem, ...props}: TableItemPropsType) => {

    return (
        <div>
            {packItem ?
                <div className={s.tableItem}>
                    <div>{packItem.name}</div>
                    <div>{packItem.cardsCount}</div>
                    <div>{packItem.updated}</div>
                    <div className={s.buttonsDiv}>
                        <SuperButton onClick={() => props.deleteItem(packItem._id)}>Delete</SuperButton>
                        <SuperButton onClick={() => props.updateItem(packItem._id)}>Update</SuperButton>
                        <NavLink to={`/cards/${packItem._id}`}>Cards</NavLink>
                        <NavLink to={`/learn`}>Learn</NavLink>
                    </div>
                </div>
            :
                <div className={s.tableItem}>
                    <div>{cardItem && cardItem.question}</div>
                    <div>{cardItem && cardItem.answer}</div>
                    <div>{cardItem && cardItem.grade}</div>
                    <div>{cardItem && cardItem.updated}</div>
                    <div className={s.buttonsDiv}>
                        <SuperButton
                            onClick={() => props.deleteItem(cardItem ? cardItem._id : '')}>Delete</SuperButton>
                        <SuperButton onClick={() => props.updateItem(cardItem ? cardItem._id : '')}>Update</SuperButton>
                    </div>
                </div>
            }
        </div>
    )
}