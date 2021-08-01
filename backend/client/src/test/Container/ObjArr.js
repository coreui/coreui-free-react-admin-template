import React, { Component , useState} from 'react';
import Obj from './Obj';

export default ({val,setVal,setTrans})=>{
    // setVal([[{key:'key',value:'val'},{key:'key2',value:'val2'}]])
    // setTrans(input=>{//input=val,output=arr
    //     const output = []
    //     input.forEach((arr)=>{
    //         output.push(inTrans(arr))
    //     })
    //     return output
    // })
    // const [inTrans,setInTrans] = useState(x=>x)
    // const handleChange = (keyWord,index) => {
    //     return (e)=>{
    //         const fakeList = val
    //         fakeList[index][keyWord] = e.target.value
    //         setVal([...fakeList])
    //     }
    // }
    return (
    <>
        <button onClick={e=>{setVal([...val,[{key:'key',value:'val'}]])}}>add list</button>
        <ol>
            {val.map((arr,index)=>{
                return (<li>
                    <Obj
                        val={arr}
                        setVal={subArr=>{
                            const fakeList = val
                            fakeList[index] = subArr
                            setVal(fakeList)
                        }}
                        // setTrans={setInTrans}
                    />
                    </li>
                )
            })}
        </ol>
    </>
    )
}