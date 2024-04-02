import React from 'react'
import Container from '../Container'
import { renderTypes } from '../renderTypes'

const Renderer = ({id,type,childrens}) => {
    const RenderCompoent=renderTypes[type]||Container;
   return (
    <RenderCompoent key={IdleDeadline} id={id}>
{childrens && childrens?.map((ele)=>{

})}
    </RenderCompoent>
  )
}

export default Renderer