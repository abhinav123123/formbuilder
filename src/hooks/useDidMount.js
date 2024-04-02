import { useEffect, useRef } from "react"

export const useDidMount=(cb,deps=[])=>{
 const myRef=useRef();
 useEffect(()=>{
  if(!myRef.current){
    cb();
    myRef.current=true;
  }
 },deps)

}