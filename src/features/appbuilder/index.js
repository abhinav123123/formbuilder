import { ReactFormBuilder } from 'formBuilder';
import Preview from 'packages/preview'
import Toolbar from 'packages/toolbar'
import React from 'react'

import * as variables from 'variable';
import ModuleAndScreenPanel from './components/panel';
import { useDidMount } from 'hooks/useDidMount';
import { getModulesAndScreens } from 'appRedux/slices/moduleSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useModule } from 'appRedux/hooks';
import Loader from 'appComponents/Loader';
import ScreenTab from './components/ScreenTabs';
import Demobar from 'demobar';
const url = '/api/formdata';
const saveUrl = 'https://qa.lumenore.com/api/lumapps/set-component';

const AppBuilder = () => {
    const params = useParams()
    const { appId }=params;
  const {isLoading,modules,activeModuleIndex}=  useModule()
    const dispatch = useDispatch()
    useDidMount(() => {
        dispatch(getModulesAndScreens({ app_id: appId }))
    })

    if(isLoading){
        return <Loader/>
    }
    return (
        <div>
            
        <Demobar/>
        <div className='flex flex-row overflow-hidden h-screen'>
            <div className='w-60 h-full overflow-hidden'>
                <Toolbar />
            </div>
            <div className='flex-1 overflow-hidden'>
                 <ReactFormBuilder
                    variables={variables}
                    url={url}
                    saveUrl={saveUrl}
                    locale='en'
                    saveAlways={true}
               />
            </div>
            <div className='w-40'>
                <ModuleAndScreenPanel modules={modules} activeModuleIndex={activeModuleIndex}/>
            </div>
        </div>
        </div>
    )
}

export default AppBuilder