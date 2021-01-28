import s from "../Table.module.css";
import SuperButton from "../../../SuperComponents/c2-SuperButton/SuperButton";
import React, {ReactNode, useState} from "react";
import {CardType, PackType} from "../../Packs/packs-api";
import {Modal} from "../../Modals/Modal";

type TableItemPropsType = {
    packItem?: PackType
    cardItem?: CardType
    deleteItem: (id: string) => void
    updateItem: (id: string, newTitle: string, answer?: string) => void
    children1?: ReactNode
    children2?: ReactNode
}
export const TableItem = ({packItem, cardItem, ...props}: TableItemPropsType) => {
    let [displayDeleteModal, setDisplayDeleteModal] = useState(false)
    let [displayUpdateModal, setDisplayUpdateModal] = useState(false)
    let [value1, setValue1] = useState("")
    let [value2, setValue2] = useState("")
    const item = packItem ? packItem : cardItem

    const deleteItem = () => {
        props.deleteItem(item ? item._id : "")
        setDisplayDeleteModal(false)
    }
    const updateItem = () => {
        props.updateItem(item ? item._id : "", value1, cardItem && value2)
        setDisplayUpdateModal(false)
        setValue1("")
        if (value2 !== "") setValue2("")
    }

    return (
        <div>
            {packItem ?
                <div className={s.tableItem}>
                    {props.children1}
                    <div>{packItem.updated}</div>
                    <div className={s.buttonsDiv}>
                        <SuperButton onClick={() => setDisplayDeleteModal(true)}>Delete</SuperButton>
                        <SuperButton onClick={() => setDisplayUpdateModal(true)}>Update</SuperButton>
                        {props.children2}
                    </div>
                </div>
                :
                <div className={s.tableItem}>
                    {props.children1}
                    <div>{cardItem && cardItem.updated}</div>
                    <div className={s.buttonsDiv}>
                        <SuperButton
                            onClick={() => setDisplayDeleteModal(true)}>Delete</SuperButton>
                        <SuperButton onClick={() => setDisplayUpdateModal(true)}>Update</SuperButton>
                    </div>
                </div>
            }
            {displayDeleteModal && <Modal bgOnClick={() => setDisplayDeleteModal(false)} title={"Are you shore"} width={500} height={200} backgroundDiv={true}>
                <div style={{display: "flex", justifyContent: "space-around"}}>
                    <SuperButton onClick={deleteItem}>Yes</SuperButton>
                    <SuperButton onClick={() => setDisplayDeleteModal(false)}>No</SuperButton>
                </div>
            </Modal>}
            {displayUpdateModal && <Modal bgOnClick={() => setDisplayUpdateModal(false)} title={"Enter updating title"} width={500} height={200} backgroundDiv={true}>
                <input
                    type="text"
                    value={value1}
                    onChange={(e) => setValue1(e.currentTarget.value)}
                />
                {
                    item === cardItem &&
                    <input
                        type="text"
                        value={value2}
                        onChange={(e) => setValue2(e.currentTarget.value)}/>
                }
                <div style={{display: "flex", justifyContent: "space-around", marginTop: "20px"}}>
                    <SuperButton onClick={updateItem}>Submit</SuperButton>
                    <SuperButton onClick={() => setDisplayUpdateModal(false)}>Cancel</SuperButton>
                </div>
            </Modal>}
        </div>
    )
}