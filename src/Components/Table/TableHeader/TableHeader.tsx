import s from "../Table.module.css";
import SuperButton from "../../../SuperComponents/c2-SuperButton/SuperButton";
import React, {useState} from "react";
import {Modal} from "../../Modals/Modal";

type TableHeaderPopsType = {
    fieldNames: string[]
    createItem: (title: string, answer?: string) => void
}
export const TableHeader = ({fieldNames, createItem}: TableHeaderPopsType) => {
    let [displayModal, setDisplayModal] = useState(false)
    let [value, setValue] = useState("")
    let [value2, setValue2] = useState("")

    const createHandler = () => {
        createItem(value, fieldNames[4] && value2)
        setDisplayModal(false)
        setValue("")
        if(value2 !== "") setValue2("")
    }

    return (
        <>
            <div className={`${s.tableItem} ${s.tableHeader}`}>
                <div>{fieldNames[0]}</div>
                <div>{fieldNames[1]}</div>
                <div>{fieldNames[2]}</div>
                {fieldNames[4] && <div>{fieldNames[4]}</div>}
                <div>
                    {fieldNames[3]}: <SuperButton onClick={() => setDisplayModal(true)}>Add</SuperButton>
                </div>
            </div>
            {displayModal && <Modal title={"Fill in the fields"} width={500} height={200} backgroundDiv={true}>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.currentTarget.value)}
                />
                {
                    fieldNames[4] &&
                    <input
                        type="text"
                        value={value2}
                        onChange={(e) => setValue2(e.currentTarget.value)}
                    />}
                <div style={{display: "flex", justifyContent: "space-around", marginTop: "20px"}}>
                    <SuperButton onClick={createHandler}>Submit</SuperButton>
                    <SuperButton onClick={() => setDisplayModal(false)}>Cancel</SuperButton>
                </div>
            </Modal>}
        </>
    )
}