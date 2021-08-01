import React from 'react';
import InfoElement from './InputRow'
// import data from "../../images/public_images.json";
export default ({
    realname,realname_checkbox,
    nickname,nickname_checkbox,
    shortintro,
    handleInputChange,handleCheckChange}) => { 
return (
<div id="Profile_info">
    <div id="Profile_name" className="mb-4">
        <InfoElement
            labelText="Realname:"
            value={{data:realname,show:realname_checkbox}}
            inputChange={handleInputChange}
            checkChange={handleCheckChange}
            name="realname"
        />
        <InfoElement
            labelText="Nickname:"
            value={{data:nickname,show:nickname_checkbox}}
            inputChange={handleInputChange}
            checkChange={handleCheckChange}
            name="nickname"
        />
    </div>
    <div>
        <p className="Profile_info_label">Talk about yourself:</p>
        <textarea
            id="Profile_shortintro"
            name="shortintro"
            placeholder="briefly introduce yourself!"
            value={shortintro}
            onChange={handleInputChange}
        />
    </div>
</div>
)
}