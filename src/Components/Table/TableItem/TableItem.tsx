import s from "../Table.module.css";
import SuperButton from "../../../SuperComponents/c2-SuperButton/SuperButton";
import {NavLink} from "react-router-dom";
import React, {ReactNode} from "react";
import {CardType, PackType} from "../../Packs/packs-api";

type TableItemPropsType = {
    packItem?: PackType
    cardItem?: CardType
    deleteItem: (id: string) => void
    updateItem: (id: string) => void
    children1?: ReactNode
    children2?: ReactNode
}
export const TableItem = ({packItem, cardItem, ...props}: TableItemPropsType) => {

    return (
        <div>
            {packItem ?
                <div className={s.tableItem}>
                    {props.children1}
                    <div>{packItem.updated}</div>
                    <div className={s.buttonsDiv}>
                        <SuperButton onClick={() => props.deleteItem(packItem._id)}>Delete</SuperButton>
                        <SuperButton onClick={() => props.updateItem(packItem._id)}>Update</SuperButton>
                        {props.children2}
                    </div>
                </div>
            :
                <div className={s.tableItem}>
                    {props.children1}
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