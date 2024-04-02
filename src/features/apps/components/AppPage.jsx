import React, { useEffect } from 'react'
import AppList from './AppList'
import { getApps } from 'appRedux/slices/appsSlice'
import { useAppsData } from 'appRedux/hooks'
import Loader from 'appComponents/Loader'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import NetworkError from 'appComponents/NetworkError'
import CreateApp from './CreateApp'

const defaultData = [
  {
    "modified_on": "2024-03-19T08:45:38.803+00:00",
    "app_type_id": 1,
    "is_active": true,
    "created_on": "2024-03-19T08:45:38.803+00:00",
    "name": "vicky sdsdsdkl",
    "icon": "sfvsd",
    "theme_id": 1,
    "description": "sdlfsdfk",
    "app_id": "5874dd98-e75e-11ee-9017-ef75ed831622",
    "created_by": 10515
  },
  {
    "modified_on": "2024-03-18T19:06:32.779+00:00",
    "app_type_id": 1,
    "is_active": true,
    "created_on": "2024-03-18T19:06:32.779+00:00",
    "name": "vv",
    "icon": "vv",
    "theme_id": 1,
    "description": "vv",
    "app_id": "5874dd98-e75e-11ee-9017-ef75ed831622",
    "created_by": 10515
  }
];
const AppPage = () => {
  const dispatch = useDispatch()
  const {error, data=defaultData,isLoading } = useAppsData()
  useEffect(() => {
    dispatch(getApps())
  }, [])
  if (isLoading) {
    return <Loader />
  }
  if(error&&false){
   return <NetworkError message={error}/>
  }
  return (
    <div>
      {/* <CreateApp/> */}
      <AppList data={data} />
    </div>
  )
}

export default AppPage