import { usePageSelector, usePageState } from 'appRedux/hooks'
import { addModule, initialModules, setActiveModule } from 'appRedux/slices/moduleSlice'
import { addNewPage, removePage, setActivePage, updateHomePage, updatePageName } from 'appRedux/slices/pagesSlice'
import { useDidMount } from 'hooks/useDidMount'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { IoIosAdd } from "react-icons/io";
import { MdExpandMore, MdEdit, MdOutlineDelete, MdHomeFilled } from "react-icons/md";
import { RxFilePlus } from "react-icons/rx";
import { Input, Modal, Tabs } from "antd";
import Checkbox from 'antd/es/checkbox/Checkbox'

const RenderScreenItem = ({ id, isActive, isHome }) => {
    const { title } = usePageSelector(id)
    const dispatch = useDispatch()
    const [pageNameEdit, setPageNameEdit] = useState({
        openModal: false,
        pageName: title,
    });
    const remove = (e) => {
        e.stopPropagation()
        dispatch(removePage({ targetKey: id }));

    };
    const handleOk = () => {
        dispatch(updatePageName({ sId: id, pageName: pageNameEdit.pageName }));
        setPageNameEdit({
            ...pageNameEdit,
            openModal: false,
        });
    };
    const handleCancel = () => {
        setPageNameEdit({
            ...pageNameEdit,
            openModal: false,
        });
    };

    const pageNameChangehandler = (e, sId) => {
        setPageNameEdit({
            ...pageNameEdit,
            pageName: e.target.value,
        });
    };
    const onEditHandler = (e) => {
        e.stopPropagation()
        setPageNameEdit({
            ...pageNameEdit,
            openModal: true,
        });
    };
    return <>
        <Modal
            title="Edit screen name "
            open={pageNameEdit.openModal}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Input
                type="text"
                value={pageNameEdit.pageName}
                onChange={(e) => pageNameChangehandler(e, id)}
            />

            <Checkbox checked={isHome} onChange={() => {
                dispatch(updateHomePage({ homePage: id }))
            }}>Set as home</Checkbox>
        </Modal>
        <div onClick={()=>{
            dispatch(setActivePage(id))
        }} className={`cursor-pointer flex justify-between items-center p-1 rounded-md gap-1 ${isActive ? 'bg-gray-800 text-white' : ''}`}>
            <div className='flex-1 text-xs'>
                {title}
            </div>
            {isHome && <MdHomeFilled className='h-3 w-4'/>}
            <MdEdit className='hover:bg-gray-400 hover:rounded-2xl p-1 cursor-pointer h-5 w-5' onClick={onEditHandler} />
            <MdOutlineDelete className='hover:bg-gray-400 hover:rounded-2xl p-1 cursor-pointer h-5 w-5' onClick={remove} />
        </div>
    </>
}




const ModuleAndScreenPanel = ({ modules = [], activeModuleIndex }) => {
    const [isExapned, setIsExpaned] = useState(false)
    const { pages, activePage, homePage } = usePageState()
    const dispatch = useDispatch()
    useDidMount(() => {
    }, [])

    const addNewScreen = () => {
        const newActiveKey = `Screen ${pages.length + 1}`;
        dispatch(addNewPage({ title: newActiveKey }));
    };
    return (
        <div>
            <div className='bg-gray-100 p-1'>
                <div className='flex justify-between items-center text-xs'>
                    <div className='flex gap-1 items-center text-xs'>
                        <MdExpandMore className={`cursor-pointer h-4 w-5  ${isExapned ? '' : "-rotate-90"}`} onClick={() => { setIsExpaned(prev => !prev) }} />
                        Screens
                    </div>

                    <RxFilePlus className='cursor-pointer h-4 w-5' onClick={addNewScreen} />
                </div>
                {isExapned && <div className='ml-2 flex flex-col'>
                    {pages?.map((id) => {
                        return <RenderScreenItem id={id} isHome={homePage === id} isActive={activePage === id} />
                    })}
                </div>}
            </div>

        </div>
    )
}

export default ModuleAndScreenPanel