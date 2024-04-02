import React from 'react';
import { Form, Radio, Space } from 'antd';

const DynamicForm = ({ formData }) => {
  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  const renderFormItem = (item) => {
    const labelStyle = {
      fontSize: '12px',
      fontWeight: 'bold',
    };

    switch (item?.element) {
      case 'RadioButtons':
        return (
          <Form.Item
            key={item.id}
            label={
              <span style={labelStyle} dangerouslySetInnerHTML={{ __html: item.label }} />
            }
            name={item.field_name}
            rules={[
              {
                required: item.required,
                message: `Please select ${item.text.toLowerCase()}`,
              },
            ]}
            labelCol={{ span: 24 }} // Full width for the label
            wrapperCol={{ span: 24 }} // Full width for the wrapper (radio buttons)
          >
            <Radio.Group style={{ width: '100%' }}>
              {item.options.map((option) => (
                <Radio key={option.key} value={option.value}>
                  {option.text}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        );
      // Add cases for other form elements as needed
      default:
        return null;
    }
  };

  const renderContainer = (container) => {
    const labelStyle = {
      fontSize: '12px',
      fontWeight: 'bold',
    };

    return (
      <Form.Item
        key={container.id}
        label={<span style={labelStyle} dangerouslySetInnerHTML={{ __html: container.label }} />}
        labelCol={{ span: 24 }} // Full width for the label
        wrapperCol={{ span: 24 }} // Full width for the wrapper (container content)
      >
        <Space direction="vertical">
          {container.childItems.map((childId) =>
            renderFormItem(formData.find((item) => item.id === childId))
          )}
        </Space>
      </Form.Item>
    );
  };

  return (
    <Form onFinish={onFinish}>
      {formData.map((item) => {
        if (item.isContainer) {
          return renderContainer(item);
        } else {
        //   return renderFormItem(item);
        }
      })}
      <Form.Item wrapperCol={{ span: 24, offset: 0 }}>
        <button type="submit">Submit</button>
      </Form.Item>
    </Form>
  );
};

export default DynamicForm;
