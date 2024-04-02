import React from "react";
// import { Select } from "antd";
import Select from 'react-select';
import { useTailwindCSSData } from "../../appRedux/hooks";
import { useEffect } from "react";
import { useState } from "react";

const ClassSelector = ({ value, setValue }) => {
    const [selectedOption, setSelectedOption] = useState(null);
  const data = useTailwindCSSData([]);

useEffect(()=>{
    if(value){
        const sValues=[]
        value.split(' ').forEach(element => {
          const  val=data.find(ele=>ele.value===element)
          if(val){
              sValues.push(val);
          }
        });
        setSelectedOption(sValues)
    }
},[data])
useEffect(()=>{
let value='';
 selectedOption?.forEach(ele=>{
    value+=ele?.value+" ";
 })
 setValue && setValue(value)
},[selectedOption])

  return   (
  <Select
    mode="tags"
    defaultValue={selectedOption}
    onChange={setSelectedOption}
    isMulti
    style={{
      width: '100%',
    }}
    isSearchable
    placeholder="Tags Mode"
    options={data}
  />
);
}

export default ClassSelector;
