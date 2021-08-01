import React from 'react';
import data from "../../images/public_images.json";
export default ({onClick}) => { 
    return (
        <div id="hr0" className="ml-1 mt-2 d-flex justify-content-between">
          <p className="Profile_main_title">Profile Setting</p>
          <button
            className="btn Profile_edit_btn pl-0"
            onClick={onClick}
          >
            <img src={data.edit} className="img-fluid Profile_edit_icon" />
            <p className="d-none d-sm-inline">Edit</p>
          </button>
        </div>
    )
}