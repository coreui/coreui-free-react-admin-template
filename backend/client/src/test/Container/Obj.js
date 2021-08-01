import React, { Component , useState} from 'react';

export default ({val,setVal,setTrans})=>{
    const handleChange = (keyWord,index) => {
        return (e)=>{
            const fakeList = val
            fakeList[index][keyWord] = e.target.value
            setVal([...fakeList])
        }
    }
    // {// setVal([{key:'key',value:'val'}])
    // setTrans(input=>{//input=val
    //     const output = {}
    //     input.forEach(({key,value})=>{
    //         output[key] = value
    //     })
    //     return output
    // })
    // }
    return (
        <>
        <button onClick={e=>{setVal([...val,{key:`key${val.length+1}`,value:`val${val.length+1}`}])}}>add key/val pair</button>
        <ul>
            {(val).map(({key,value},index)=>{
            return <li>
                <input value={key} onChange={handleChange('key',index)}/>
                <input value={value} onChange={handleChange('value',index)}/>
            </li>
            })}
        </ul>
    </>
    )
}