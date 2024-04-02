import React, { useEffect, useState, useRef } from 'react';
import update from 'immutability-helper';
import store from '../stores/store';
import FormElementsEdit from './form-dynamic-edit';
import SortableFormElements from './sortable-form-elements';
import CustomDragLayer from '../form-elements/component-drag-layer';
import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux';
import { addComponent } from '../appRedux/slices/storeSlice';
import { Button } from 'antd';
import ElementRender from '../components/PageRender/components/ElementRender';
import { updateElement } from '../appRedux/slices/elementSlice';

const { PlaceHolder } = SortableFormElements;





const Preview = ({
  onLoad,
  onPost,
  data: initialData,
  url,
  saveUrl,
  saveAlways,
  editMode,
  editElement,
  showCorrectColumn,
  files,
  renderEditForm,
  className,
  variables,
  registry,
  editModeOn,
  parent,
  manualEditModeOffProps,
  setCounter,
  counter,
  data,
  setData,
  rootId
}) => {
  const [answerData, setAnswerData] = useState({});
  const editForm = useRef(null);
  let seq = useRef(0);
const reduxDispatch = useDispatch();





  useEffect(() => {
    store.setExternalHandler(onLoad, onPost);
    setData([]);
    setAnswerData({});
    seq.current = 0;
    document.addEventListener('mousedown', editModeOff);
    return () => {
      document.removeEventListener('mousedown', editModeOff);
    };
  }, []);

  useEffect(() => {
    // store.subscribe(state => _onChange(state.data));
    // store.dispatch('load', { loadUrl: url, saveUrl, data: initialData || [], saveAlways });
  }, [url, saveUrl, saveAlways, initialData]);

  const editModeOff = (e) => {
    if (editForm.current && !editForm.current.contains(e.target)) {
      manualEditModeOff();
    }
  };

  const manualEditModeOff = () => {
    if (editElement && editElement.dirty) {
      editElement.dirty = false;
      updateElement(editElement);
    }
    manualEditModeOffProps();
  };

  const _setValue = (text) => {
    return text.replace(/[^A-Z0-9]+/ig, '_').toLowerCase();
  };

  const updateElementData=(element)=>{
    console.log("element>>>>> update",element)
    reduxDispatch(updateElement({elementConfig:element,elementId:element?.id}))

  }

  const _onChange = (newData) => {
    const updatedAnswerData = {};
    newData.forEach((item) => {
      if (item && item.readOnly && variables[item.variableKey]) {
        updatedAnswerData[item.field_name] = variables[item.variableKey];
      }
    });

    setData(newData);
    setAnswerData(updatedAnswerData);
    reduxDispatch(addComponent({tab : 1 , data:newData}))
  };

  const _onDestroy = (item) => {
    if (item.childItems) {
      item.childItems.forEach(x => {
        const child = getDataById(x);
        if (child) {
          // store.dispatch('delete', child);
        }
      });
    }
    // store.dispatch('delete', item);
  };
  

  const getDataById = (id) => {
    return data.find(x => x && x.id === id);
  };

  const swapChildren = (item, child, col) => {
    if (child.col !== undefined && item.id !== child.parentId) {
      return false;
    }
    if (!(child.col !== undefined && child.col !== col && item.childItems[col])) {
      return false;
    }
    const oldId = item.childItems[col];
    const oldItem = getDataById(oldId);
    const oldCol = child.col;
    item.childItems[oldCol] = oldId;
    oldItem.col = oldCol;
    item.childItems[col] = child.id;
    child.col = col;
    // store.dispatch('updateOrder', data);
    return true;
  };

  const setAsChild = (item, child, col, isBusy) => {
    if (swapChildren(item, child, col)) {
      return;
    }
    if (isBusy) {
      return;
    }
    const oldParent = getDataById(child.parentId);
    const oldCol = child.col;
    item.childItems[col] = child.id;
    child.col = col;
    child.parentId = item.id;
    child.parentIndex = data.indexOf(item);
    if (oldParent) {
      oldParent.childItems[oldCol] = null;
    }
    const list = data.filter(x => x && x.parentId === item.id);
    const toRemove = list.filter(x => item.childItems.indexOf(x.id) === -1);
    let newData = data;
    if (toRemove.length) {
      newData = data.filter(x => toRemove.indexOf(x) === -1);
    }
    if (!getDataById(child.id)) {
      newData.push(child);
    }
    // store.dispatch('updateOrder', newData);
  };

  const removeChild = (item, col) => {
    const oldId = item.childItems[col];
    const oldItem = getDataById(oldId);
    if (oldItem) {
      const newData = data.filter(x => x !== oldItem);
      item.childItems[col] = null;
      seq.current = seq.current > 100000 ? 0 : seq.current + 1;
      // store.dispatch('updateOrder', newData);
      setData(newData);
    }
  };

  const restoreCard = (item, id) => {
    const parent = getDataById(item.data.parentId);
    const oldItem = getDataById(id);
    if (parent && oldItem) {
      const newIndex = data.indexOf(oldItem);
      const newData = [...data];
      parent.childItems[oldItem.col] = null;
      delete oldItem.parentId;
      delete item.setAsChild;
      delete item.parentIndex;
      item.index = newIndex;
      seq.current = seq.current > 100000 ? 0 : seq.current + 1;
      // store.dispatch('updateOrder', newData);
      setData(newData);
    }
  };

  const insertCard = (item, hoverIndex, id) => {
    if (id) {
      restoreCard(item, id);
    } else {
      const newData = [...data];
      newData.splice(hoverIndex, 0, item);
      saveData(item, hoverIndex, hoverIndex);
      // store.dispatch('insertItem', item);
      // reduxDispatch(addComponent({tab : 1 , data:newData}))
    }
  };

  const moveCard = (dragIndex, hoverIndex) => {
    const dragCard = data[dragIndex];
    saveData(dragCard, dragIndex, hoverIndex);
  };

  const saveData = (dragCard, dragIndex, hoverIndex) => {
    const newData = update(data, {
      $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
    });
    setData(newData);
    // store.dispatch('updateOrder', newData);
  };

  const cardPlaceHolder = (dragIndex, hoverIndex) => {
    // Dummy
  }

  const getElement = (item, index) => {
    if (item.custom) {
      if (!item.component || typeof item.component !== 'function') {
        item.component = registry.get(item.key);
      }
    }
    const SortableFormElement = SortableFormElements[item.element];
    if (SortableFormElement === null) { 
      return null;
    }
    return <SortableFormElement id={item.id} seq={seq.current} index={index} moveCard={moveCard} insertCard={insertCard} mutable={false} parent={parent} editModeOn={editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} getDataById={getDataById} setAsChild={setAsChild} removeChild={removeChild} _onDestroy={_onDestroy} />;
  };

  const showEditForm = () => {
    const handleUpdateElement = (element) => updateElementData(element);
    const formElementEditProps = {
      showCorrectColumn,
      files,
      manualEditModeOff,
      preview: this,
      element: editElement,
      updateElement: handleUpdateElement,
    };

    return renderEditForm(formElementEditProps);
  };

  const classes = `${className}${editMode ? ' is-editing' : ''}`;
  const filteredData = data.filter(x => !!x && !x.parentId);
  const items = filteredData.map((item, index) => getElement(item, index));

  return (
    <div className={classes}>
      <div className="edit-form" ref={editForm}>
        {editElement !== null && showEditForm()}
      </div>
      
      <div className="Sortable">
        <ElementRender parent={parent} id={rootId} editModeOn={editModeOn} setData={setData}/>
      </div>
      {/* <PlaceHolder id="form-place-holder" show={items.length === 0} index={items.length} moveCard={cardPlaceHolder} insertCard={insertCard} /> */}
      <CustomDragLayer/>
 </div>
  );
};

Preview.defaultProps = {
  showCorrectColumn: false,
  files: [],
  editMode: false,
  editElement: null,
  className: 'react-form-builder-preview',
  renderEditForm: props => <FormElementsEdit {...props} />,
};

export default Preview;
