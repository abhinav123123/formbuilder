import React from 'react'
import Toolbar from '../../packages/toolbar'
import { useElementSelector, usePageSelector, usePageState } from '../../appRedux/hooks';
import ElementRender from '../PageRender/components/ElementRender';
import { updateElement } from '../../appRedux/slices/elementSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useRef } from 'react';
import FormElementsEditor from '../../packages/form-dynamic-edit';

const renderEditForm= props => <FormElementsEditor {...props} />


const ItemRender=({id,getRenderElement})=>{
   const {children,...restItem}= useElementSelector(id);
    return 
}


const PageRender = (getRenderElement) => {
 
    const pageState = usePageState()
    const activePage = pageState.activePage;
    const pageConfig = usePageSelector(activePage)
   
    return 
}

export default PageRender