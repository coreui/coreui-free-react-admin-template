import React, { Component , useState} from 'react';
import Arr from './Container/Arr'
import File from './Container/File';
import Obj from './Container/Obj'
import ObjArr from './Container/ObjArr'
const Row = ({setVal,key2,val,setKey,setTrans,setWithFile})=>{
    const valType = ['pure string','file','object','array','object array']
    const [selected,setSlc] = useState(valType[0])
    // const [add,setAdd] = useState(false)
    // const [addArr,setArr] = useState(false)
    // const [add2D, set2D] = useState([{key:'2Dkey',val:'2Dval'}])
    // const change2D = (keyWords,index)=>{
    //     return (e)=>{
    //         const fakeList = add2D
    //         fakeList[index][keyWords] = e.target.value
    //         set2D([...fakeList])
    //         onChange('D2')({D2:fakeList})
    //     }
    // }
    return(
        <li>
            <input value={key2} onChange={e=>{setKey(e.target.value)}}/>
            <select value={selected} onChange={(e)=>{
                if(e.target.value==='file') setWithFile(true)
                else if(e.target.value==='object') {
                    setVal([{key:'key',value:'val'}])
                    setTrans(input=>{
                        const output = {}
                        input.forEach(({key,value})=>{
                            output[key] = value
                        })
                        return output
                    })
                }
                else if(e.target.value==='object array'){
                    setVal([[{key:'key',value:'val'},{key:'key2',value:'val2'}]])
                    setTrans(input=>{//input=val,output=arr
                        const inTrans = x => {
                            const output = {}
                            x.forEach(({key,value})=>{
                                output[key] = value
                            })
                            return output
                        }
                        const output = []
                        input.forEach((arr)=>{
                            output.push(inTrans(arr))
                        })
                        return output
                    })
                }
                else if(e.target.value==='array'){
                    setVal(['first item'])
                }
                setSlc(e.target.value)
            }}>
                {valType.map(typ=>{
                    return <option value={typ}>{typ}</option>
                })}
            </select>
            {selected==='pure string' && 
                <input value={val} 
                    onChange={e=>setVal(e.target.value)}
                />
            }
            {selected==='file' &&
                <File setVal={setVal}/>
            }
            {selected==='object' &&
                <Obj setVal={setVal}
                    setTrans={setTrans}
                    val={val}
                />
            }
            {selected==='array' && 
                <Arr setVal={setVal}
                    val={val}
                />
            }
            {selected==='object array' && 
                <ObjArr setVal={setVal}
                    setTrans={setTrans}
                    val={val}
                />
            }
        </li>
    )
}
export default Row