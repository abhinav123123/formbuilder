import React, { useState } from 'react';
import axios from "axios";
import { Form, Input, Button ,message } from 'antd';
import { useNavigate } from "react-router-dom";
import './styles/login.scss'
import { computeVersion } from '../../utils/makeRequest';
import { Auth } from '../../utils/auth';


const LoginComponent = () => {
  const [loginSso, setLoginSso] = useState(false);
  const navigate = useNavigate();
  if (Auth.isAuthenticated()){
    navigate("/app-builder");
  }
  const handleLogin = (userName, userPass) => {
    if (userName === 'ankitp@lumenore.com' && userPass === 'ankit@1234') {
        navigate("/app-builder");
    } else {
      alert('Invalid username or password');
    }
  };

  const onFinish = (values) => {
    handleLogin(values.username, values.password);
  };

  const ssoLumenore = async () => {
    setLoginSso(true)
    const url = `${window.location.origin}/api/onboard/generate-auth-token?url=${window.location.origin.substring(8)}/app-builder&clientId=asdfge`
    // const url = `https://rsh.lumenore.com/api/onboard/generate-auth-token?url=rsh.lumenore.com/apps&clientId=asdfge`
    // const url = `https://qa.lumenore.com/api/onboard/generate-auth-token?url=qa.testlume.in/apps&clientId=asdfge`
    const redirectUrl = 'https://uat.testlume.in/login-lumenore/?redirect='
    const response = await axios.get(url, { headers: { version: computeVersion() } })
    try {
      if (response?.status === 200) {
        window.location.href = redirectUrl + response.data.data
        setTimeout(() => {
          setLoginSso(false)
        }, 2000)
      } else {
        setLoginSso(false)
        message.error("sso failed")
      }
    } catch (err) {
      setLoginSso(false)
    }

  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className='account-login'>Account Login</div>
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="login-form"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>

          <div className='login-with-sso'>
            <span>OR</span>
          </div>

          <Form.Item>
            <Button
             loading={loginSso}
             onClick={ssoLumenore}
            >
              Sign in with Lumenore
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginComponent;
