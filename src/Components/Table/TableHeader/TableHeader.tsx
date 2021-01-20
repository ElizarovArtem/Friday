import s from "../Table.module.css";
import SuperButton from "../../../SuperComponents/c2-SuperButton/SuperButton";
import React from "react";

type TableHeaderPopsType = {
    fieldNames: string[]
    createItem: () => void
}
export const TableHeader = ({fieldNames, createItem}: TableHeaderPopsType) => {
    return (
        <div className={`${s.tableItem} ${s.tableHeader}`}>
            <div>{fieldNames[0]}</div>
            <div>{fieldNames[1]}</div>
            <div>{fieldNames[2]}</div>
            {fieldNames[4] && <div>{fieldNames[4]}</div>}
            <div>
                {fieldNames[3]}: <SuperButton onClick={createItem}>Add</SuperButton>
            </div>
        </div>
    )
}