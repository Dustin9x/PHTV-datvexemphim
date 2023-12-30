import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { dangKyAction, dangNhapAction } from '../../redux/actions/QuanLyNguoiDungAction';

export default function Register(props) {

  const dispatch = useDispatch();

  const { userLogin } = useSelector(state => state.UserReducer)

  const onFinish = (values) => {
    const action = dangKyAction(values);
    dispatch(action)
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="py-8 px-8 bg-white rounded-2xl shadow-xl z-20">

      <Form
        name="basic"
        className='d-flex flex-col'
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 24,
        }}
        style={{
          maxWidth: 350,
          width: 350,
        }}
        initialValues={{
          remember: false,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div>
          <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">Sign Up</h1>
         </div>

        <Form.Item
          name="email"
          label=""
          rules={[
            {
              type: 'email',
              message: 'E-mail is invalid!',
            },
            {
              required: true,
              message: 'E-mail is required!',
              transform: (value) => value.trim(),
            },
          ]}
        >
          <Input className="d-flex block text-sm py-2.5 px-4 mt-2 rounded-lg w-full border outline-none" placeholder="Email" />
        </Form.Item>

        <Form.Item
          label=""
          name="password"
          rules={[
            {
              required: true,
              message: 'Password is required!',
              transform: (value) => value.trim(),
            },
          ]}
        >
          <Input.Password className="d-flex block text-sm py-2.5 px-4 mt-2 rounded-lg w-full border outline-none" placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="password_confirmation"
          label=""
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please re-enter your password!',
              transform: (value) => value.trim(),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Password do not match, please try again!'));
              },
            }),
          ]}
        >
          <Input.Password className="d-flex block text-sm py-2.5 px-4 mt-2 rounded-lg w-full border outline-none" placeholder="Password confirm" />
        </Form.Item>

        <Form.Item
          label=""
          name="name"
          rules={[
            {
              required: true,
              message: 'Name is required!',
              transform: (value) => value.trim(),
            },
          ]}
        >
          <Input className="d-flex block text-sm py-2.5 px-4 mt-2 rounded-lg w-full border outline-none" placeholder="Fullname" />
          
        </Form.Item>

        <Form.Item
          name="remember"
          style={{ textAlign: 'left' }}
          valuePropName="checked"
          wrapperCol={{
            offset: 0,
            span: 16,
          }}
        >
          <Checkbox >Remember</Checkbox>
        </Form.Item>

        <div className="text-center">
          <button type="submit" className="py-2 w-64 text-base text-white bg-red-400 rounded-full">Sign Up</button>
          <div className="mt-2 text-sm">Already registered? <a href='login' className="underline  cursor-pointer"> Sign In</a></div>
        </div>
      </Form>
    </div>
  )
}
