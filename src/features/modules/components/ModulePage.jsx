import React, { useEffect } from 'react'
import ModuleList from './ModuleList'
import { getApps } from 'appRedux/slices/appsSlice'
import { useAppsData } from 'appRedux/hooks'
import Loader from 'appComponents/Loader'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'

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
    "app_id": "0f9bf7bd-e5cd-11ee-bf88-09129897eb16",
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
    "app_id": "56cc09e7cfdc4cef",
    "created_by": 10515
  }
];
const ModulePage = () => {
  const dispatch = useDispatch()
  const { data=defaultData, isLoading } = useAppsData()
  useEffect(() => {
    dispatch(getApps())
  }, [])
  if (isLoading) {
    return <Loader />
  }
  return (
    <div>
      <ModuleList data={defaultData} />
      <Outlet/>
    </div>
  )
}

export default ModulePage