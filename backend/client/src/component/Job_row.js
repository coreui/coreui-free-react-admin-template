import React from 'react';

const Job_row = (props) =>{
    console.log(props.CPO)
    let company = props.CPO.Company;
    let position = props.CPO.Position;
    let occupation = props.CPO.Occupation;
    return(
        <tr>
            <td><input value={company} disabled></input></td>
            <td><input value={position} disabled></input></td>
            <td><input value={occupation} disabled></input></td>
        </tr>
    )
} 
export default Job_row;