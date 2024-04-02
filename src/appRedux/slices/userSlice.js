import { createSlice } from '@reduxjs/toolkit'
import Axios from '../../lib/Axios';
import { GET_CSS, USER_VO } from '../../constants';



export const userSlice = createSlice({
  name: 'user',
  initialState: {
   data:null,
   isLoading:true
  },
  reducers: {
  addData(state,action){
    state.data=action.payload,
    state.isLoading=false
  },
  setIsUserLoading(state,action){
    state.isLoading=false
  }

  }
})
export const {addData,setIsUserLoading}=userSlice.actions; 
export const getUser=(payload)=>(dispatch)=>{
    Axios.get(USER_VO)
    .then((_data) => {
      if(_data){
                 dispatch(addData(_data))
                }
    })
    .catch((err) => {
      dispatch(addData(null))
    });
}


export default userSlice.reducer