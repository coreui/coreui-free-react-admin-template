import React, { Component,useRef, Fragment } from 'react'
import Stores from '../../../utils/stores/storelist.js'
import { useDrag, UseDrop } from 'react-dnd'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import './createstore.css'
let stores= [...Stores]


const createStore = ({ item, index,moveItem, status}) => {
        const ref = useRef(null);
        const [, drop] = useDrop({
            accept: ITEM_TYPE,
            hover(item, monitor) {
                if(!ref.current) {
                    return;
                }
                const dragIndex = item.index;
                const hoverIndex = index;

                if(dragIndex === hoverIndex) {
                    return;
                }

                const hoveredRect = ref.current.getBoundClientRect();
                const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2;
                const mousePosition = monitor.getClientOffset();
                const hoverClientY = mousePosition.y - hoverRect.top;

                if(dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                    return;
                }

                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                    return;
                }

                moveItem(dragIndex, HoverIndex);
                item.index = hoverIndex;
            }
        })

        const [{ isDragging }, drag] = useDrag({
            item: { type: ITEM_TYPE, ...item, index },
            collect: monitor =>({
                isDragging: monitor.isDragging()
            })
        })
        const [show, setShow] = useState(false);
        const onOpen = () => setShow(true);
        const onClose = ()=> setShow(false);

        drag(drop(ref));

        return (
            <DndProvider>
            <Fragment>
                <div 
                ref={ref}
                style={{ opacity: isDragging ? 0: 1 }}
                className= {"item"}
                onClick={onOpen}
                    >
                    <div classNmae={"color-bar"} style={{ backgroundcolor: status.color}}></div>
                    <p className={"item-title"}>{ item.content }</p>
                    <p className={"item-status"}>{ item.icon }</p>
                </div>
                <window 
                    item= {item}
                    onClose={onClose}
                    show={show}
                />
            </Fragment>
            </DndProvider>
        )
}