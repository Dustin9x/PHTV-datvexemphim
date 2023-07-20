import React, { useEffect, useState } from 'react'
import { Form, Button, Select, DatePicker, InputNumber, Input } from 'antd';
import { quanLyRapService } from '../../../services/QuanLyRapService';
import { useFormik } from 'formik';
import moment from 'moment';
import { quanLyDatVeService } from '../../../services/QuanLyDatVeService';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimAction } from '../../../redux/actions/QuanLyPhimAction';
import { themCarouselAction } from '../../../redux/actions/CarouselAction';
import { layDanhSachCumRapAction, layDanhSachHeThongRapAction, layDanhSachTinhThanhAction, themCumRapAction } from '../../../redux/actions/QuanLyRapAction';

export default function AddTheatreChild(props) {
    let { heThongRapChieu } = useSelector(state => state.RapReducer);
    let { tinhThanh } = useSelector(state => state.RapReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(layDanhSachHeThongRapAction())
        dispatch(layDanhSachTinhThanhAction())
    }, [dispatch])
    const formik = useFormik({
        initialValues: {
            tenRap: '',
            diaChi: '',
            maTinh_id: '',
        },
        onSubmit: async (values) => {
            let formData = new FormData();
            for (let key in values) {
                formData.append(key, values[key]);
            }
            console.table('formData', [...formData])
            dispatch(themCumRapAction(formData));
        }
    })


    

 console.log('tinhThanh123',tinhThanh)

    const handleChangeTheatre = (value) => {
        formik.setFieldValue('maTinh_id', value)
    }


    const convertSelect = () => {
        return tinhThanh?.map((item, index) => {
            return { label: item.tenTinh, value: item.maTinh }
        })
    }

    return (
        <div className="container">
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onSubmitCapture={formik.handleSubmit}


            >
                <h3 className="text-2xl">Thêm Rạp Chiếu</h3>
                {/* <Form.Item label="Chọn hệ thống rạp:">
                    <Select name='maRap' options={convertSelectHTR()} placeholder="Chọn hệ thống rạp" />
                </Form.Item> */}
                <Form.Item label="Chọn tỉnh - thành phố">
                    <Select name='maTinh_id' options={tinhThanh?.map((item, index) => ({ label: item.tenTinh, value: item.maTinh }))} onChange={handleChangeTheatre}  placeholder="Chọn tỉnh - thành" />
                </Form.Item>
                <Form.Item label="Tên rạp">
                    <Input name="tenRap" onChange={formik.handleChange} />
                </Form.Item>
                
                <Form.Item label="Địa chỉ">
                    <Input name="diaChi" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Chức năng">
                    <Button htmlType="submit">Tạo Cụm Rạp</Button>
                </Form.Item>
            </Form>
        </div>
    )
}