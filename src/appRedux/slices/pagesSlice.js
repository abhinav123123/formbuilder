import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addElement } from './elementSlice';
import { addScreenAndElements } from './moduleSlice';

const getUId = () => {
    return uuidv4()
}

const sampleNode = ({ id, ...extraConfig }) => ({
    id,
    childIds: [],
    children: {},

    className: "",
    type: "Conatiner",
    ...extraConfig
})

const initialState = {
    activeChild: "root",
    type: "Conatiner",
    children: {

    },
    childIds: ""
}

export const pagesSlice = createSlice({
    name: 'pages',

    initialState: {
        pages:[],
        pageObjects: {
          
        },
        homePage : ''
    },
    reducers: {
        initPage:(state,action)=>{
            state.pageObjects=action.payload.pageObjects;
            state.pages=action.payload.pages;
            state.activePage=action.payload.activePage;
        },
        setActivePage: (state, action) => {
        state.activePage=action.payload;
        },
        addPage:(state,action)=>{
         const {title,pageId,rootElement:rootElementId}=action.payload;
         const id=pageId||uuidv4()
         state.activePage=id;
         state.pages=[...state.pages||[],id];
         state.pageObjects[id]={title,rootElementId,id};
         if(!state.homePage){
            state.homePage=id;
         }
        },
        updateHomePage : (state,action) =>{
            const {homePage} = action.payload;
            state.homePage = homePage;
        },
        updatePageName : (state,action) =>{
          const {sId,pageName} = action.payload;
          state.pageObjects[sId].title = pageName 
          // state.pageObjects.map
        },
        removePage : (state,action)=>{
            const {targetKey} = action.payload;
            let newActiveKey;
            let lastIndex = -1;
            let PageObj = state.pageObjects;
            delete PageObj[targetKey];
            state.pages.forEach((item, i) => {
              if (item === targetKey) {
                lastIndex = i - 1;
              }
            });
            const restPages = state.pages.filter((item) => item !== targetKey);
            if (restPages.length) {
              if (lastIndex >= 0) {
                newActiveKey = restPages[lastIndex];
              } else {
                newActiveKey = restPages[0];
              }
            }
            state.pages = restPages;
            state.activePage = newActiveKey;
        }

    }
})

// Action creators are generated for each case reducer function
export const {initPage, addPage, setActivePage,updateHomePage,removePage,updatePageName } = pagesSlice.actions


export const addNewPage=(payload)=>(dispatch)=>{
    const {title}=payload||{}
    const rootElement=uuidv4();;
    const pageId=uuidv4();;
    dispatch(addPage({title,rootElement,pageId}))
    dispatch(addElement({isRoot:true, elementConfig:{id:rootElement}}))
    //elements,pageObject
    // dispatch(addScreenAndElements({
    //     elements:{[rootElement]:sampleNode({id:rootElement,isRoot:true})},
    //     pageObject:{title,rootElement,id:pageId}
    // }))
     
}



export default pagesSlice.reducer