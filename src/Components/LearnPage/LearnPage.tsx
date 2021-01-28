import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {getCardsTC, updateCardGradeTC} from '../../store/packs-reducer';
import { AppRootStateType } from '../../store/store';
import SuperButton from '../../SuperComponents/c2-SuperButton/SuperButton';
import { packsAPI } from '../Packs/packs-api';
import style from './LearnPage.module.css'
import {CardType} from "../Packs/packs-api";
import {Modal} from "../Modals/Modal";

type ParamType = {
    id: string
}

const LearnPage = () => {
    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.packs.cards);
    const [checkMode, setCheckMode] = useState(false);
    const [numberCurrentCard, setNumberCurrentCard] = useState(0);
    const dispatch = useDispatch();
    const {id} = useParams<ParamType>();


    useEffect(() => {
        dispatch(getCardsTC(id))
    },[dispatch])


    const checkAnswer = () => {
        setCheckMode(true);
    }
    const checkNextCard = () => {
        setNumberCurrentCard(sortCards(cards)) ;
        //numberCurrentCard < cards.length -1 ? setNumberCurrentCard(numberCurrentCard + 1) : setNumberCurrentCard(0);
        setCheckMode(false);
    }

    const addGrade = (grade: number) => {
        dispatch(updateCardGradeTC(cards[numberCurrentCard]._id, grade))
    }

    const sortCards = (cardsPack: CardType[]) => {
        let gradeArr = cardsPack.map((card, index) => {
            return {index, grade: card.grade ,chance: card.grade !==0 ? (5 - card.grade * Math.random()): 4}
        });
        let currentInd = 0;
        let maxVal = 0;
        gradeArr.forEach((el, index) => {
            if( maxVal < el.chance) {
                currentInd = el.index;
                maxVal = el.chance
            };
        })
       return currentInd
    }

    const show = useSelector<AppRootStateType, boolean>(state => state.packs.showSuccessModal)

    let top: number;
    if(show) {
        top = 100
    }else{
        top = -100
    }

    return (
        <div className={style.container}>
            <div>
                <div>
                    <p className={style.text}>{cards[numberCurrentCard] ? cards[numberCurrentCard].question: 'Have no cards'}</p>
                </div>
                <div>
                    <SuperButton onClick={checkAnswer} >check answer</SuperButton>
                </div>
            </div>
            {checkMode &&
            <div>
                <p className={style.text}>{cards[numberCurrentCard] ? cards[numberCurrentCard].answer: 'Have no cards'}</p>
                <div>
                    <SuperButton onClick={() => {addGrade(1)}} className={style.button}>не знал</SuperButton>
                    <SuperButton onClick={() => {addGrade(2)}} className={style.button}>забыл</SuperButton>
                    <SuperButton onClick={() => {addGrade(3)}} className={style.button}>перепутал</SuperButton>
                    <SuperButton onClick={() => {addGrade(4)}} className={style.button}>долго думал</SuperButton>
                    <SuperButton onClick={() => {addGrade(5)}} className={style.button}>знал</SuperButton>
                </div>
                <div>
                <SuperButton className={style.button} onClick={checkNextCard}>След карточка</SuperButton>
                </div>
            </div>}
            <Modal title={"Success"} width={100} height={50} backgroundDiv={false} bgOnClick={() => {}}
                   CSSStyles={{
                       top: top+"px",
                       backgroundColor: "lightgreen"
                   }}
            />
        </div>
    )
}




export default LearnPage;