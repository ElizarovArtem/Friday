import React from "react";
import SuperInputText from "../../SuperComponents/c1-SuperInputText/SuperInputText";
import SuperButton from "../../SuperComponents/c2-SuperButton/SuperButton";
import SuperRadio from "../../SuperComponents/c6-SuperRadio/SuperRadio";
import SuperSelect from "../../SuperComponents/c5-SuperSelect/SuperSelect";
import SuperCheckbox from "../../SuperComponents/c3-SuperCheckbox/SuperCheckbox";
import SuperEditableSpan from "../../SuperComponents/c4-SuperEditableSpan/SuperEditableSpan";
import SuperRange from "../../SuperComponents/c7-SuperRange/SuperRange";


export const Test = () => {
    return (
        <div>
            <h1>Test</h1>
            <div>
                <div style={{marginBottom: "20px"}}><SuperInputText/></div>
                <div style={{marginBottom: "20px"}}><SuperButton>Submit</SuperButton></div>
                <div style={{marginBottom: "20px"}}><SuperRadio/></div>
                <div style={{marginBottom: "20px"}}><SuperSelect/></div>
                <div style={{marginBottom: "20px"}}><SuperCheckbox/></div>
                <div style={{marginBottom: "20px"}}><SuperEditableSpan value={"Editable span"}/></div>
                <div style={{marginBottom: "20px"}}><SuperRange/></div>
            </div>
        </div>
    )
}