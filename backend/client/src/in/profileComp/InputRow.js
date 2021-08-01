import React from 'react';
import {show_more} from "../../images/public_images.json";

const ExpandRow = ({labelClass,inputClass,imgID,labelText,name,value:{data,show},expand,inputChange,checkChange})=>{
return(
<div className="form-group row mx-auto">
    <label className={labelClass}>
        {labelText}
    </label>
    <button
        className="Profile_expand_button"
        onClick={expand}
    >
        <img
            className="Profile_expand_icon"
            id={imgID}
            src={show_more}
            alt="show_more"
        />
    </button>
    {/* <input type="checkbox"
        checked={show}
        onChange={checkChange}
        name={`${name}_checkbox`}
    /> */}
    <input
        id="Profile_phone_company"
        className={inputClass}
        value={data}
        onChange={inputChange}
        name={name}
        onFocus={expand}
    />
</div>
)
}

export {ExpandRow}

export default ({labelText,value:{data,show},name,inputChange,checkChange})=>{
return(
<div className="form-group row mx-auto">
    <label className="col-form-label col-4 Profile_info_label">
        {labelText}
    </label>
    {/* <input type="checkbox"
        className="Profile_input_checkbox"
        checked={show}
        onChange={checkChange}
        name={`${name}_checkbox`}
    /> */}
    <input
        className="Profile_input_nonfloat form-control col-7 col-md-6 col-xl-5 offset-1 offset-md-2 offset-xl-3 Profile_info_input"
        value={data}
        onChange={inputChange}
        name={name}
    />
</div>
)
}

