import React, { useState } from 'react'
import Stores from '../../../utils/stores/storelist.js'

import { useDrag } from 'react-dnd'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import './createstore.css'

import { ItemTypes } from '../../../utils/DnD/items.js'


const CreateStore = (props) => {
        let initialStores = [...Stores];
        const [stores, setStores] = React.useState(initialStores);
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
                                         key={store.storeID}
                                         >{store.storeID}</span>
                                         <div className="badge-container" >
                                                 <div><span className="badge  badge-danger" key='Loads.LoadNumber'>150</span></div>
                                                 <div><span className="badge  badge-primary">132</span></div>
                                                 <div><span className="badge"  style={{background:"yellow"}}>71</span></div>
                                                 </div>
                                </div>
                 

                ))}
        </div>


        )

}
export default CreateStore

