import { usePageState } from "appRedux/hooks";
import { useState,useEffect, useRef } from "react";
import  { useDispatch } from "react-redux";
import { Input, Modal, Tabs } from "antd";

import { addNewPage, removePage, setActivePage } from 'appRedux/slices/pagesSlice';
import DemoBar from "demobar";
import { ReactFormBuilder } from "formBuilder";
const { TabPane } = Tabs;
import { EditOutlined } from "@ant-design/icons";
import * as variables from "variable";

const url = "/api/formdata";
const saveUrl = "https://qa.lumenore.com/api/lumapps/set-component";

const ScreenTab = () => {
  const ref = useRef();
  const screens = usePageState();
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState();
  const [pageNameEdit, setPageNameEdit] = useState({
    openModal: false,
    pageName: "",
  });
  const newTabIndex = useRef(0);
  useEffect(() => {
    if (!ref.current) {
      add();
      ref.current = true;
    }
  }, []);

  const onChange = (newActiveKey) => {
    dispatch(setActivePage(newActiveKey));
  };

  const add = () => {
    const newActiveKey = `Screen ${newTabIndex.current++}`;
  
    dispatch(addNewPage({ title: newActiveKey }));
  };
  const remove = (targetKey) => {
    dispatch(removePage({ targetKey }));

  };
  const onEdit = (targetKey, action) => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };

  useEffect(() => {
    // dispatch(initialCSS());
  }, []);

  const onEditHandler = () => {
    setPageNameEdit({
      ...pageNameEdit,
      openModal: true,
    });
  };

  const handleOk = () => {
    dispatch(updatePageName({sId : screens.activePage, pageName: pageNameEdit.pageName }));
    setPageNameEdit({
      ...pageNameEdit,
      openModal: false,
    });
  };
  const handleCancel = () => {
    setPageNameEdit({
      ...pageNameEdit,
      openModal: false,
    });
  };

  const pageNameChangehandler = (e, sId) => {
    console.log('current clicked page is' , sId)
    setPageNameEdit({
      ...pageNameEdit,
      pageName: e.target.value,
    });
  };

  const getPageTitile = (sId) => {
    return screens.pageObjects[sId]?.title;
  };

  const handleTabClick = (key) => {
    // setActiveKey(key);
    console.log("Clicked tab key:", key);
  };

  return (
 
      <Tabs
      className="flex-1"
      type="editable-card"
      onChange={onChange}
      activeKey={screens?.activePage}
      onEdit={onEdit}
      onTabClick={handleTabClick}
    >
      {screens?.pages.map((sId, index) => {
        return (
          <TabPane
            key={sId}
            tab={
              <>
                {" "}
                {getPageTitile(sId)} <EditOutlined onClick={onEditHandler} />
              </>
            }
          >
            <div className="">
              <Modal
                title="Edit screen name "
                open={pageNameEdit.openModal}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <Input
                  type="text"
                  // value={screens.pageObjects[screens.activePage].title}
                  onChange={(e) => pageNameChangehandler(e, screens.activePage)}
                />
              </Modal>
              <DemoBar/>
              {/* <ReactFormBuilder
                variables={variables}
                url={url}
                saveUrl={saveUrl}
                locale="en"
                saveAlways={true}
                // toolbarItems={items}
              /> */}
            </div>
          </TabPane>
        );
      })}
    </Tabs>
  );
};

  export default ScreenTab;