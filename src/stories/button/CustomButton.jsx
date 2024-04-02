import React from 'react';
import PropTypes from 'prop-types';
import './button.css';
import { Button } from 'antd';
import { DownloadOutlined,SearchOutlined,PlusOutlined } from '@ant-design/icons';

const VALID_LANGUAGES = [
  { label: "download", value: <DownloadOutlined/> },
  { label: "plus", value: <PlusOutlined /> },
  { label: "search", value: <SearchOutlined/> }
];
export const CustomButton = ({ primary, backgroundColor, size, label,icon, ...props }) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    // <button
    //   className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
    //   style={backgroundColor && { backgroundColor }}
    //   {...props}
    // >
    //   {label}
    // </button>

    <Button
      className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
      style={backgroundColor && { backgroundColor }}
      icon={icon}
      {...props}
    >
      {label}
    </Button>


  );
};

CustomButton.propTypes = {
  primary: PropTypes.bool,
  backgroundColor: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  label: PropTypes.string.isRequired, 
  icon : <DownloadOutlined />,
  onClick: PropTypes.func,
};

CustomButton.defaultProps = {
  backgroundColor: 'green',
  primary: false,
  icon : <DownloadOutlined />,
  size: 'medium',
  onClick: undefined,
};
