import React from 'react';
import DiplomaElement, { ExpandRow } from './InputRow';

export default ({
    major,major_checkbox,
    double_major,double_major_checkbox,
    minor,minor_checkbox,
    master,master_checkbox,
    doctor,doctor_checkbox,
    handleInputChange,
    handleCheckChange,
    expandElement
}) => { 
const expand = (e) => {
    e.preventDefault();
    expandElement(
        "Profile_expand_diploma",
        "hr41",
        "Profile_expand_icon_3",
        "1rem",
        "1rem"
    );
}
return (
<div id="Profile_diploma_container">
    <ExpandRow
        labelClass="col-form-label col-4 Profile_info_label"
        inputClass="form-control col-5 ml-auto offset-1 Profile_info_input"
        labelText="Bachelor Major:"
        value={{data:major,show:major_checkbox}}
        inputChange={handleInputChange}
        checkChange={handleCheckChange}
        name="major"
        expand={expand}
        imgID="Profile_expand_icon_3"
    />
    <div id="Profile_expand_diploma">
        <DiplomaElement
            labelText="Double:"
            value={{data:double_major,show:double_major_checkbox}}
            inputChange={handleInputChange}
            checkChange={handleCheckChange}
            name="double_major"
        />
        <DiplomaElement
            labelText="Minor:"
            value={{data:minor,show:minor_checkbox}}
            inputChange={handleInputChange}
            checkChange={handleCheckChange}
            name="minor"
        />
        <DiplomaElement
            labelText="Master:"
            value={{data:master,show:master_checkbox}}
            inputChange={handleInputChange}
            checkChange={handleCheckChange}
            name="master"
        />
        <DiplomaElement
            labelText="Doctor:"
            value={{data:doctor,show:doctor_checkbox}}
            inputChange={handleInputChange}
            checkChange={handleCheckChange}
            name="doctor"
        />
    </div>
</div>
)
}