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

export const Tabbed = forwardRef(({ children, className, ...props }, ref) => {
  const [_ref, isHovered] = useHover();
  const [options, setOptions] = useState({});

  const func = (text) => {
    // Your logic here for func method
  };

  const classNames = 'custom-control custom-checkbox' + (props.data.inline ? ' option-inline' : '');
  const baseClasses = 'SortableItem rfb-item' + (props.data.pageBreakBefore ? ' alwaysbreak' : '');

  const handleRef = (c, option) => {
    if (c && props.mutable) {
      setOptions(prevState => ({
        ...prevState,
        [`child_ref_${option.key}`]: c
      }));
    }
  };

  return (
    <div style={{ ...props.style }} className={baseClasses}>
      <ComponentHeader {...props} />
      <div style={{ display: 'flex', border: '1px solid gray' }}>
        <ComponentLabel {...props} />
        {props.data.options.map((option) => {
          const this_key = `preview_${option.key}`;
          const inputProps = {
            name: `option_${option.key}`,
            value: option.value,
            defaultChecked: props.mutable && props.defaultValue !== undefined && props.defaultValue.indexOf(option.key) > -1,
            disabled: props.read_only ? 'disabled' : undefined
          };

          return (
            <div className={classNames} key={this_key}>
              <input id={`fid_${this_key}`} className="custom-control-input" ref={(c) => handleRef(c, option)} {...inputProps} />
              <label onClick={() => func(option.text)} className="custom-control-label" style={{ padding: '2px' }} htmlFor={`fid_${this_key}`}>{option.text}</label>
            </div>
          );
        })}
      </div>
      {props.data.options.map(() => {
        return (
          <div className={`min-h-10 w-full relative ${className}`} ref={_ref}>
            {!props?.data?.isRoot && isHovered && <ComponentHeader {...props} />}
            {children}</div>
        )
      })}
    </div>

  );

})



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
