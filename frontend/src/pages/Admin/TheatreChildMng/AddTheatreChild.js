import React, { useEffect } from 'react'
import { Form, Button, Select, Input } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachTinhThanhAction, themCumRapAction } from '../../../redux/actions/QuanLyRapAction';

export default function AddTheatreChild(props) {
    let { tinhThanh } = useSelector(state => state.RapReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(layDanhSachTinhThanhAction())
    }, [dispatch])
    const formik = useFormik({
        initialValues: {
            tenRap: '',
            diaChi: '',
            maTinh_id: '',
        },
        onSubmit: async (values) => {
            if (values.tenRap == '' || values.diaChi == '' || values.maTinh_id == '') {
                alert('Vui lòng nhập đủ thông tin')
            } else {
                let formData = new FormData();
                for (let key in values) {
                    formData.append(key, values[key]);
                }
                console.table('formData', [...formData])
                dispatch(themCumRapAction(formData));
            }
            
        }
    })


    const handleChangeTheatre = (value) => {
        formik.setFieldValue('maTinh_id', value)
    }


    return (
        <div className="container">
            <Form
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                onSubmitCapture={formik.handleSubmit}
            >
                <h3 className="text-2xl">Thêm Rạp Chiếu</h3>
                <Form.Item label="Chọn tỉnh - thành phố"
                rules={[
                    {
                      required: true,
                      message: 'Tỉnh/Thành phố không được để trống!',
                      transform: (value) => value.trim(),
                    },
                  ]}
                >
                    <Select name='maTinh_id' options={tinhThanh?.map((item, index) => ({ label: item.tenTinh, value: item.maTinh }))} onChange={handleChangeTheatre}  placeholder="Chọn tỉnh - thành" />
                </Form.Item>
                <Form.Item label="Tên rạp"
                rules={[
                    {
                      required: true,
                      message: 'Tên rạp không được để trống!',
                      transform: (value) => value.trim(),
                    },
                  ]}
                >
                    <Input name="tenRap" onChange={formik.handleChange} />
                </Form.Item>
                
                <Form.Item label="Địa chỉ"
                rules={[
                    {
                      required: true,
                      message: 'Địa chỉ không được để trống!',
                      transform: (value) => value.trim(),
                    },
                  ]}
                >
                    <Input name="diaChi" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Chức năng">
                    <Button htmlType="submit">Tạo Cụm Rạp</Button>
                </Form.Item>
            </Form>
        </div>
    )
}