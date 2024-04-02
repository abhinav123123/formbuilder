import { createSlice } from '@reduxjs/toolkit'

export const sampleNode=({id,...extraConfig})=>({
    id,
   children:[],
   className:"",
   type:"Container",
   parentId : extraConfig?.parentId,
   elementType:extraConfig?.element||"Container",
   element:extraConfig?.element||"Container",
   ...extraConfig
})

const initialState={
    activeChild:"root",
    type:"Container",
    children:{
        
    },
    childIds:""
}

export const elementSlice = createSlice({
  name: 'elements',
  initialState: {
 
  elementObjects:{
    // "root_pgae_1":sampleNode({id:"root_pgae_1",isRoot:true})
  }
  },
  reducers: {
    initElement:(state,action)=>{
        state.elementObjects=action.payload.elementObjects;
    },
   updateElement:(state,action)=>{
    const {elementConfig,elementId}=action.payload||{};
    state.elementObjects[elementId]=elementConfig;
   },
   addElement:(state,action)=>{
     const {parentId,isRoot, elementConfig,index}=action.payload||{};
    if(parentId){
        const elementId=elementConfig.id??Date.now();
        state.elementObjects[elementId]=sampleNode({id:elementId,...elementConfig,parentId});
        const childrens=[...state.elementObjects[parentId]?.children||[]];
        // if(index && !isRoot){
        //     childrens.splice(index, 0, elementId);
        // }else{
        // }
        childrens.push(elementId)
        state.elementObjects[parentId].children=childrens;
    }else{
        if(isRoot){

            const elementId=elementConfig.id??Date.now();
            state.elementObjects[elementId]=sampleNode({id:elementId,...elementConfig,isRoot,parentId})
        }
    }
     
   },
   updateOrder:(state,action)=>{},
   removeElement:(state,action)=>{
    const {id,parentId}=action.payload;
    if(id){

        const removeChildren=(id)=>{
            const {children=[]}=state.elementObjects[id]||{}
            children?.filter(Boolean).forEach(element => {
                removeChildren(element);
                delete state.elementObjects[element]
            });
        }
        removeChildren(id)
        delete state.elementObjects[id]
        if(state.elementObjects[parentId].children){
            state.elementObjects[parentId].children=state.elementObjects[parentId].children?.filter(ele=>ele!=id);
        }

        
    }
   },
//    removeElement:(state,action)=>{},
   moveElement:(state,action)=>{
    const {
        dragIndex, hoverIndex,parentId
    }=action.payload||{};
   },

  }
})

// Action creators are generated for each case reducer function
export const {initElement,moveElement, addElement, updateElement,removeElement} = elementSlice.actions



export default elementSlice.reducer