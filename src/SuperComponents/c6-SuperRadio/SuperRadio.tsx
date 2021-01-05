import React, {ChangeEvent, InputHTMLAttributes, DetailedHTMLProps} from "react";
import s from "./SuperRadio.module.css"

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperRadioPropsType = DefaultRadioPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
}

const SuperRadio: React.FC<SuperRadioPropsType> = (
    {
        type, name,
        options, value,
        onChange, onChangeOption,
        ...restProps
    }
) => {


    const mappedOptions: any[] = options ? options.map((o, i) => {// map options with key
        const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
            // onChange, onChangeOption
            if (onChangeOption) {
                onChangeOption(o)
            }
        }

        return <label key={name + "-" + i}>
            <input
                className={s.input}
                type={"radio"}
                name={name}
                checked={value === o ? true : false}
                value={value}
                onChange={onChangeCallback}
                // name, checked, value, onChange
            />
            {o}
        </label>
    }) : [];

    return (
        <>
            {mappedOptions}
        </>
    );
}

export default SuperRadio;
