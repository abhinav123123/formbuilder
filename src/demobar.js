import { Switch, message } from 'antd';
import { updateHomePage } from 'appRedux/slices/pagesSlice';
import PreviewRenderer from 'components/PreviewRenderer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { APP_BUILDER_ADD_SCREEN } from './constants';
import Axios from './lib/Axios';
import store from './stores/store';

const answers = {};

const Demobar = (props) => {
  const [data, setData] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const reduxState = useSelector(state => state);
  const { pages, elements } = reduxState;
  const {homePage} = pages;
  const dispatch = useDispatch();
  useEffect(() => {
    const update = (data) => setData(data);
    store.subscribe(update);
    return () => {
      // store.unsubscribe(update);
    };
  }, []);

  const showPreview = () => {
    // saveFormData("preview");
    console.log(reduxState, "redux state in preview");
    setPreviewVisible(true);
  };


  const closePreview = () => {
    setPreviewVisible(false);
  };

  const saveFormData = () => {
    console.log("abcd", reduxState)



    Axios.post(APP_BUILDER_ADD_SCREEN, {
      data: {
        pages: {
          pageObjects: Object.entries(pages?.pageObjects).map(([key, value]) => ({ ...value, id: key }))
        }, elements,
        homePage,
        "app_id": "5874dd98-e75e-11ee-9017-ef75ed831622",
        "module_id": "5874dd98-e75e-11ee-9017-ef75ed8316224"
        // "module_id":"5874dd98-e75e-11ee-9017-ef75ed8316225"
        // "module_id":"5874dd98-e75e-11ee-9017-ef75ed8316224"
        // "module_id":"5874dd98-e75e-11ee-9017-ef75ed8316224"
      }
    }).then((res) => {
      message.success("Saved Successfully")
      console.log(res);
    }).catch(err => {
      console.log(err);

    });
  };

  let modalClass = 'modal';
  if (previewVisible) {
    modalClass += ' show d-block';
  }

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);

    dispatch(updateHomePage({homePage : reduxState.pages.activePage}))
  };

  const checkHomePagePresent = () =>{
    if(homePage){
      return false;
    }
    return true;
  }

  return (
    // <div className='row'>
    //   <div className='col-lg-12'>
        <div className="clearfix" style={{ margin: '10px', width: 'auto' }}>


          <button className="btn btn-primary float-right" disabled={checkHomePagePresent()} style={{ marginRight: '10px' }} onClick={saveFormData}>Save Form</button>
          <button className="btn btn-primary float-right" style={{ marginRight: '10px' }} onClick={showPreview}>Preview Form</button>
          <div className="float-right" style={{ marginRight: '10px' }}>
           {previewVisible &&
            <div className={modalClass} role="dialog">
              <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                  <div className='previewRender'>
                    <PreviewRenderer formJSON={reduxState} />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal" onClick={closePreview}>Close</button>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    // </div>

  );
};

export default Demobar;