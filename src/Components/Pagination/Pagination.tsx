import React, {ChangeEvent, useState} from "react";
import style from './Pagination.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getPacksTC, setCurrentPageAC, setPacksOnPageAC} from "../../store/packs-reducer";
import {AppRootStateType} from "../../store/store";



export const Pagination = () => {

    const dispatch = useDispatch()
    const countItems = useSelector<AppRootStateType, number>(state => state.packs.packsOnPage)
    const currentPage = useSelector<AppRootStateType, number>(state => state.packs.currentPage)
    const totalPacksCount = useSelector<AppRootStateType, number>(state => state.packs.totalPacksCount)
    const pageTotalCount = Math.ceil(totalPacksCount / countItems)
    debugger

    const setPackOnPageNumber = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setPacksOnPageAC(Number(e.currentTarget.value)))
        dispatch(getPacksTC())
    }



    const pages = [];
    for (let i = 0; i < pageTotalCount; i++) {
        const onPageClick = () => {
            dispatch(setCurrentPageAC(i + 1))
            dispatch(getPacksTC())
        }
        if (i + 1 === 1 || i + 1 === pageTotalCount) {
            pages.push((
                <button
                    key={i + 1}
                    className={currentPage === i + 1 ? style.activeButton : ''}
                    onClick={onPageClick}
                >
                    {i + 1}
                </button>
            ));
        }
        if (i + 1 === currentPage - 3 || i + 1 === currentPage + 3) {
            pages.push(` ... `)
        } else if (i + 1 < currentPage - 3 || i + 1 > currentPage + 3 || i + 1 === 1 || i + 1 === pageTotalCount) {

        } else {
            pages.push((
                <button
                    key={i + 1}
                    className={currentPage === i + 1 ? style.activeButton : ''}
                    onClick={onPageClick}
                >
                    {i + 1}
                </button>
            ));
        }
    }

    return (
        <div className={style.wrapperContainer}>
            <select value={countItems} onChange={setPackOnPageNumber}>
                <option value={4}>4</option>
                <option value={7}>7</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
            </select>
            {pages}
        </div>
    );
};