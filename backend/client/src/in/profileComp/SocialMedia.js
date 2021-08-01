import React from 'react';
import SocialElement, { ExpandRow } from './InputRow'

export default ({
    facebook,facebook_checkbox,
    personal_website,personal_website_checkbox,
    Linkedin,Linkedin_checkbox,
    handleInputChange,handleCheckChange,expandElement}) => {
const expand = (e) => {
    e.preventDefault();
    expandElement(
        "Profile_expand_social_media",
        "hr2",
        "Profile_expand_icon_2",
        "2rem",
        "1rem"
    );
}
return (
<div id="Profile_social_media">
    <ExpandRow
        labelClass="col-form-label col-4 Profile_info_label"
        inputClass="form-control col-6 ml-auto Profile_info_input"
        labelText="Facebook:"
        value={{data:facebook,show:facebook_checkbox}}
        inputChange={handleInputChange}
        checkChange={handleCheckChange}
        name="facebook"
        expand={expand}
        imgID="Profile_expand_icon_2"
    />
    <div id="Profile_expand_social_media">
        <SocialElement
            labelText='Blog:'
            value={{data:personal_website,show:personal_website_checkbox}}
            inputChange={handleInputChange}
            checkChange={handleCheckChange}
            name="personal_website"
        />
        <SocialElement
            labelText='Linkedin:'
            value={{data:Linkedin,show:Linkedin_checkbox}}
            inputChange={handleInputChange}
            checkChange={handleCheckChange}
            name="Linkedin"
        />
    </div>
</div>
)
}