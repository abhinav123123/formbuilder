import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { EventEmitter } from 'fbemitter';
import { injectIntl } from 'react-intl';
import FormValidator from './form-validator';
import FormElements from '../form-elements';
import { TwoColumnRow, ThreeColumnRow, MultiColumnRow } from '../multi-column';
import { FieldSet } from '../fieldset';
import CustomElement from '../form-elements/custom-element';
import Registry from '../stores/registry';
import { useElementState } from '../appRedux/hooks';
import { FNContainer } from './sortable-form-elements';
import {Tabbed} from './sortable-form-elements';

const {
  Image, Checkboxes, Signature, Download, Camera, FileUpload
} = FormElements;

const ReactForm = ({ 
  action_name, 
  actionName, 
  submitButton, 
  backButton, 
  backName, 
  back_name, 
  back_action, 
  hide_actions,
  authenticity_token, 
  task_id, 
  form_action, 
  form_method, 
  skip_validations, 
  onBlur, 
  onChange, 
  onSubmit, 
  validateForCorrectness, 
  display_short, 
  variables, 
  data, 
  download_path, 
  intl 
}) => {
  const formRef = useRef(null);
  const [inputs, setInputs] = useState({});
  const [answerData, setAnswerData] = useState({});
  const emitter = useRef(new EventEmitter());
  
  console.log({ action_name, 
    actionName, 
    submitButton, 
    backButton, 
    backName, 
    back_name, 
    back_action, 
    hide_actions,
    authenticity_token, 
    task_id, 
    form_action, 
    form_method, 
    skip_validations, 
    onBlur, 
    onChange, 
    onSubmit, 
    validateForCorrectness, 
    display_short, 
    variables, 
    data, 
    download_path, 
    intl })

  const convertAnswerData = (answers) => {
    if (Array.isArray(answers)) {
      const result = {};
      answers.forEach(x => {
        if (x.name.indexOf('tags_') > -1) {
          result[x.name] = x.value.map(y => y.value);
        } else {
          result[x.name] = x.value;
        }
      });
      return result;
    }
    return answers || {};
  };

  const getDefaultValue = (item) => {
    return answerData[item.field_name];
  };

  const optionsDefaultValue = (item) => {
    const defaultValue = getDefaultValue(item);
    if (defaultValue) {
      return defaultValue;
    }

    const defaultChecked = [];
    item.options.forEach(option => {
      if (answerData[`option_${option.key}`]) {
        defaultChecked.push(option.key);
      }
    });
    return defaultChecked;
  };

  const getItemValue = (item, ref) => {
    let $item = {
      element: item.element,
      value: '',
    };
    if (item.element === 'Rating') {
      $item.value = ref.inputField.current.state.rating;
    } else if (item.element === 'Tags') {
      $item.value = ref.inputField.current.state.value;
    } else if (item.element === 'DatePicker') {
      $item.value = ref.state.value;
    } else if (item.element === 'Camera') {
      $item.value = ref.state.img;
    } else if (item.element === 'FileUpload') {
      $item.value = ref.state.fileUpload;
    } else if (ref && ref.inputField && ref.inputField.current) {
      $item = ReactDOM.findDOMNode(ref.inputField.current);
      if ($item && typeof $item.value === 'string') {
        $item.value = $item.value.trim();
      }
    }
    return $item;
  };

  const isIncorrect = (item) => {
    let incorrect = false;
    if (item.canHaveAnswer) {
      const ref = inputs[item.field_name];
      if (item.element === 'Checkboxes' || item.element === 'RadioButtons') {
        item.options.forEach(option => {
          const $option = ReactDOM.findDOMNode(ref.options[`child_ref_${option.key}`]);
          if ((option.hasOwnProperty('correct') && !$option.checked) || (!option.hasOwnProperty('correct') && $option.checked)) {
            incorrect = true;
          }
        });
      } else {
        const $item = getItemValue(item, ref);
        if (item.element === 'Rating') {
          if ($item.value.toString() !== item.correct) {
            incorrect = true;
          }
        } else if ($item.value.toLowerCase() !== item.correct.trim().toLowerCase()) {
          incorrect = true;
        }
      }
    }
    return incorrect;
  };

  const isInvalid = (item) => {
    let invalid = false;
    if (item.required === true) {
      const ref = inputs[item.field_name];
      if (item.element === 'Checkboxes' || item.element === 'RadioButtons') {
        let checked_options = 0;
        item.options.forEach(option => {
          const $option = ReactDOM.findDOMNode(ref.options[`child_ref_${option.key}`]);
          if ($option.checked) {
            checked_options += 1;
          }
        });
        if (checked_options < 1) {
          invalid = true;
        }
      } else {
        const $item = getItemValue(item, ref);
        if (item.element === 'Rating') {
          if ($item.value === 0) {
            invalid = true;
          }
        } else if ($item.value === undefined || $item.value.length < 1) {
          invalid = true;
        }
      }
    }
    return invalid;
  };

  const collect = (item) => {
    const itemData = {
      id: item.id,
      name: item.field_name,
      custom_name: item.custom_name || item.field_name,
    };
    if (!itemData.name) return null;
    const ref = inputs[item.field_name];
    if (item.element === 'Checkboxes' || item.element === 'RadioButtons') {
      const checked_options = [];
      item.options.forEach(option => {
        const $option = ReactDOM.findDOMNode(ref.options[`child_ref_${option.key}`]);
        if ($option.checked) {
          checked_options.push(option.key);
        }
      });
      itemData.value = checked_options;
    } else {
      if (!ref) return null;
      itemData.value = getItemValue(item, ref).value;
    }
    return itemData;
  };

  const collectFormData = (data) => {
    const formData = [];
    data.forEach(item => {
      const item_data = collect(item);
      if (item_data) {
        formData.push(item_data);
      }
    });
    return formData;
  };

  const getSignatureImg = (item) => {
    const ref = inputs[item.field_name];
    const $canvas_sig = ref.canvas.current;
    if ($canvas_sig) {
      const base64 = $canvas_sig.toDataURL().replace('data:image/png;base64,', '');
      const isEmpty = $canvas_sig.isEmpty();
      const $input_sig = ReactDOM.findDOMNode(ref.inputField.current);
      if (isEmpty) {
        $input_sig.value = '';
      } else {
        $input_sig.value = base64;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = [];
    if (!skip_validations) {
      errors = validateForm();
      emitter.current.emit('formValidation', errors);
    }

    if (errors.length < 1) {
      if (onSubmit) {
        const formData = collectFormData(data);
        onSubmit(formData);
      } else {
        const $form = ReactDOM.findDOMNode(formRef.current);
        $form.submit();
      }
    }
  };

  const handleBlur = (event) => {
    if (onBlur) {
      const formData = collectFormData(data);
      onBlur(formData);
    }
  };

  const handleChange = (event) => {
    if (onChange) {
      const formData = collectFormData(data);
      onChange(formData);
    }
  };

  const validateForm = () => {
    const errors = [];
    let data_items = data?.data;
    if (display_short) {
      data_items = data.filter((i) => i.alternateForm === true);
    }

    data_items?.forEach(item => {
      if (item.element === 'Signature') {
        getSignatureImg(item);
      }

      if (isInvalid(item)) {
        errors.push(`${item.label} ${intl.formatMessage({ id: 'message.is-required' })}!`);
      }

      if (item.element === 'EmailInput') {
        const ref = inputs[item.field_name];
        const emailValue = getItemValue(item, ref).value;
        if (emailValue) {
          const validateEmail = (email) => email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
          const checkEmail = validateEmail(emailValue);
          if (!checkEmail) {
            errors.push(`${item.label} ${intl.formatMessage({ id: 'message.invalid-email' })}`);
          }
        }
      }

      if (item.element === 'PhoneNumber') {
        const ref = inputs[item.field_name];
        const phoneValue = getItemValue(item, ref).value;
        if (phoneValue) {
          const validatePhone = (phone) => phone.match(
            /^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g
          );
          const checkPhone = validatePhone(phoneValue);
          if (!checkPhone) {
            errors.push(`${item.label} ${intl.formatMessage({ id: 'message.invalid-phone-number' })}`);
          }
        }
      }

      if (validateForCorrectness && isIncorrect(item)) {
        errors.push(`${item.label} ${intl.formatMessage({ id: 'message.was-answered-incorrectly' })}!`);
      }
    });

    return errors;
  };

  const getDataById = (id) => {
    return data.find(x => x.id === id);
  };

  const getInputElement = (item) => {
    if (item.custom) {
      return getCustomElement(item);
    }
    const Input = FormElements[item.element];
    return (<Input
      handleChange={handleChange}
      // ref={c => setInputs(prevState => ({ ...prevState, [item.field_name]: c }))}
      mutable={true}
      key={`form_${item.id}`}
      data={item}
      read_only={false}
      defaultValue={getDefaultValue(item)} />);
  };

  const getContainerElement = (item, Element) => {
    const controls = item.childItems.map(x => (x ? getInputElement(getDataById(x)) : <div>&nbsp;</div>));
    return (<Element mutable={true} key={`form_${item.id}`} data={item} controls={controls} />);
  };

  const getSimpleElement = (item) => {
    const Element = FormElements[item.element];
    return (<Element mutable={true} key={`form_${item.id}`} data={item} />);
  };

  const getCustomElement = (item) => {
    if (!item.component || typeof item.component !== 'function') {
      item.component = Registry.get(item.key);
      if (!item.component) {
        console.error(`${item.element} ${intl.formatMessage({ id: 'message.was-not-registered' })}`);
      }
    }

    const inputProps = item.forwardRef && {
      handleChange,
      defaultValue: getDefaultValue(item),
      ref: c => setInputs(prevState => ({ ...prevState, [item.field_name]: c })),
    };
    return (
      <CustomElement
        mutable={true}
        read_only={false}
        key={`form_${item.id}`}
        data={item}
        {...inputProps}
      />
    );
  };

  const handleRenderSubmit = () => {
    const name = action_name || actionName;
    const actionName = name || 'Submit';
    return submitButton || <input type='submit' className='btn btn-big' value={actionName} />;
  };

  const handleRenderBack = () => {
    const name = back_name || backName;
    const backName = name || 'Cancel';
    return backButton || <a href={back_action} className='btn btn-default btn-cancel btn-big'>{backName}</a>;
  };
  const elements=useElementState()
  let data_items = Object.values(elements?.elementObjects||{});

  if (display_short) {
    data_items = data.filter((i) => i.alternateForm === true );
  }

  data_items.forEach((item) => {
    if (item && item.readOnly && item.variableKey && variables[item.variableKey]) {
      setAnswerData(prevState => ({
        ...prevState,
        [item.field_name]: variables[item.variableKey]
      }));
    }
  });

  const items = data_items.filter(x => !x.isRoot).map(item => {  
    if (!item) return null;
    switch (item.element) {
      case 'TextInput':
      case 'EmailInput':
      case 'PhoneNumber':
      case 'NumberInput':
      case 'TextArea':
      case 'Dropdown':
      case 'DatePicker':
      case 'RadioButtons':
      case 'Rating':
      case 'Tags':
      case 'Range':
        return getInputElement(item);
      case 'CustomElement':
        return getCustomElement(item);
      case 'MultiColumnRow':
        return getContainerElement(item, MultiColumnRow);
      case 'ThreeColumnRow':
        return getContainerElement(item, ThreeColumnRow);
      case 'TwoColumnRow':
        return getContainerElement(item, TwoColumnRow);
      case 'FieldSet':
        return getContainerElement(item, FieldSet);
      case 'Container':
        return <FNContainer {...item}/>;
        case 'Tabbed':
          return <Tabbed {...item}/>
      case 'Signature':
        return <Signature ref={c => setInputs(prevState => ({ ...prevState, [item.field_name]: c }))} read_only={false} mutable={true} key={`form_${item.id}`} data={item} defaultValue={getDefaultValue(item)} />;
      case 'Checkboxes':
        return <Checkboxes ref={c => setInputs(prevState => ({ ...prevState, [item.field_name]: c }))} read_only={false} handleChange={handleChange} mutable={true} key={`form_${item.id}`} data={item} defaultValue={optionsDefaultValue(item)} />;
      case 'Image':
        return <Image ref={c => setInputs(prevState => ({ ...prevState, [item.field_name]: c }))} handleChange={handleChange} mutable={true} key={`form_${item.id}`} data={item} defaultValue={getDefaultValue(item)} />;
      case 'Download':
        return <Download download_path={download_path} mutable={true} key={`form_${item.id}`} data={item} />;
      case 'Camera':
        return <Camera ref={c => setInputs(prevState => ({ ...prevState, [item.field_name]: c }))} read_only={false} mutable={true} key={`form_${item.id}`} data={item} defaultValue={getDefaultValue(item)} />;
      case 'FileUpload':
        return (
          <FileUpload
            ref={(c) => setInputs(prevState => ({ ...prevState, [item.field_name]: c }))}
            read_only={false}
            mutable={true}
            key={`form_${item.id}`}
            data={item}
            defaultValue={getDefaultValue(item)}
          />
        );
      default:
        return getSimpleElement(item);
    }
  });

  const formTokenStyle = {
    display: 'none',
  };

  return (
    <div>
      <FormValidator emitter={emitter.current} />
      <div className='react-form-builder-form'>
        <form encType='multipart/form-data' ref={formRef} action={form_action} onBlur={handleBlur} onChange={handleChange} onSubmit={handleSubmit} method={form_method}>
          {authenticity_token &&
            <div style={formTokenStyle}>
              <input name='utf8' type='hidden' value='&#x2713;' />
              <input name='authenticity_token' type='hidden' value={authenticity_token} />
              <input name='task_id' type='hidden' value={task_id} />
            </div>
          }
          {items}
          <div className='btn-toolbar'>
            {!hide_actions &&
              handleRenderSubmit()
            }
            {!hide_actions && back_action &&
              handleRenderBack()
            }
          </div>
        </form>
      </div>
    </div>
  );
};

export default injectIntl(ReactForm);
ReactForm.defaultProps = { validateForCorrectness: false };
