import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { layLaiMatKhauAction } from "../../redux/actions/QuanLyNguoiDungAction";
import { UserReducer } from "../../redux/reducers/UserReducer";

export default function ForgetPassword(props) {
  const dispatch = useDispatch();

  const { matkhau } = useSelector((state) => state.UserReducer);

  const onFinish = (values) => {
    const action = layLaiMatKhauAction(values);
    dispatch(action);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="py-8 px-8 bg-white rounded-2xl shadow-xl z-20">
      <Form
        name="basic"
        className="d-flex flex-col"
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
          <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
            Lấy Lại Mật Khẩu
          </h1>
          <p className="text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide">
            Nhập email đăng ký để lấy lại mật khẩu của bạn!!
          </p>
        </div>
        <Form.Item
          label=""
          name="email"
          rules={[
            {
              type: "email",
              message: "E-mail chưa đúng định dạng!",
            },
            {
              required: true,
              message: "E-mail không được để trống!",
            },
          ]}
        >
          <Input
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
            placeholder="Email"
          />
        </Form.Item>

        <div className="text-center mt-6">
          <button
            type="submit"
            className="py-2 w-64 text-xl text-white bg-purple-400 rounded-xl"
          >
            Gửi Mật Khẩu
          </button>
          <p className="mt-4 text-sm">
            Vui lòng xem mật khẩu tại gmail sau khi gửi
          </p>
        </div>
      </Form>
    </div>
  );
}
