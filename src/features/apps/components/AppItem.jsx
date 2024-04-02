import React from 'react'
import {MdAppShortcut  } from "react-icons/md";
import { Link } from 'react-router-dom';

const AppItem = ({name,app_id}) => {
   
  return (
      <div className='shadow-xl p-4'>
        <Link to={`${app_id}`}>
      <div className='flex flex-col items-center justify-center'>
        <div>
            <MdAppShortcut/>
        </div>
        <div>{name}</div>
      </div>
    </Link>
    </div>
  )
}

export default AppItem