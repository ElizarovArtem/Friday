import React from "react";
import s from './Table.module.css'
import SuperButton from "../../SuperComponents/c2-SuperButton/SuperButton";
import {PackType} from "../Packs/packs-api";
import {useDispatch} from "react-redux";
import {createPackTC, deletePackTC, updatePackTC} from "../../store/packs-reducer";
import {TableItem} from "./TableItem/TableItem";


type TablePropsType = {
    packs: Array<PackType>
}
export const Table = (props: TablePropsType) => {
    const dispatch = useDispatch()

    const deletePack = (id: string) => {
        dispatch(deletePackTC(id))
    }
    const updatePack = (id: string) => {
        dispatch(updatePackTC(id, 'UPDATED fkn UPDATED'))
    }

    return (
        <div className={s.table}>
            <div className={`${s.tableItem} ${s.tableHeader}`}>
                <div>Name</div>
                <div>cardsCount</div>
                <div>updated</div>
                <div>
                    Add pack: <SuperButton onClick={() => dispatch(createPackTC("NEW fkn PACK"))}>Add</SuperButton>
                </div>
            </div>
            <div>
                {props.packs.map(p => <TableItem
                    updatePack={updatePack}
                    key={p._id}
                    id={p._id}
                    deletePack={deletePack}
                    name={p.name}
                    cardsCount={p.cardsCount}
                    updatedData={p.updated}
                />)}
            </div>
        </div>
    )
}

