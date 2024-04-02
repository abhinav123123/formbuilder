import React from 'react'
import {MdAppShortcut  } from "react-icons/md";
import { Link } from 'react-router-dom';

const ScreenItem = ({name,modified_on,app_type_id,is_active,icon,description,theme_id,app_id}) => {
   
  return (
    <Link to={`${app_id}`}>
    <div className='shadow-xl p-4 flex flex-col items-center justify-center'>
        <div>
            <MdAppShortcut/>
        </div>
        <div>{name}</div>
    </div>
    </Link>
  )
}

export default ScreenItem