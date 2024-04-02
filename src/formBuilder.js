import React, { useState } from 'react';
import Preview from './packages/preview';
import Toolbar from './packages/toolbar';
import FormGenerator from './packages/form';
import Registry from './stores/registry';
import { usePageSelector, usePageState } from './appRedux/hooks';

const ReactFormBuilder = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [editElement, setEditElement] = useState(null);
  const [counter,setCounter] = useState(0);
  const [data, setData] = useState([]);
  const pageState = usePageState()
  const activePage = pageState.activePage;
  const pageConfig = usePageSelector(activePage)
  console.log(pageConfig)
  const editModeOn = (data, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (editMode) {
      setEditMode(false);
      setEditElement(null);
    } else {
      setEditMode(true);
      setEditElement(data);
    }
  };

  const manualEditModeOff = () => {
    if (editMode) {
      setEditMode(false);
      setEditElement(null);
    }
  };

  const toolbarProps = {
    showDescription: props.show_description,
  };

  if (props.toolbarItems) {
    toolbarProps.items = props.toolbarItems;
  }
  return (
      <div>
        <div className="react-form-builder clearfix">
          <div>
            {/* <Toolbar {...toolbarProps} customItems={props.customToolbarItems} /> */}
            <Preview
              files={props.files}
              manualEditModeOffProps={manualEditModeOff}
              showCorrectColumn={props.showCorrectColumn}
              parent={this}
              // data={props.data}
              url={props.url}
              saveUrl={props.saveUrl}
              onLoad={props.onLoad}
              onPost={props.onPost}
              editModeOn={editModeOn}
              editMode={editMode}
              variables={props.variables}
              registry={Registry}
              editElement={editElement}
              renderEditForm={props.renderEditForm}
              saveAlways={props.saveAlways}
              activeTab={props.activeTab}
              counter={counter}
              setCounter={setCounter}
              data={data}
              setData={setData}
              rootId={pageConfig?.rootElementId}
            />
          </div>
        </div>
      </div>
  );
};

const ReactFormGenerator = (props) => {
  return (
      <div className="modal-body">
        <div id="form-generator">
          <FormGenerator {...props} />
        </div>
      </div>
  );
};

export {
  ReactFormBuilder,ReactFormGenerator,Registry,
};
