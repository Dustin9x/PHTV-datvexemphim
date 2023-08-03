import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    Select,
} from 'antd';
import { themNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { TOKEN, USER_LOGIN } from '../../../util/settings/config';
import { history } from '../../../App';
const { Option } = Select;



const AddUser = () => {
    let userLogin = {}
if (localStorage.getItem(USER_LOGIN)) {
    userLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
}

if (!localStorage.getItem(TOKEN)) {
    history.replace('/')
}

if (userLogin.role !== 'Super') {
    alert('Bạn không có quyền truy cập trang này!');
    history.replace('/')
}
    const dispatch = useDispatch();
    const [imgSrc, setImgSrc] = useState('');
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            role: '',
            avatar: '',
            fileName: ''
        },
        onSubmit: async (values) => {
            let formData = new FormData();
            for (let key in values) {
                if (key !== 'avatar') {
                    formData.append(key, values[key]);
                } else {
                    formData.append('avatar', values['avatar']);
                }
            }
            console.table('formData', [...formData])
            dispatch(themNguoiDungAction(formData));
        }
    })

    const handleChangeFile = (e) => {
        let file = e.target.files[0];

        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setImgSrc(e.target.result);//Hình base 64
            }
            formik.setFieldValue('avatar', file);
        }
    }

    const handleChangeRole = (value) => {
        formik.setFieldValue('role', value)
    }

    return (
        <div >
            <h3>Thêm Người Dùng Mới</h3>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                onSubmitCapture={formik.handleSubmit}
            >
                <Form.Item label="Avatar">
                    <input type="file" onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png" />
                    <br />
                    {imgSrc ? <img style={{ width: 200, height: 200, objectFit: 'cover', borderRadius: '50%' }} src={imgSrc} alt="..." /> : <img style={{ width: 200, height: 200, border: '0.1px solid #ccc', borderRadius: '50%' }} src='/img/placeholder-image.jpg' alt="..." />}
                </Form.Item>
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
                    <Input name='email' onChange={formik.handleChange} placeholder="Email" />
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
                    <Input.Password name='password' onChange={formik.handleChange} placeholder="Mật khẩu" />
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
                    <Input name='name' onChange={formik.handleChange} placeholder="Username" />
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
                    <Select name='role' onChange={handleChangeRole} placeholder="Chọn loại người dùng">
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