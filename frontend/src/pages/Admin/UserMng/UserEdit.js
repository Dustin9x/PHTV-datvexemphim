import React from 'react';
import {
    Form,
    Input,
    Button,
    Select,
} from 'antd';
import { useDispatch } from 'react-redux';
import { GROUPID } from './../../../util/settings/config';
import { capNhatNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';
const { Option } = Select;

const UserEdit = (props) => {
    const dispatch = useDispatch();
    let {id} =  props.match.params;
    let user = {};
    if (localStorage.getItem('userParams')) {
        user = JSON.parse(localStorage.getItem('userParams'));
    }
    const onSubmit = (values) => {
        dispatch(capNhatNguoiDungAction(id,values));
    }

    return (
        <div >
            <h3 className='mb-5'>Cập nhật thông tin người dùng: {user.taiKhoan}</h3>
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
                    initialValue={user.email}
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
                    initialValue={user.password}
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
                    initialValue={user.name}
                    rules={[
                        {
                            required: true,
                            message: 'Họ và tên không được để trống!',
                        },
                    ]}
                >
                    <Input placeholder="Họ và tên" />
                </Form.Item>

                {user.role !== 'KhachHang' ?<Form.Item
                    name="role"
                    label="Loại Người Dùng"
                    initialValue={user.role}
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
                </Form.Item>:''}

                <Form.Item label="Tác vụ">
                    <Button htmlType='submit' className='btn-primary bg-primary' type='primary' >Cập nhật</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UserEdit;