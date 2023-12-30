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
          <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">Đăng Nhập</h1>
          <p className="text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide">Đăng nhập để truy cập vào tài khoản của bạn</p>
        </div>
        <Form.Item
          label=""
          name="email"
          style={{minWidth: '100%'}}
          rules={[
            {
              type: 'email',
              message: 'E-mail chưa đúng định dạng!',
            },
            {
              required: true,
              message: 'E-mail không được để trống!',
              transform: (value) => value.trim(),
            },
          ]}
        >
          <Input className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" placeholder="Email" />
        </Form.Item>

        <Form.Item
          label=""
          name="password"
          rules={[
            {
              required: true,
              message: 'Password không được để trống!',
              transform: (value) => value.trim(),
            },
          ]}
        >
          <Input.Password className="d-flex block text-sm py-3 px-4 mt-3 rounded-lg w-full border outline-none" placeholder="Mật khẩu" />
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
            <a className="block cursor-pointer w-full text-right" href="/forgetPassword">Quên mật khẩu</a>
          </div>
        </Form.Item>

        <div className="text-center mt-6">
          <button type="submit" className="py-2 w-64 text-xl text-white bg-purple-400 rounded-xl">Đăng nhập</button>
          <p className="mt-4 text-sm">Bạn chưa có tài khoản? <a href='register' className="underline  cursor-pointer"> Đăng ký</a></p>
        </div>
      </Form>
    </div>
  )
}
