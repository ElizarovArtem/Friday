import React, {DetailedHTMLProps, InputHTMLAttributes, HTMLAttributes, useState} from "react";
import SuperInputText from "../c1-SuperInputText/SuperInputText";
import s from "./SuperEditableSpan.module.css"

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
// тип пропсов обычного спана
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperEditableSpanType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string

    spanProps?: DefaultSpanPropsType // пропсы для спана
};

const SuperEditableSpan: React.FC<SuperEditableSpanType> = (
    {
        autoFocus, // игнорировать изменение этого пропса
        onBlur,
        onEnter,
        spanProps,

        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const {children, onDoubleClick, className, ...restSpanProps} = spanProps || {};
    const [onMouseEnter, setOnMouseEnter] = useState<boolean>(false);

    const onEnterCallback = () => {
        // setEditMode(); // выключить editMode при нажатии Enter
        setEditMode(false);
        onEnter && onEnter();
    };
    const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
        // setEditMode(); // выключить editMode при нажатии за пределами инпута
        setEditMode(false);
        onBlur && onBlur(e);
    };
    const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        // setEditMode(); // включить editMode при двойном клике
        setEditMode(true);
        onDoubleClick && onDoubleClick(e);
    };

    const spanClassName = `${s.spanStyle} ${className}`;

    return (
        <>
            {editMode
                ? (
                    <div><SuperInputText
                        autoFocus // пропсу с булевым значением не обязательно указывать true
                        onBlur={onBlurCallback}
                        onEnter={onEnterCallback}
                        onMouseEnter={() => setOnMouseEnter(true)}
                        onMouseLeave={() => setOnMouseEnter(false)}

                        {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
                    />
                        <div className={onMouseEnter ? s.message : s.doubleClick}>Click outside for enter</div>
                    </div>
                ) : (
                    <div className={s.divForSpan}>
                    <span
                        onDoubleClick={onDoubleClickCallBack}
                        className={spanClassName}
                        onMouseEnter={() => setOnMouseEnter(true)}
                        onMouseLeave={() => setOnMouseEnter(false)}

                        {...restSpanProps}
                    >
                        {/*если нет захардкодженного текста для спана, то значение инпута*/}
                        {children || restProps.value}
                    </span>
                        <div className={onMouseEnter ? s.message : s.doubleClick}>DoubleClick for changes</div>
                    </div>
                )
            }
        </>
    );
}

export default SuperEditableSpan;
