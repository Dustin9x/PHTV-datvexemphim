import React, { useEffect, useState } from 'react'
import { Form, Button, Select, DatePicker, InputNumber } from 'antd';
import { quanLyRapService } from '../../../services/QuanLyRapService';
import { useFormik } from 'formik';
import moment from 'moment';
import { quanLyDatVeService } from '../../../services/QuanLyDatVeService';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimAction } from '../../../redux/actions/QuanLyPhimAction';
import { themCarouselAction } from '../../../redux/actions/CarouselAction';

export default function AddCarousel(props) {
    const [imgSrc, setImgSrc] = useState('');
    let { arrMovie } = useSelector(state => state.MovieReducer);
    const formik = useFormik({
        initialValues: {
            // maPhim: props.match.params.id,
            maPhim: '',
            // tenPhim: '',
            hinhAnh: '',
        },
        onSubmit: async (values) => {
            let formData = new FormData();
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    // formData.append('hinhAnh', values.hinhAnh, values.hinhAnh.name);
                    formData.append('hinhAnh', values['hinhAnh']);
                }
            }
            // Gọi api gửi các giá trị formdata về backend xử lý
            console.table('formData', [...formData])
            dispatch(themCarouselAction(formData));
        }
    })


    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(layDanhSachPhimAction())
    }, [dispatch])



    const handleChangeMovie = (value) => {
        formik.setFieldValue('maPhim', value)
    }

    const handleChangeFile = (e) => {
        let file = e.target.files[0];
        
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {
          // Tạo đối tượng để đọc file
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (e) => {
            // setImgSrc(e.target.result); //Hình base 64
            // setImgSrc(file); //Hình base 64
            setImgSrc(e.target.result);//Hình base 64
          }
          // Đem dữ liệu file lưu vào formik
          formik.setFieldValue('hinhAnh', file);
        }
      }

    const convertSelectHTR = () => {
        return arrMovie?.map((movie, index) => {
            return { label: movie.tenPhim, value: movie.maPhim }
        })
    }

    let carousel = {};
    if (localStorage.getItem('filmParams')) {
        carousel = JSON.parse(localStorage.getItem('carouselParams'));
    }

    return (
        <div className="container">
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onSubmitCapture={formik.handleSubmit}


            >
                <h3 className="text-2xl">Thêm Carousel</h3>
                <Form.Item label="Chọn phim:">
                    <Select name='maPhim' options={convertSelectHTR()} onChange={handleChangeMovie} placeholder="Chọn phim" />
                </Form.Item>
                <Form.Item label="Hình ảnh">
                    <input type="file" onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png" />
                    <br />
                    <img style={{ width: 150, height: 150 }} src={imgSrc} alt="..." />
                </Form.Item>
                <Form.Item label="Chức năng">
                    <Button htmlType="submit">Tạo Carousel</Button>
                </Form.Item>
            </Form>
        </div>
    )
}