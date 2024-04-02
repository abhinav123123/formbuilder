import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './Constants';
import { useDispatch } from 'react-redux';
// import { addElement } from '../../appRedux/elementSlice';
import { MdAddBox } from "react-icons/md";


export default function Container({ type, children, id, ...restItem } = {}) {
    const dispatch = useDispatch()
    const [{ opacity ,isDragging}, dragRef] = useDrag({
        type: type || ItemTypes.ITEM,
        item: { type, ...restItem },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0 : 1,
            isDragging: monitor.isDragging(),
        })

    },
        []
    )
        return (
        <div ref={dragRef} style={{ opacity, ...(isDragging?{cursor:'grab'}:{cursor:'grab'}) }}>
            {children || "Drop" + id}
        </div>

    )
}


export const withDrop = (WrapComponent) => {
    return ({ type, id, ...props } = {}) => {
        const dispatch = useDispatch()
        const [collectedProps, drop] = useDrop({
            accept: [ItemTypes.ITEM, ItemTypes.CONTAINER],
            drop: (item, monitor) => {
                const didDropOnContainer = monitor.didDrop();
                if (!didDropOnContainer) {
                    // dispatch(addElement({ id, elementConfig: item }));
                }
            },
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }),
        })
        return (
            <WrapComponent  {...props}
                className={`p-3  cursor-pointer ${collectedProps.isOver ? 'border border-slate-600 border-dashed rounded-md h-auto' : "h-auto border border-slate-200 border-dashed rounded-md"} `} ref={_ref => {
                    drop(_ref);
                    // dragRef(_ref)
                }} />

        )
    }


}