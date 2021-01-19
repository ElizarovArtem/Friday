import React, {ChangeEvent} from "react";
import {Slider} from "@material-ui/core";

type SuperDoubleRangePropsType = {
    onChangeRange: (value:  number[]) => void
    value:  number[]
    // min, max, step, disable, ...
}

const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = (
    {
        onChangeRange, value,
        // min, max, step, disable, ...
    }
) => {
    // сделать самому, можно подключать библиотеки
    let onChangeCallback = (e: ChangeEvent<{}>, val: number | number []) => {


        onChangeRange([...(val as number[])])
    }

    return (
        <>
            DoubleRange

            <div style={{width: "300px", margin: "0 auto"}}>
                <Slider
                    value={value}
                    onChange={onChangeCallback}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                />
            </div>
        </>
    );
}

export default SuperDoubleRange;
