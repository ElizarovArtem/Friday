import React, {useEffect} from "react";
import {Table} from "../Table/Table";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {PackType} from "./packs-api";
import { getPacksTC } from "../../store/packs-reducer";
import {IsLoadingValuesType} from "../../store/login-reducer";


export const Packs = () => {
    const packs = useSelector<AppRootStateType, Array<PackType>>(state => state.packs.packs)
    const isLoading = useSelector<AppRootStateType, IsLoadingValuesType>(state => state.packs.isLoading)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPacksTC())
    },[dispatch])

    return (
        <div>
            <h1>Packs</h1>
            {isLoading === "loading" ?
                <div style={{position: "absolute", left: "48%", top: "100px"}}>Loading...</div>
                :
                null }
            <Table packs={packs}/>
        </div>
    )
}