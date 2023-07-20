import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Radio,
  DatePicker,
  InputNumber,
  Switch,
  Select
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { capNhatPhimUploadAction, layDanhSachPhimAction, layThongTinPhimAction, themPhimUploadHinhAction } from '../../../redux/actions/QuanLyPhimAction';
import { capNhatCarouselAction, layThongTinCarouselAction } from '../../../redux/actions/CarouselAction';

const EditCarousel = (props) => {
  const [componentSize, setComponentSize] = useState('default');
  const [imgSrc, setImgSrc] = useState('');
  const { carouselEditDetail } = useSelector(state => state.CarouselReducer)
  let { arrMovie } = useSelector(state => state.MovieReducer);

  const dispatch = useDispatch();

  let { id } = props.match.params;
  useEffect(() => {
    // let {id} =  props.match.params;
    dispatch(layThongTinCarouselAction(id));
    dispatch(layDanhSachPhimAction())
  }, [])

  console.log('carouselEditDetail', carouselEditDetail)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      // maPhim: movieEditDetail.maPhim,
      maPhim: carouselEditDetail?.maPhim,
      hinhAnh: carouselEditDetail?.hinhAnh,
    },
    onSubmit: (values) => {
      // Tạo đối tượng formdata => Đưa giá trị values từ formik vào formdata
      values.maBanner = id;
      let formData = new FormData();
      for (let key in values) {
        if (key !== 'hinhAnh') {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append('hinhAnh', values['hinhAnh']);
          }
        }
      }
      console.table('formData', [...formData])
      dispatch(capNhatCarouselAction(id, formData))
    }
  })

  let carousel = {};
  if (localStorage.getItem('filmParams')) {
      carousel = JSON.parse(localStorage.getItem('carouselParams'));
  }

  console.log('carousel',carousel)

  const handleChangeFile = async (e) => {
    //Lấy file ra từ e
    let file = e.target.files[0];
    if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {

      //Tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);//Hình base 64
        // setImgSrc(file); //Hình base 64
      }
      //Đem dữ liệu file lưu vào formik
      await formik.setFieldValue('hinhAnh', file);
    }
  }

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const tenPhim = (arrMovie.filter(film=>film.maPhim = formik.values.maPhim));
  console.log('tenPhim',tenPhim)

  return (
    <Form
      onSubmitCapture={formik.handleSubmit}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
    >
      <h3>Thêm mới phim </h3>
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Tên phim">
        <Input name="tenPhim" disabled className='text-dark' value={carousel.tenPhim} />
      </Form.Item>

      <Form.Item label="Hình ảnh">
        <input type="file" onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png" />
        <br />
        <img style={{ width: 150, height: 150 }} src={imgSrc === '' ? carouselEditDetail.hinhAnh : imgSrc} alt="..." />
      </Form.Item>

      <Form.Item label="Tác vụ">
        <button type="submit" className="bg-blue-300 text-white p-2">Cập nhật</button>
      </Form.Item>
    </Form>
  );
};

export default EditCarousel;