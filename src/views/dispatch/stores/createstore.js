import React, { useState } from 'react'
import Stores from '../../../utils/stores/storelist.js'
import { useDrag } from 'react-dnd'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import './createstore.css'

import { ItemTypes } from '../../../utils/DnD/items.js'
import {
        CContainer,
        CBadge,
        CCard,
        CCardBody,
        CCardHeader,
        CCol,
        CRow,


} from '@coreui/react'
import CIcon from '@coreui/icons-react'


// // const CreateStore = () => {
// //     const [storeList, setStoreList] = useState(storeList);


// //     return <div>
// //             {Stores.map((store) =>(
// //                 <div>store.storeID</div>))}
// //         </div>
// }





const CreateStore = (props) => {
        const [{ isDragging }, drag] = useDrag({
                item: {
                        type: ItemTypes.CARD,
                        id: props.id
                },
                collect: monitor => ({
                        isDragging: !!monitor.isDragging()
                })
        });

        return (
        <div className="store-container">
        {Stores.map(store => (
                                <div 
                                       
                                        className="store-container-content"
                                        opacity={isDragging ? '0.5' : '1'}>
                                        <span
                                         ref={drag}
                                         >{store.storeID}</span>
                                </div>
                 

                ))}
        </div>


        )

}
export default CreateStore

