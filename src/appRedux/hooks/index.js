import { useSelector } from "react-redux"

export const useElementState=()=>{
    return useSelector(state => state.elements)
}
export const useElementSelector=(id)=>{
    return useSelector(state => state.elements?.elementObjects?.[id]||{})
}


export const usePageState = () => {
    return useSelector(state => state.pages)
}
export const usePageSelector = (id) => {
    return useSelector(state => state.pages?.pageObjects?.[id])
}


export const useTailwindCSSData = () => {
    return useSelector(state => state.tailwindCSS?.data)
}
export const useAppsData = () => {
    return useSelector(state => state.appsSlice)
}
export const useUser = () => {
    return useSelector(state => state.user)
}
export const useModule = () => {
    return useSelector(state => state.module)
}

//module