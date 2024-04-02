import { createSlice } from '@reduxjs/toolkit'
import Axios from '../../lib/Axios';
import { GET_CSS } from '../../constants';



export const tailwindCSS = createSlice({
  name: 'tailwindCSS',
  initialState: {
   data:[]
  },
  reducers: {
  addData(state,action){
    state.data=action.payload
  }

  }
})
const {addData}=tailwindCSS.actions; 
export const initialCSS=(payload)=>(dispatch)=>{
    Axios.get(GET_CSS)
    .then((_data) => {
      if(_data && _data.length){
         const resolveData=[];
          const resolveConfig=([key,value])=>{
              if(Array.isArray(value)){
                value.forEach((ele)=>{
                  resolveConfig([ele,ele])
                })
              }else if(typeof value==='object'){
                  Object.entries(value).forEach(resolveConfig)
              }else if(typeof value==='string'){
                  resolveData.push({label:value,value:value});
              }
          }
          const config=_data[0].configuration||{}
          Object.entries(config).forEach(resolveConfig)
          console.log("resolveData",resolveData )
          const extraClassess=[
            {label:'flex',value:'flex'}
          ]
          resolveData.push(...extraClassess)
          dispatch(addData(resolveData))
          
      }
    })
    .catch((err) => {});
}


export default tailwindCSS.reducer