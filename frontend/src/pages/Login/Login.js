import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { dangNhapAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { UserReducer } from './../../redux/reducers/UserReducer';


export default function Login(props) {

  const dispatch = useDispatch();

  const { userLogin } = useSelector(state => state.UserReducer)


  const onFinish = (values) => {
    const action = dangNhapAction(values);
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
          minWidth: '100%',
        }}
        initialValues={{
          remember: false,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div>
          <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">Sign In</h1>
          <p className="text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide">Sign in to continue to PHTV Bus</p>
        </div>
        <Form.Item
          label=""
          name="email"
          style={{minWidth: '100%'}}
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
          <Input className="block text-sm py-2.5 px-4 rounded-lg w-full border outline-none" placeholder="Email" />
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
          <Input.Password className="d-flex block text-sm py-2.5 px-4 mt-3 rounded-lg w-full border outline-none" placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="remember"
          style={{ textAlign: 'left'}}
          valuePropName="checked"
          wrapperCol={{
            offset: 0,
            // span: 16,
          }}
        >
          <div className='d-flex justify-between'>
            {/* <Checkbox >Ghi nhớ</Checkbox> */}
            <a className="block cursor-pointer w-full text-right" href="/forgetPassword">Forgot Password</a>
          </div>
        </Form.Item>

        <div className="text-center">
          <button type="submit" className="py-2 w-64 text-base text-white bg-red-400 rounded-full">Sign In</button>
          <div className="mt-2 text-sm">Don't have account yet? <a href='register' className="underline  cursor-pointer"> Sing Up</a></div>
        </div>
      </Form>
    </div>
  )
}
