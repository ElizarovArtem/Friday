import React, {useState} from "react";
import SuperInputText from "../../SuperComponents/c1-SuperInputText/SuperInputText";
import SuperButton from "../../SuperComponents/c2-SuperButton/SuperButton";
import SuperDoubleRange from "../../SuperComponents/c8-SuperDoubleRange/SuperDoubleRange";
import {useDispatch} from "react-redux";
import {getPacksTC, setSearchValueAC} from "../../store/packs-reducer";

type PropsType = {}

export const Search = (props: PropsType) => {

    const [min, setMin] = useState(0)
    const [max, setMax] = useState(100)
    const [valueSearch, setValueSearch] = useState('')

    const dispatch = useDispatch()

    const onSubmitSearch = () => {
        dispatch(setSearchValueAC(valueSearch, min, max))
        dispatch(getPacksTC())
        // or getPacksWithParamsThunk(valueSearch, min, max)
    }
    const onChangeRange = (value: number[]) => {
        setMin(value[0])
        setMax(value[1])
    }
    const onChangeText = (value: string) => {
        setValueSearch(value)
    }

    return(
        <div>
            Search
            <SuperInputText onChangeText={onChangeText} value={valueSearch}/>
            <SuperDoubleRange onChangeRange={onChangeRange} value={[min, max]}/>
            <SuperButton onClick={onSubmitSearch}>Search</SuperButton>
        </div>
    )
}