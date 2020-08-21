import React, { useState } from 'react'
import StoreList from '../../../utils/stores/storelist.js'
import { useDrag } from 'react-dnd'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import './createstore.css'

let storeList = [...StoreList]

const CreateStore = () => {
    const [storeList, setStoreList] = useState(storeList);


    return <div>
            {storeList.map((store) =>(
                <div>store.storeID</div>))}
        </div>
}


export default CreateStore