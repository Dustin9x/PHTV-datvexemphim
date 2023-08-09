import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    Select,
    Checkbox,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatNguoiDungAction, layThongTinNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import { useFormik } from 'formik';
import { values } from 'lodash';
import { TOKEN, USER_LOGIN } from '../../../util/settings/config';
import { history } from '../../../App';
const { Option } = Select;



const UserEdit = (props) => {
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);
    const { userLogin } = useSelector(state => state.UserReducer)
    let { id } = props.match.params;
    let user = {};
    if (localStorage.getItem('userParams')) {
        user = JSON.parse(localStorage.getItem('userParams'));
    }

    const [imgSrc, setImgSrc] = useState(user.avatar || '/img/placeholder-image.jpg');
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: user.name,
            email: user.email,
            // password: user.pass || null,
            role: user.role,
            avatar: user.avatar,
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
            dispatch(capNhatNguoiDungAction(id, formData));

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

    const onChangeCheck = (e) => {
        setChecked(e.target.checked);
    };

    return (
        <div >
            <h3 className='mb-5'>Cập nhật thông tin người dùng: {user.taiKhoan}</h3>
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
                    <Input disabled className='text-dark' name='email' onChange={formik.handleChange} placeholder="Email" />
                </Form.Item>

                <Form.Item
                    label="Thay đổi password?"
                >
                    <Checkbox checked={checked} onChange={onChangeCheck}></Checkbox>
                </Form.Item>

                {checked ?
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
                        <Input.Password name='password' onChange={formik.handleChange} placeholder="Mật khẩu" />
                    </Form.Item>
                    : ''}





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
                    <Input name='name' onChange={formik.handleChange} placeholder="Họ và tên" />
                </Form.Item>

                {userLogin.role === 'Super' ? <Form.Item
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
                    <Select name='role' onChange={handleChangeRole} placeholder="Chọn loại người dùng">
                        <Option value="QuanTri">Quản Trị</Option>
                        <Option value="KhachHang">Khách Hàng</Option>
                    </Select>
                </Form.Item> : ''}

                <Form.Item label="Avatar">
                    <input type="file" onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png" />
                    <br />
                    <img style={{ width: 200, height: 200, objectFit: 'cover', borderRadius: '50%' }} src={imgSrc === '' ? '/img/placeholder-image.jpg' : imgSrc} alt="..." />
                </Form.Item>

                <Form.Item label="Tác vụ">
                    <Button htmlType='submit' className='btn-primary bg-primary' type='primary' >Cập nhật</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UserEdit;