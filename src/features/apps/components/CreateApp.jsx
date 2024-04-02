import React, { useState } from "react";
import { Button, Modal, Form, Input, Radio } from "antd";
import { useDispatch } from "react-redux";
import { addApps } from "appRedux/slices/appsSlice";
// import "antd/dist/antd.css";

const CreateApp = (props) => {
  const { visible, setVisible, onCreate } = props;
  const [form] = Form.useForm();

  const handleCreate = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onCreate(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  return (
    <Modal
      visible={visible}
      title="Create a new app"
      okText="Ok"
      onCancel={() => {
        setVisible(false);
      }}
      onOk={handleCreate}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="App name"
          name="app_name"
          rules={[
            { required: true, message: "Please input the title of collection!" }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input type="textarea" />
        </Form.Item>

        {/* <Form.Item name="type" label="Type">
          <Radio.Group>
            <Radio value="public">Public</Radio>
            <Radio value="private">Private</Radio>
          </Radio.Group>
        </Form.Item> */}
      </Form>
    </Modal>
  );
};


export const CollectionsPage = ({ onChange }) => {
  const [visible, setVisible] = useState(false);
  const dispatch=useDispatch()

  const onCreate = (values) => {
    dispatch(addApps({
       "theme_id":"1",
        "lrf_app_type_id":"1",
        ...values})).then(()=>{

        setVisible(false);
    })
    
    console.log(values)
    // onChange(values);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        New Collection
      </Button>
      <CreateApp
        visible={visible}
        setVisible={setVisible}
        onCreate={onCreate}
      />
    </div>
  );
};


export default CollectionsPage
// render(<CollectionsPage />, document.getElementById("root"));
