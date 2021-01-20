import React from "react";
import s from './Table.module.css'
import {CardType, PackType} from "../Packs/packs-api";
import {TableItem} from "./TableItem/TableItem";
import {TableHeader} from "./TableHeader/TableHeader";


type TablePropsType = {
    packs?: Array<PackType>
    cards?: Array<CardType>
    fieldNames: string[]
    createItem: () => void
    deleteItem: (id: string) => void
    updateItem: (id: string) => void
}
export const Table = (props: TablePropsType) => {

    return (
        <div className={s.table}>
            <TableHeader fieldNames={props.fieldNames} createItem={props.createItem}/>
            <div>
                {props.packs && props.packs.map(p => <TableItem
                    key={p._id}
                    updateItem={props.updateItem}
                    deleteItem={props.deleteItem}
                    packItem={p}
                />)}
                {props.cards && props.cards.map(p => <TableItem
                    key={p._id}
                    updateItem={props.updateItem}
                    deleteItem={props.deleteItem}
                    cardItem={p}
                />)}

            </div>
        </div>
    )
}

