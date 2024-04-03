import SortableElement from './sortable-element';
import PlaceHolder from './form-place-holder';
import BaseFormElements from '../form-elements';
import { TwoColumnRow, ThreeColumnRow, MultiColumnRow } from '../multi-column';
import { FieldSet } from '../fieldset';
import CustomElement from '../form-elements/custom-element';
import Container from '../components/Container';
import React, { forwardRef } from 'react';
import ComponentHeader from '../form-elements/component-header';
import { useHover } from '../hooks/useHover';
import sortableElement from './sortable-element';
import ComponentLabel from '../form-elements/component-label';
import { useState, useEffect } from 'react';

const {
  Header, Paragraph, CustomButton, AgGridTable, Label, LineBreak, TextInput, EmailInput, PhoneNumber, NumberInput, TextArea, Dropdown, Checkboxes,
  DatePicker, RadioButtons, Image, Rating, Tags, Signature, HyperLink, Download, Camera, Range, FileUpload,
} = BaseFormElements;

const FormElements = {};

export const FNContainer = forwardRef(({ children, className, ...props }, ref) => {
  const [_ref, isHovered] = useHover()
  return <div className={`min-h-10 w-full relative ${className}`} ref={_ref}>
    {!props?.data?.isRoot && isHovered && <ComponentHeader {...props} />}
    {children}</div>
})

// export const TabbedContainer = forwardRef(({ children, className, ...props }, ref) => {
//   const [_ref, isHovered] = useHover();
//   return <div className={`min-h-10 w-full relative ${className}`} ref={_ref}>
//     <div>
//       {/* <nav style={{ width: '100%', display: 'flex', border: '1px solid black' }}>
//         <div style={{ height: '40px', width: '80px', backgroundColor: 'grey', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//           <p>view1</p>
//         </div>
//       </nav> */}
//       {
//        Tabbed
//       }
//       {!props?.data?.isRoot && isHovered && <ComponentHeader {...props} />}
//       {children}
//     </div>

//   </div>
// })
// class Tabbed extends React.Component {
//   constructor(props) {
//     super(props);
//     this.options = {};
//   }

//   func=(e)=>{

//   }

//   render() {
//     const self = this;
//     let classNames = 'custom-control custom-checkbox';
//     if (this.props.data.inline) { classNames += ' option-inline'; }

//     let baseClasses = 'SortableItem rfb-item';
//     if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

//     return (
//       <div style={{ ...this.props.style }} className={baseClasses}>
//         <ComponentHeader {...this.props} />
//         <div style={{display:'flex',border:'1px solid gray'}}>
//           <ComponentLabel {...this.props} />
//           {this.props.data.options.map((option) => {
//             const this_key = `preview_${option.key}`;
//             const props = {};
//             props.name = `option_${option.key}`;

//             // props.type = 'checkbox';
//             props.value = option.value;
//             if (self.props.mutable) {
//               props.defaultChecked = self.props.defaultValue !== undefined && self.props.defaultValue.indexOf(option.key) > -1;
//             }
//             if (this.props.read_only) {
//               props.disabled = 'disabled';
//             }
//             return (
//               <div className={classNames} key={this_key}>
//                 <input id={`fid_${this_key}`} className="custom-control-input" ref={c => {
//                   if (c && self.props.mutable) {
//                     self.options[`child_ref_${option.key}`] = c;
//                   }
//                 }} {...props} />
//                 <label onClick={()=>this.func(option.text)} className="custom-control-label" style={{ padding:'2px'}} htmlFor={`fid_${this_key}`}>{option.text}</label>
//               </div>
//             );
//           })}
//         </div>
//         <div style={{height:'150px', width:'100%',border:'1px solid black'}}>

//         </div>
//       </div>
//     );
//   }
// }

export const Tabbed = (props) => {
  console.log(props)
  const [options, setOptions] = useState({});
  const [key, setkey] = useState(null);

  const func = (option) => {
    setkey(option.key)
    console.log(key)
  };

  let classNames = 'custom-control custom-checkbox';
  if (props.data.inline) { classNames += ' option-inline'; }

  let baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

  return (
    <div style={{ ...props.style }} className={baseClasses}>
      <ComponentHeader {...props} />
      <div style={{ display: 'flex', border: '1px solid gray' }}>
        <ComponentLabel {...props} />
        {props.data.options.map((option) => {
          const this_key = `preview_${option.key}`;
          const inputProps = {};
          inputProps.name = `option_${option.key}`;
          inputProps.value = option.value;
          if (props.mutable) {
            inputProps.defaultChecked = props.defaultValue !== undefined && props.defaultValue.indexOf(option.key) > -1;
          }
          if (props.read_only) {
            inputProps.disabled = 'disabled';
          }
          return (
            <div className={classNames} key={this_key}>
              <input id={`fid_${this_key}`} className="custom-control-input" ref={c => {
                if (c && props.mutable) {
                  setOptions(prevState => ({
                    ...prevState,
                    [`child_ref_${option.key}`]: c
                  }));
                }
              }} {...inputProps} />
              <label onClick={() => func(option)} className="custom-control-label" style={{ padding: '2px' }} htmlFor={`fid_${this_key}`}>{option.text}</label>
            </div>
          );
        })}
      </div>
      {props.data.options.map((value) => {
        if (key === value.key) {
          return (
            <div style={{ height: '150px', width: '100%', border: '1px solid black' }}>
              {value.text}
              
            </div>
          )
        }
      })}
    </div>
  );
};

FormElements.Header = SortableElement(Header);
FormElements.Paragraph = SortableElement(Paragraph);
FormElements.CustomButton = SortableElement(CustomButton);
FormElements.AgGridTable = SortableElement(AgGridTable);
FormElements.Label = SortableElement(Label);
FormElements.LineBreak = SortableElement(LineBreak);
FormElements.TextInput = SortableElement(TextInput);
FormElements.EmailInput = SortableElement(EmailInput);
FormElements.PhoneNumber = SortableElement(PhoneNumber);
FormElements.NumberInput = SortableElement(NumberInput);
FormElements.TextArea = SortableElement(TextArea);
FormElements.Dropdown = SortableElement(Dropdown);
FormElements.Signature = SortableElement(Signature);
FormElements.Checkboxes = SortableElement(Checkboxes);
FormElements.DatePicker = SortableElement(DatePicker);
FormElements.RadioButtons = SortableElement(RadioButtons);
FormElements.Image = SortableElement(Image);
FormElements.Rating = SortableElement(Rating);
FormElements.Tags = SortableElement(Tags);
FormElements.HyperLink = SortableElement(HyperLink);
FormElements.Download = SortableElement(Download);
FormElements.Camera = SortableElement(Camera);
FormElements.FileUpload = SortableElement(FileUpload);
FormElements.Range = SortableElement(Range);
FormElements.PlaceHolder = SortableElement(PlaceHolder);
FormElements.FieldSet = SortableElement(FieldSet);
FormElements.TwoColumnRow = SortableElement(TwoColumnRow);
FormElements.ThreeColumnRow = SortableElement(ThreeColumnRow);
FormElements.MultiColumnRow = SortableElement(MultiColumnRow);
FormElements.CustomElement = SortableElement(CustomElement);
FormElements.Container = SortableElement(FNContainer);
FormElements.Form = SortableElement(FNContainer);
// FormElements.Tabbed = sortableElement(TabbedContainer);
FormElements.Tabbed = sortableElement(Tabbed);

export default FormElements;
