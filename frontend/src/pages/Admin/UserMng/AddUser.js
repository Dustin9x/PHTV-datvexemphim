import React from 'react';
import {
    Form,
    Input,
    Button,
    Select,
} from 'antd';
import { themNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import { useDispatch } from 'react-redux';
const { Option } = Select;
const AddUser = () => {
    const dispatch = useDispatch();

    const onSubmit = (values) => {
        dispatch(themNguoiDungAction(values));
    }



    return (
        <div >
            <h3>Thêm Người Dùng Mới</h3>
            <Form
                onFinish={onSubmit}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
            >
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            type: 'email',
                            message: 'E-mail chưa đúng định dạng!',
                        },
                        {
                            required: true,
                            message: 'E-mail không được để trống!',
                        },
                    ]}
                >
                    <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                    label="Mật Khẩu"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Password không được để trống!',
                        },
                    ]}
                >
                    <Input.Password placeholder="Mật khẩu" />
                </Form.Item>

                <Form.Item
                    label="Họ Tên"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Username không được để trống!',
                        },
                    ]}
                >
                    <Input placeholder="Username" />
                </Form.Item>

                <Form.Item
                    name="role"
                    label="Loại Người Dùng"
                    rules={[
                        {
                            required: true,
                            message: 'Loại người dùng không được để trống!',
                        },
                    ]}
                >
                    <Select placeholder="Chọn loại người dùng">
                        <Option value="QuanTri">Quản Trị</Option>
                        <Option value="KhachHang">Khách Hàng</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Tác vụ">
                    <Button htmlType='submit' className='btn-primary bg-primary' type='primary' >Thêm người dùng</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddUser;