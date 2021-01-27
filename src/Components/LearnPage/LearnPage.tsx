import React, { useState } from 'react'
import SuperButton from '../../SuperComponents/c2-SuperButton/SuperButton';





const LearnPage = () => {
    const [checkMode, setCheckMode] = useState(false);

    const checkAnswer = () => {
        setCheckMode(true);
    }
    const checkNextCard = () => {
        setCheckMode(false);
    }


    return (
        <div>
            <div>
                <div>
                    <p>question</p>
                </div>
                <div>
                    <SuperButton onClick={checkAnswer} >check answer</SuperButton>
                </div>
            </div>
            {checkMode && 
            <div>
                <p>answer</p>
                <div>
                    <SuperButton>не знал</SuperButton>
                    <SuperButton>забыл</SuperButton>
                    <SuperButton>перепутал</SuperButton>
                    <SuperButton>долго думал</SuperButton>
                    <SuperButton>знал</SuperButton>
                </div>
                <div>
                <SuperButton onClick={checkNextCard}>След карточка</SuperButton>
                </div>
            </div>}
            

        </div>
    )
}




export default LearnPage;