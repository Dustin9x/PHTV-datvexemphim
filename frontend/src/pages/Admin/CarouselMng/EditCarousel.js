import React, { useEffect, useState } from 'react';
import { Form, Button, Input } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatCarouselAction, layThongTinCarouselAction } from '../../../redux/actions/CarouselAction';

const EditCarousel = (props) => {
  const [imgSrc, setImgSrc] = useState('');
  const { carouselEditDetail } = useSelector(state => state.CarouselReducer)

  const dispatch = useDispatch();

  let { id } = props.match.params;
  useEffect(() => {
    dispatch(layThongTinCarouselAction(id));
  }, [])


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      duongDan: carouselEditDetail?.duongDan,
      hinhAnh: carouselEditDetail?.hinhAnh,
    },
    onSubmit: (values) => {
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


  const handleChangeFile = async (e) => {
    let file = e.target.files[0];
    if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      }
      await formik.setFieldValue('hinhAnh', file);
    }
  }

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
    >
      <h3 className="text-2xl">Chỉnh Sửa Carousel </h3>
      <Form.Item label="Hình ảnh">
        <input type="file" onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png" />
        <br />
        <img style={{ width: 200, height: 150, objectFit: 'cover', borderRadius: '6px' }} src={imgSrc === '' ? formik.values.hinhAnh : imgSrc} alt="..." />
      </Form.Item>
      <Form.Item label="Liên Kết">
        <Input name="duongDan" className='text-dark' onChange={formik.handleChange} value={formik.values.duongDan} />
      </Form.Item>
      <Form.Item label="Tác vụ">
        <Button htmlType="submit" >Cập nhật</Button>
      </Form.Item>
    </Form>
  );
};

export default EditCarousel;