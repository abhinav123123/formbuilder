import React from 'react';
import { Form, Input, Select, Checkbox, Button, Radio, Space } from 'antd';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';

const { Option } = Select;

const PreviewRenderer = ({ formJSON }) => {
    const { pages, elements } = formJSON;
    const rowDataCustom = [
        { context: "Health", score: 10 },
        { context: "Health", score: 10 },
    ];

    // Column Definitions: Defines the columns to be displayed.
    const colDefsCustom = [
        { field: 'context', flex: 1 },
        { field: 'score', aggFunc: 'sum', flex: 1 },
        // { field: 'total' },
    ];

    let marginBottom = {
        marginBottom: "10px",
        marginTop: "10px"
    }

    const renderElement = (elementId) => {
        const element = elements?.elementObjects[elementId];
        if (!element) return null;

        switch (element.elementType) {
            case 'Container':
                return (
                    <div key={elementId} className={element.className} style={{padding : "15px"}}>
                        {element.children.map(childId => renderElement(childId))}
                    </div>
                );
            case 'Form':
                return (
                    <div key={elementId} className={element.className} style={{padding : "15px"}}>
                        {element.children.map(childId => renderElement(childId))}
                    </div>
                );
            case 'Header':
                return <h1 key={elementId} dangerouslySetInnerHTML={{__html: element.content}}/>;
            case 'Paragraph':
                return <p key={elementId}>{element.content}</p>;
            case 'TextInput':
                return (
                    <Form.Item label={element.label} key={elementId} style={marginBottom}>
                        <Input />
                    </Form.Item>
                );
            case 'EmailInput':
                return (
                    <Form.Item label={element.label} key={elementId} style={marginBottom}>
                        <Input type="email" />
                    </Form.Item>
                );
            case 'NumberInput':
                return (
                    <Form.Item label={element.label} key={elementId} style={marginBottom}>
                        <Input type="number" />
                    </Form.Item>
                )
            case 'Dropdown':
                return (
                    <Form.Item label={element.label} key={elementId} style={marginBottom}>
                        <Select>
                            {element.options.map(option => (
                                <Option key={option.key} value={option.value}>{option.text}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                );
            case 'Checkboxes':
                return (
                    <Form.Item label={element.label} key={elementId} style={marginBottom}>
                        <Checkbox.Group>
                            <Space direction={element.inline ? " "  :"vertical"}>
                                {element.options.map(option => (
                                    <Checkbox key={option.key} value={option.value}>{option.text}</Checkbox>
                                ))}
                            </Space>
                        </Checkbox.Group>
                    </Form.Item>
                );
            case 'RadioButtons':
                return (
                    <Form.Item label={element.label} key={elementId} style={marginBottom}>
                        <Radio.Group>
                            <Space  direction={element.inline ? " "  :"vertical"}>
                                {element.options.map(option => (
                                    <Radio key={option.key} value={option.value}>{option.text}</Radio>
                                ))}
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                );
            case 'CustomButton':
                return (
                    <Form.Item key={elementId} style={marginBottom}>
                        <Button className={element.className} onClick={() => handleButtonClick(elementId)}>
                            {element.content}
                        </Button>
                    </Form.Item>
                );

            case "AgGridTable":
                return (
                    <div
                        className={
                            "ag-theme-quartz"
                        }
                        style={{
                            height: '200px'
                        }}
                    >
                        <AgGridReact rowData={rowDataCustom} columnDefs={colDefsCustom} />
                    </div>
                )
            default:
                return null;
        }
    };

    const handleButtonClick = (elementId) => {
        const element = elements[elementId];
        // Handle button click action, e.g., API call or redirection
        console.log('Button clicked:', element);
    };

    const rootElementId = pages.activePage && pages.pageObjects[pages.activePage].rootElementId;

    if (!rootElementId) return null;

    const rootElement = elements?.elementObjects[rootElementId];

    if (!rootElement) return null;

    return (
        <Form layout='vertical'>
            {rootElement.children.map(childId => renderElement(childId))}
        </Form>
    );
};

export default PreviewRenderer;
