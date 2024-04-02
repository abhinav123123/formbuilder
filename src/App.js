import { EditOutlined } from "@ant-design/icons";
import { Input, Modal, Tabs } from "antd";
import { usePageState } from "appRedux/hooks";
import {
  addNewPage,
  removePage,
  setActivePage,
  updatePageName,
} from "appRedux/slices/pagesSlice";
import { initialCSS } from "appRedux/slices/tailwindClassSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import DemoBar from "./demobar";
import { ReactFormBuilder } from "./formBuilder";
import AppProvider from "./provider/AppProvider";
import { AppRouter } from "./router/AppRouter";
import "./scss/application.scss";
import * as variables from "./variable";
// import store from 'appRedux/slices/store';
const url = "/api/formdata";
const saveUrl = "https://qa.lumenore.com/api/lumapps/set-component";
const { TabPane } = Tabs;

const initialItems = [
  {
    label: "Tab 1",
    children: (
      <div className="">
        <DemoBar />
        <ReactFormBuilder
          variables={variables}
          url={url}
          saveUrl={saveUrl}
          locale="en"
          saveAlways={true}
          // toolbarItems={items}
        />
      </div>
    ),
    key: "1",
  },
  {
    label: "Tab 2",
    children: (
      <div className="">
        <DemoBar />
        <ReactFormBuilder
          variables={variables}
          url={url}
          saveUrl={saveUrl}
          locale="en"
          saveAlways={true}
          // toolbarItems={items}
        />
      </div>
    ),
    key: "2",
  },
  {
    label: "Tab 3",
    children: "Content of Tab 3",
    key: "3",
    closable: false,
  },
];

const ScreenTab = () => {
  const ref = useRef();
  const screens = usePageState();
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState(initialItems[1].key);
  const [items, setItems] = useState(initialItems);
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
    // const newPanes = [...items];
    // newPanes.push({
    //   label: 'New Tab',
    //   children: 'Content of new Tab',
    //   key: newActiveKey,
    // });
    // setItems(newPanes);
    // setActiveKey(newActiveKey);
    dispatch(addNewPage({ title: newActiveKey }));
  };
  const remove = (targetKey) => {
    dispatch(removePage({ targetKey }));

    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };
  const onEdit = (targetKey, action) => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };

  useEffect(() => {
    dispatch(initialCSS());
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
              <DemoBar />
              <ReactFormBuilder
                variables={variables}
                url={url}
                saveUrl={saveUrl}
                locale="en"
                saveAlways={true}
                // toolbarItems={items}
              />
            </div>
          </TabPane>
        );
      })}
    </Tabs>
  );
};

function App() {
  return (
    <AppProvider>
      <AppRouter/>
      {/* <Layouts>
        <ScreenTab />
      </Layouts> */}
      {/* </Provider>*/}
    </AppProvider>
  );
}

export default App;
