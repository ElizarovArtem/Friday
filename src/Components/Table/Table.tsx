import React from "react";
import s from './Table.module.css'
import {CardType, PackType} from "../Packs/packs-api";
import {TableItem} from "./TableItem/TableItem";
import {TableHeader} from "./TableHeader/TableHeader";
import {NavLink} from "react-router-dom";


type TablePropsType = {
    packs?: Array<PackType>
    cards?: Array<CardType>
    fieldNames: string[]
    createItem: () => void
}
export const Table: React.FC<TablePropsType> = (props) => {

    return (
        <div className={s.table}>
            <TableHeader fieldNames={props.fieldNames} createItem={props.createItem}/>
            <div>
               {/* {props.packs && props.packs.map(p => <TableItem
                    key={p._id}
                    updateItem={props.updateItem}
                    deleteItem={props.deleteItem}
                    packItem={p}
                    children1={<> <div>{p.name}</div>
                        <div>{p.cardsCount}</div></>}
                    children2={ <NavLink to={`/cards/${p._id}`}>Cards</NavLink>}
                />)}
                {props.cards && props.cards.map(p => <TableItem
                    key={p._id}
                    updateItem={props.updateItem}
                    deleteItem={props.deleteItem}
                    cardItem={p}
                    children1={<><div>{p && p.question}</div>
                        <div>{p && p.answer}</div>
                        <div>{p && p.grade}</div></>}
                />)}*/}
                {props.children}


            </div>
        </div>
    )
}

