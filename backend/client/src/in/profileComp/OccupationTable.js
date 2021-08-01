import React from 'react';
import {add_icon} from "../../images/public_images.json";
import Occupation from './Occupation'

export default ({addOcp,work,handleWorkChange,rmOccupation,editmode})=>{
return (
<table
    className="table table-responsive col-12"
>
    <thead>
    <tr style={{ borderBottom: "2px white solid" }}>
        <th>Occupation</th>
        <th>Position</th>
        <th>Company</th>
        <th>
        <button
            onClick={addOcp}
            id="Profile_addOccupation"
        >
            <img
            src={add_icon}
            alt="add_icon"
            className="Profile_remove_icon"
            />
        </button>
        </th>
    </tr>
    <Occupation
        work={work}
        handleChange={handleWorkChange}
        rmOccupation={rmOccupation}
        editmode={editmode}
    />
    </thead>
</table>
)}