import { createSlice } from '@reduxjs/toolkit'
import Axios from '../../lib/Axios';
import { ADD_APPS, GET_APPS, GET_CSS } from '../../constants';



export const appsSlice = createSlice({
  name: 'appsSlice',
  initialState: {
   data:[],
   isLoading:true,
   error:null
  },
  reducers: {
  addData(state,action){
    const {data,error}=action.payload
    if(data){

      state.data=data
    }
    if(error){

      state.error=error;
      
    }
    state.isLoading=false
  }

  }
})
const {addData}=appsSlice.actions; 
export const getApps=(payload)=>(dispatch)=>{
    Axios.get(GET_APPS)
    .then((_data) => {
      if(_data){
         
         
          dispatch(addData({data:_data}))
          
      }else{
        dispatch(addData([]))
          
      }
    })
    .catch((err) => {
      dispatch(addData({error:err?.message??err}))
    });
}

export const addApps=(payload)=>async(dispatch)=>{
 return Axios.post(ADD_APPS,{data:payload})
  .then((_data) => {
    if(_data){
     return  dispatch(getApps())
        
    }else{
     return dispatch(getApps())
    }
  })
  .catch((err) => {
    dispatch(addData({error:err?.message??err}))
  });
}


export default appsSlice.reducer