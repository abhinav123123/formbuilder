import React from 'react'
import { usePageSelector, usePageState } from '../../appRedux/pagesSlice'
import ElementRender from './components/ElementRender';
import { useElementSelector, useElementState } from '../../appRedux/elementSlice';

const PageRender = () => {
    const pageState = usePageState()
    const activePage = pageState.activePage;
    const pageConfig = usePageSelector(activePage)
    return (
        <div className='h-full w-full border border-solid'>
            <ElementRender id={pageConfig?.rootElementId} />
        </div>
    )
}

export default PageRender