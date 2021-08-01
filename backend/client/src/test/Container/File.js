import React, { Component , useState} from 'react';

const File = ({setVal})=>{
    const [filename,setFilename] = useState('filename')
    return (
    <>
        <label>{filename}</label>
        <input type='file' onChange={e=>{
            setVal(e.target.files[0])
            setFilename(e.target.files[0].name)
        }}/>
    </>
    )
}

export default File