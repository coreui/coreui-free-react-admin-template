import React from 'react';
import {remove_icon} from "../../images/public_images.json";

const OccupationTD = ({readOnly,value,onChange})=>{
return (
    <td>
        <input className="Profile_info_table_input Profile_info_input"
            readOnly={readOnly}
            value={value}
            onChange={onChange}
        />
    </td>
)
}

export default ({work,handleChange,rmOccupation,editmode}) => {
    return (
        work.map(({O,P,C,show},index)=>{
            return (
            <tr>
                <OccupationTD
                    readOnly={editmode?false:true}
                    value={O}
                    onChange={handleChange(index,"P")}
                />
                <OccupationTD
                    readOnly={editmode?false:true}
                    value={P}
                    onChange={handleChange(index,"P")}
                />
                <OccupationTD
                    readOnly={editmode?false:true}
                    value={C}
                    onChange={handleChange(index,"C")}
                />
                <td>
                    <button id="Profile_removeOccupation"
                        onClick={rmOccupation(index)}
                    >
                        <img src={remove_icon}
                            className="Profile_remove_icon"
                            alt="remove_icon"
                        />
                    </button>
                </td>
                </tr>
            )
        })
    )       
}