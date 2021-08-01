import React, { Component , useState} from 'react';
import axios from 'axios'
import Row from './Row';

const handleFile = async (url,states)=>{
    const data = new FormData()
    states.forEach(({key,val,transformer})=>{
        data.append(key,transformer(val))
    })
    console.log(data)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    return await axios.post(url,data,config)
}
const handleSubmit = async (url,states)=>{
    const data = {}
    states.forEach(({key,val,transformer})=>{
        data[key] = transformer(val)
    })
    console.log(data,states)
    return await axios.post(url,data)
}

const Test = ()=>{
    const [url,setUrl] = useState('testRoute')
    const [states,setStates] = useState([{key:"KEY",val:"VAL",transformer:(x)=>x}])
    const [withFile,setWithFile] = useState(false)
    return(
        <div style={{'backgroundColor':'#BBB'}}>
            <div name='toSend'>
                <label>/api/</label>
                <input value={url} onChange={(e)=>{setUrl(e.target.value)}}/>
                <button onClick={async (e)=>{
                    let res;
                    if(withFile) res = await handleFile(`/api/${url}`,states)
                    else res = await handleSubmit(`/api/${url}`,states)
                    console.log(res)
                }}>submit</button>
            </div>
            <button onClick={(e)=>{setStates([...states,{key:`key${states.length+1}`,val:`val${states.length+1}`,transformer:x=>x}])}}>addItem</button>
            <ul>
                {states.map(({key,val},index)=>{
                    return (
                        <Row setVal={(val)=>{
                                const fakeList = states
                                fakeList[index].val = val
                                setStates([...fakeList])
                            }}
                            setKey={(key)=>{
                                const fakeList = states
                                fakeList[index].key = key
                                setStates([...fakeList])
                            }}
                            setTrans={(trans)=>{
                                const fakeList = states
                                fakeList[index].transformer = trans
                                setStates([...fakeList])
                            }}
                            setWithFile={setWithFile}
                            key2={key}
                            val={val}
                        />
                    )
                })}
            </ul>
        </div>
    )
}
export default Test