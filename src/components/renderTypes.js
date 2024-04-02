import React from 'react'
import { Button } from "antd";
import Container, { withDrop } from "./Container";
import { ElementTypes } from "./Container/Constants";
import Text from "./Container/Text";

const FlexComponent = React.forwardRef(({ className, children, ...props }, ref) => {
    return <div ref={ref} className={`flex flex-1 ${className}`}>
        {children}
    </div>
})
export const DropContainer = withDrop(React.forwardRef(({ className, children, ...props }, ref) => {
    return <div ref={ref} className={`flex-1 ${className}`}>
        {children}
    </div>
}))


export const renderTypes = {
    [ElementTypes.CONTAINER]: DropContainer,
    [ElementTypes.TEXT]: Text,
    [ElementTypes.FLEX]: withDrop(FlexComponent),
    [ElementTypes.BUTTON]: props => <Button title="Click me" type="dashed" {...props}>Click Me</Button>,
    "ITEM": Container
}