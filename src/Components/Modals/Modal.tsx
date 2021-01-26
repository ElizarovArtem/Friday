import React from "react";
import s from './Modal.module.css'


type ModalPropsType = {
    title: string
    width: number
    height: number
    backgroundDiv: boolean
}
export const Modal: React.FC<ModalPropsType> = (props) => {

    const modalStyles = {
        top: `calc(50vh - ${props.height / 2}px)`,
        left: `calc(50vw - ${props.width / 2}px)`,
        width: props.width,
        height: props.height
    } as const

    return (
        <>
            {props.backgroundDiv && <div className={s.backgroundDiv}></div>}
            <div className={s.modalWindow} style={modalStyles}>
                <h3>{props.title}</h3>
                <div className={s.buttonsStyle}>{props.children}</div>
            </div>
        </>
    )
}