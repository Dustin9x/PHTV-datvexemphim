import React, { useState } from 'react'
import { Form, Button, Input } from 'antd';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { themCarouselAction } from '../../../redux/actions/CarouselAction';

export default function AddCarousel(props) {
    const dispatch = useDispatch();
    const [imgSrc, setImgSrc] = useState('');
    const formik = useFormik({
        initialValues: {
            duongDan: '',
            hinhAnh: '',
        },
        onSubmit: async (values) => {
            let formData = new FormData();
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    formData.append('hinhAnh', values['hinhAnh']);
                }
            }
            console.table('formData', [...formData])
            dispatch(themCarouselAction(formData));
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
            formik.setFieldValue('hinhAnh', file);
        }
    }

    return (
        <div className="container">
            <Form
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                onSubmitCapture={formik.handleSubmit}
            >
                <h3 className="text-2xl">Thêm Carousel</h3>
                <Form.Item label="Hình ảnh">
                    <input type="file" onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png" />
                    <br />
                    {imgSrc ? <img style={{ width: 200, height: 150, objectFit: 'cover', borderRadius: '6px' }} src={imgSrc} alt="..." /> : <img style={{ width: 200, border: '0.1px solid #ccc', borderRadius: '6px' }} src='/img/placeholder-image.jpg' alt="..." />}
                </Form.Item>
                <Form.Item label="Liên Kết:">
                    <Input name='duongDan' onChange={formik.handleChange} placeholder="nhập liên kết" />
                </Form.Item>
                <Form.Item label="Chức năng">
                    <Button htmlType="submit">Tạo Carousel</Button>
                </Form.Item>
            </Form>
        </div>
    )
}