import React, {useEffect} from "react";
import {Table} from "../Table/Table";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {PackType} from "./packs-api";
import {createPackTC, deletePackTC, getPacksTC, updatePackTC} from "../../store/packs-reducer";
import {IsLoadingValuesType} from "../../store/login-reducer";
import {Search} from "../Search/Search";
import {Pagination} from "../Pagination/Pagination";
import {TableItem} from "../Table/TableItem/TableItem";
import {NavLink} from "react-router-dom";


export const Packs = () => {
    const packs = useSelector<AppRootStateType, Array<PackType>>(state => state.packs.packs)
    const isLoading = useSelector<AppRootStateType, IsLoadingValuesType>(state => state.packs.isLoading)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPacksTC())
    }, [dispatch])

    const createPack = () => dispatch(createPackTC("NEW fkn PACK"))
    const deletePack = (id: string) => dispatch(deletePackTC(id))
    const updatePack = (id: string) => dispatch(updatePackTC(id, 'UPDATED fkn UPDATED'))


    return (
        <div>
            <h1>Packs</h1>
            {isLoading === "loading" ?
                <div style={{position: "absolute", left: "48%", top: "100px"}}>Loading...</div>
                :
                null}
            <Search/>
            <Table
                createItem={createPack}
                packs={packs}
                fieldNames={["Name", "CardsCount", "Updated", "Add pack"]}
            >
                {packs && packs.map(p => <TableItem
                    key={p._id}
                    updateItem={updatePack}
                    deleteItem={deletePack}
                    packItem={p}
                    children1={<>
                        <div>{p.name}</div>
                        <div>{p.cardsCount}</div>
                    </>}
                    children2={<NavLink to={`/cards/${p._id}`}>Cards</NavLink>}
                />)}
            </Table>
            <Pagination/>
        </div>
    )
}