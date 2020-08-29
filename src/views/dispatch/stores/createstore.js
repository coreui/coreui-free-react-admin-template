import React, { useState } from 'react'
import Stores from '../../../utils/stores/storelist.js'
import DryLoadCount from '../../../utils/loads/DryLoadCount.js'
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
                                <div className="store-container-content"
                                        opacity={isDragging ? '0.5' : '1'}>
                                        <span id="store-number"
                                         ref={drag}
                                         >{store.storeID}</span>
                                         <div className="badge-container">
                                                 <div><span class="badge  badge-danger">150</span></div>
                                                 <div><span class="badge  badge-primary">132</span></div>
                                                 <div><span class="badge"  style={{background:"yellow"}}>71</span></div>
                                                 </div>
                                </div>
                 

                ))}
        </div>


        )

}
export default CreateStore

