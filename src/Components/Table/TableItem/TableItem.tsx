import s from "../Table.module.css";
import SuperButton from "../../../SuperComponents/c2-SuperButton/SuperButton";
import {NavLink} from "react-router-dom";
import React from "react";

type TableItemPropsType = {
    id: string
    name: string
    cardsCount: number
    updatedData: string
    deletePack: (id: string) => void
    updatePack: (id: string) => void
}
export const TableItem = (props: TableItemPropsType) => {
    return (
        <div className={s.tableItem}>
            <div>{props.name}</div>
            <div>{props.cardsCount}</div>
            <div>{props.updatedData}</div>
            <div className={s.buttonsDiv}>
                <SuperButton onClick={() => props.deletePack(props.id)}>Delete</SuperButton>
                <SuperButton onClick={() => props.updatePack(props.id)}>Update</SuperButton>
                <NavLink to={'/cards'}>Cards</NavLink>
            </div>
        </div>
    )
}