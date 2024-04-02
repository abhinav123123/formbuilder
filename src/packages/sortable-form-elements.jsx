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

export const TabbedContainer = forwardRef(({ children, className, ...props }, ref) => {
  console.log(props)
  const [_ref, isHovered] = useHover();
  return <div className={`min-h-10 w-full relative ${className}`} ref={_ref}>
    <div>
      <nav style={{ width: '100%', display: 'flex', border: '1px solid black' }}>
        <div style={{ height: '40px', width: '80px', backgroundColor: 'grey', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p>view1</p>
        </div>
      </nav>
      {!props?.data?.isRoot && isHovered && <ComponentHeader {...props} />}
      {children}
    </div>

  </div>
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
FormElements.Tabbed = sortableElement(TabbedContainer);

export default FormElements;
