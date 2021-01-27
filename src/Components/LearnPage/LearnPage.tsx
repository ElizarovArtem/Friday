import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCardsTC } from '../../store/packs-reducer';
import { AppRootStateType } from '../../store/store';
import SuperButton from '../../SuperComponents/c2-SuperButton/SuperButton';
import { packsAPI } from '../Packs/packs-api';
import style from './LearnPage.module.css'
import {CardType} from "../Packs/packs-api";

type ParamType = {
    id: string
}

const LearnPage = () => {
    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.packs.cards);
    const [checkMode, setCheckMode] = useState(false);
    const [numberNextCard, setNumberNextCard] = useState(0);
    const dispatch = useDispatch();
    const {id} = useParams<ParamType>();
    
    
    useEffect(() => {
        dispatch(getCardsTC(id))
    },[dispatch])


    const checkAnswer = () => {
        setCheckMode(true);
    }
    const checkNextCard = () => {
        numberNextCard < cards.length -1 ? setNumberNextCard(numberNextCard + 1) : setNumberNextCard(0);
        setCheckMode(false);
    }

    
    return (
        <div className={style.container}>
            <div>
                <div>
                    <p className={style.text}>{cards[numberNextCard] ? cards[numberNextCard].question: 'Have no cards'}</p>
                </div>
                <div>
                    <SuperButton onClick={checkAnswer} >check answer</SuperButton>
                </div>
            </div>
            {checkMode && 
            <div>
                <p className={style.text}>{cards[numberNextCard] ? cards[numberNextCard].answer: 'Have no cards'}</p>
                <div>
                    <SuperButton className={style.button}>не знал</SuperButton>
                    <SuperButton className={style.button}>забыл</SuperButton>
                    <SuperButton className={style.button}>перепутал</SuperButton>
                    <SuperButton className={style.button}>долго думал</SuperButton>
                    <SuperButton className={style.button}>знал</SuperButton>
                </div>
                <div>
                <SuperButton className={style.button} onClick={checkNextCard}>След карточка</SuperButton>
                </div>
            </div>}
            

        </div>
    )
}




export default LearnPage;