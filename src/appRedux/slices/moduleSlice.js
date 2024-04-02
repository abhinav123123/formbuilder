import { createSlice } from '@reduxjs/toolkit'
import Axios from '../../lib/Axios';
import { GET_APPS, GET_MODULES } from '../../constants';
import { initPage } from './pagesSlice';
import { initElement } from './elementSlice';



export const moduleSlice = createSlice({
  name: 'module',
  initialState: {
    data: {

    },
    isLoading: true,
    error: null
  },
  reducers: {
    setActive: (state, action) => {
      state.activeModuleIndex = action.payload.activeModuleIndex;
    },
    initialModules(state, action) {
      const { data, error } = action.payload
      state.modules = data.modules,
        state.activeModuleIndex = data.activeModuleIndex,
        state.isLoading = false
      state.error = error;
    },
    addModule(state, action) {
      const { data } = action.payload
      state.modules.push(data)
      state.activeModuleIndex = state.modules.length-1;
    },
    addScreenAndElements: (state, action) => {
      const { elements, pageObject } = action.payload
      const ativeIndex = state.activeModuleIndex;
      const { screen_details } = state.modules[ativeIndex] || {}
      state.modules[ativeIndex].screen_details = {
        elements: {
          elementObjects: {
            ...(screen_details?.elements?.elementObjects || {}),
            ...elements
          },
        },
        pages: {
          pageObjects: [...(screen_details?.pages?.pageObjects || []), pageObject]
        }

      }
    }

  }
})
export const { addModule,initialModules, setActive, addScreenAndElements } = moduleSlice.actions;



const getResolvePageAndElement = (dispatch, module) => {
  const elements = module?.screen_details?.elements || {};
  const pagesArr = module?.screen_details?.pages?.pageObjects || [];
  const pagesState = {
    pages: [],
    activePage: 1,
    pageObjects: {

    }
  }
  pagesArr.forEach((element,) => {
    const { id = Date.now(), activePage } = element || {}
    pagesState.pageObjects[id] = element;
    pagesState.pages = [...pagesState.pages, id]
    if (activePage) {
      pagesState.activePage = id;
    }

  });
  dispatch(initPage(pagesState));
  dispatch(initElement(elements))

}


export const setActiveModule = (payload) => (dispatch, getState) => {
  const { module } = getState()
  getResolvePageAndElement(dispatch, module.modules[payload])
  dispatch(setActive({ activeModuleIndex: payload }))
}



export const getModulesAndScreens = (payload) => (dispatch, getState) => {
  console.log(getState && getState())
  return Axios.get(GET_MODULES + `?app_id=${payload?.app_id}`)
    .then((_data) => {
      if (_data) {
        if (_data && _data.length) {
          getResolvePageAndElement(dispatch, _data[0]);
        }


        dispatch(initialModules({
          data: {
            modules: _data,
            activeModuleIndex: 1
          }
        }))

      } else {
        // dispatch(addData([]))

      }
    })
    .catch((err) => {
      // dispatch(addData({ error: err?.message ?? err }))

    });
}


export default moduleSlice.reducer