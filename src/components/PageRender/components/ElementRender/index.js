import React from 'react'
import { DropContainer, renderTypes } from '../../../renderTypes';
import { useElementSelector } from '../../../../appRedux/hooks';
import FormElements from '../../../../packages/sortable-form-elements';
import { addElement, removeElement, updateElement } from '../../../../appRedux/slices/elementSlice';
import { useDispatch, useSelector } from 'react-redux';
import update from 'immutability-helper';

const ElementRender = ({ parent, index = 0, parentId, id, editModeOn , setData }) => {
    const item = useElementSelector(id) || {}
    const reduxState = useSelector(state => state)
    const dispatch = useDispatch()
    const { type, elementType, children, isRoot, ...elementConfig } = item || {}
    const SortableFormElement = FormElements[elementType];
    if (!SortableFormElement) {
        return null;
    }
    const moveCard = (dragIndex, hoverIndex) => {

        // dispatch(updateElement({ hoverIndex, dragIndex, item, id }));
        // const dragCard = reduxState.elements.elementObjects[dragIndex || 1];
        // saveData(dragCard, dragIndex, hoverIndex);
        console.log("moveCard",parentId,reduxState,SortableFormElement, item, hoverIndex, dragIndex, id)
    }


    const saveData = (dragCard, dragIndex, hoverIndex) => {
        const newData = update(reduxState.elements.elementObjects, {
            $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        });
        setData(newData);   
        // store.dispatch('updateOrder', newData);
    };


    const insertCard = (item, hoverIndex, dragIndex, id) => {
        console.log("insertCard", item, hoverIndex, dragIndex, id)
        if (id) {
            dispatch(addElement({ parentId: id, isRoot, elementConfig: item, index: hoverIndex }))
        } else {
            dispatch(addElement({ parentId: id, isRoot, elementConfig: item, index: hoverIndex }))
        }
    }
    const getDataById = (...args) => {
        console.log("getDataById", ...args)
    }
    const setAsChild = (...args) => {
        console.log("setAsChild", ...args)
    }
    const removeChild = (...args) => {
        console.log("removeChild", ...args)
    }
    const _onDestroy = (_item) => {
        console.log(_item)
        dispatch(removeElement({ id: _item.id, parentId: _item?.parentId }))
    }


    return <SortableFormElement  id={item.id} index={index} moveCard={moveCard} insertCard={insertCard} mutable={false} 
         {...elementConfig}
         parent={parent}
         editModeOn={editModeOn}
         isDraggable={true}
         key={item.id} sortData={item.id}
        data={JSON.parse(JSON.stringify(item))}
        getDataById={getDataById} 
        setAsChild={setAsChild} 
        removeChild={removeChild} 
        _onDestroy={_onDestroy}
        >
            {
                 children?.length && children?.map((ele,itemIndex) => {
                     return <ElementRender parent={parent} editModeOn={editModeOn} key={ele} id={ele} index={itemIndex} parentId={isRoot?null:id} parentIndex={index}/>
                 }) || "Drop Here"
             }
        </SortableFormElement>;

    // return (<>

    //     <RenderCompoent key={id} id={id} {...elementConfig} type={type}>
    //         {
    //             children?.length && children?.map(ele => {
    //                 return <ElementRender key={ele} id={ele} />
    //             }) || "Drop Here"
    //         }
    //     </RenderCompoent>
    // </>
    // )
}

export default ElementRender