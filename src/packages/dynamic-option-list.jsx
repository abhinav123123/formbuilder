/**
 * <DynamicOptionList />
 */

import React from "react";
import ID from "./UUID";
import IntlMessages from "../language-provider/IntlMessages";

export default class DynamicOptionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      element: JSON.parse(JSON.stringify(this.props.element)),
      data: JSON.parse(JSON.stringify(this.props.data)),
      dirty: false,
    };
  }

  _setValue(text) {
    return text.replace(/[^A-Z0-9]+/gi, "_").toLowerCase();
  }

  editOption(option_index, e) {
    const this_element =JSON.parse( JSON.stringify(this.props.element));
    const val =
      this_element.options[option_index].value !==
      this._setValue(this_element.options[option_index].text)
        ? this_element.options[option_index].value
        : this._setValue(e.target.value);

    this_element.options[option_index].text = e.target.value;
    this_element.options[option_index].value = val;
    this.setState({
      element: this_element,
      dirty: true,
    });
    this.props.updateElement(this_element);
  }

  editValue(option_index, e) {
    const this_element = JSON.parse(JSON.stringify(this.props.element));
    const val =
      e.target.value === ""
        ? this._setValue(this_element.options[option_index].text)
        : e.target.value;
    this_element.options[option_index].value = val;
    this.setState({
      element: this_element,
      dirty: true,
    });
    this.props.updateElement(this_element);
  }

  // eslint-disable-next-line no-unused-vars
  editOptionCorrect(option_index, e) {
    const this_element = JSON.parse(JSON.stringify(this.props.element));
    if (this_element.options[option_index].hasOwnProperty("correct")) {
      delete this_element.options[option_index].correct;
    } else {
      this_element.options[option_index].correct = true;
    }
    this.setState({ element: this_element });
    this.props.updateElement(this_element);
  }

  updateOption() {
    const this_element = JSON.parse(JSON.stringify(this.props.element));
    // to prevent ajax calls with no change
    if (this.state.dirty) {
      this.props.updateElement(this_element);
      this.setState({ dirty: false });
    }
  }

  addOption(index) {
    const this_element = JSON.parse(JSON.stringify(this.props.element));
    this_element.options.splice(index + 1, 0, {
      value: "",
      text: "",
      key: ID.uuid(),
    });
    this.props.updateElement(this_element);
  }

  removeOption(index) {
    const this_element = JSON.parse(JSON.stringify(this.props.element));
    this_element.options.splice(index, 1);
    this.props.updateElement(this_element);
  }

  render() {
    // if (this.state.dirty) {
    //   this.props.element.dirty = true;
    // }
    return (
      <div className="dynamic-option-list">
        <ul>
          <li>
            <div className="row">
              <div className="col-sm-6">
                <b>
                  <IntlMessages id="options" />
                </b>
              </div>
              {this.props.canHaveOptionValue && (
                <div className="col-sm-2">
                  <b>
                    <IntlMessages id="value" />
                  </b>
                </div>
              )}
              {this.props.canHaveOptionValue &&
                this.props.canHaveOptionCorrect && (
                  <div className="col-sm-4">
                    <b>
                      <IntlMessages id="correct" />
                    </b>
                  </div>
                )}
            </div>
          </li>
          {this.props.element.options.map((option, index) => {
            const this_key = `edit_${option.key}`;
            const val =
              option.value !== this._setValue(option.text) ? option.value : "";
            return (
              <li className="clearfix" key={this_key}>
                <div className="row">
                  <div className="col-sm-6">
                    <input
                      tabIndex={index + 1}
                      className="form-control"
                      style={{ width: "100%" }}
                      type="text"
                      name={`text_${index}`}
                      placeholder="Option text"
                      value={option.text}
                      onBlur={this.updateOption.bind(this)}
                      onChange={this.editOption.bind(this, index)}
                    />
                  </div>
                  {this.props.canHaveOptionValue && (
                    <div className="col-sm-2">
                      <input
                        className="form-control"
                        type="text"
                        name={`value_${index}`}
                        value={val}
                        onChange={this.editValue.bind(this, index)}
                      />
                    </div>
                  )}
                  {this.props.canHaveOptionValue &&
                    this.props.canHaveOptionCorrect && (
                      <div className="col-sm-1">
                        <input
                          className="form-control"
                          type="checkbox"
                          value="1"
                          onChange={this.editOptionCorrect.bind(this, index)}
                          checked={option.hasOwnProperty("correct")}
                        />
                      </div>
                    )}
                  <div className="col-sm-3">
                    <div className="dynamic-options-actions-buttons">
                      <button
                        onClick={this.addOption.bind(this, index)}
                        className="btn btn-success"
                      >
                        <i className="fas fa-plus-circle"></i>
                      </button>
                      {index > 0 && (
                        <button
                          onClick={this.removeOption.bind(this, index)}
                          className="btn btn-danger"
                        >
                          <i className="fas fa-minus-circle"></i>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
