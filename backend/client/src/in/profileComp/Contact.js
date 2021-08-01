import React from 'react';
import ContactElement,{ExpandRow} from './InputRow'

export default ({
    email,email_checkbox,
    address,address_checkbox,
    phone_company,phone_company_checkbox,
    phone_home,phone_home_checkbox,
    mobile,mobile_checkbox,
    handleInputChange,handleCheckChange,expandElement}) => { 
const expand = (e) => {
    e.preventDefault()
    expandElement(
        "Profile_expand_phone",
        "hr4",
        "Profile_expand_icon_1",
        "2rem",
        "0rem"
    );
}
return (
<div id="Profile_more_info">
    <ContactElement
        labelText="Email:"
        value={{data:email,show:email_checkbox}}
        inputChange={handleInputChange}
        checkChange={handleCheckChange}
        name="email"
    />
    <ContactElement
        labelText="Living Address:"
        value={{data:address,show:address_checkbox}}
        inputChange={handleInputChange}
        checkChange={handleCheckChange}
        name="address"
    />
    <ExpandRow
        labelClass="col-form-label col-5 Profile_info_label"
        labelText="Phone(Office):"
        inputClass="form-control col-5 ml-auto Profile_info_input"
        value={{data:phone_company,show:phone_company_checkbox}}
        inputChange={handleInputChange}
        checkChange={handleCheckChange}
        name="phone_company"
        expand={expand}
        imgID="Profile_expand_icon_1"
    />
    
    <div id="Profile_expand_phone">
        <ContactElement
            labelText="Phone(Home):"
            value={{data:phone_home,show:phone_home_checkbox}}
            inputChange={handleInputChange}
            checkChange={handleCheckChange}
            name="phone_home"
        />
        <ContactElement
            labelText="Mobile:"
            value={{data:mobile,show:mobile_checkbox}}
            inputChange={handleInputChange}
            checkChange={handleCheckChange}
            name="mobile"
        />
    </div>
</div>
)
}