import React, { useEffect } from 'react'
import { Form, Button, Select, Input } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { capNhaRapChieuAction, layDanhSachTinhThanhAction } from '../../../redux/actions/QuanLyRapAction';

export default function EditTheatreChild(props) {
    let { tinhThanh } = useSelector(state => state.RapReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(layDanhSachTinhThanhAction())
    }, [])
    let theatre = {};
    if (localStorage.getItem('filmParams')) {
        theatre = JSON.parse(localStorage.getItem('theatreParams'));
    }
    let { id } = props.match.params;
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            tenRap: theatre?.tenRap,
            diaChi: theatre?.diaChi,
            maTinh_id: theatre?.maTinh_id
        },
        onSubmit: async (values) => {
            let formData = new FormData();
            for (let key in values) {
                formData.append(key, values[key]);
            }
            console.table('formData', [...formData])
            dispatch(capNhaRapChieuAction(id, formData));
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
                <h3 className="text-2xl">Sửa Rạp Chiếu</h3>
                <Form.Item label="Chọn tỉnh - thành phố">
                    <Select name='maTinh_id' options={tinhThanh?.map((item, index) => ({ label: item.tenTinh, value: item.maTinh }))} value={formik.values.maTinh_id} onChange={handleChangeTheatre} placeholder="Chọn tỉnh - thành" />
                </Form.Item>
                <Form.Item label="Tên rạp">
                    <Input name="tenRap" onChange={formik.handleChange} value={formik.values.tenRap} />
                </Form.Item>

                <Form.Item label="Địa chỉ">
                    <Input name="diaChi" onChange={formik.handleChange} value={formik.values.diaChi} />
                </Form.Item>
                <Form.Item label="Chức năng">
                    <Button htmlType="submit">Cập Nhật Cụm Rạp</Button>
                </Form.Item>
            </Form>
        </div>
    )
}