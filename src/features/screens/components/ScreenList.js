import Loader from 'appComponents/Loader'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAppsData } from 'appRedux/hooks'
import { getApps } from 'appRedux/slices/appsSlice'
import ScreenItem from './ScreenItem'


const ScreenList = ({data}) => {
  
  return (
    <div className='grid grid-rows-4 grid-cols-12 gap-2'>
      {data?.length?data.map(ele=>{
        return <ScreenItem key={ele.app_id} {...ele}/>
      }):<div>NO Data</div>}
    </div>
  )
}

export default ScreenList