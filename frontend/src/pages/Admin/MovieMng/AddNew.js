import React, { useState } from 'react';
import { Form, Input, DatePicker, InputNumber, Switch, Button } from 'antd';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { themPhimUploadHinhAction } from '../../../redux/actions/QuanLyPhimAction';
import dayjs from 'dayjs';
import { isDate, isError, isNaN } from 'lodash';

const AddNew = () => {
  const dispatch = useDispatch();
  const [imgSrc, setImgSrc] = useState('');
  const dateFormat = 'DD-MM-YYYY';
  const { TextArea } = Input;

  const formik = useFormik({
    initialValues: {
      tenPhim: '',
      trailer: '',
      moTa: '',
      ngayKhoiChieu: '',
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
    },
    onSubmit: (values) => {
      if (values.tenPhim == '' || values.trailer == '' || values.moTa == '' || values.ngayKhoiChieu == 'Invalid Date' || values.danhGia == '') {
        alert('Vui lòng nhập đầy đủ thông tin')
      } else {
        let formData = new FormData();
        for (let key in values) {
          if (key !== 'hinhAnh') {
            formData.append(key, values[key]);
          } else {
            formData.append('hinhAnh', values['hinhAnh']);
          }
        }
          console.table('formData123', [...formData])
          dispatch(themPhimUploadHinhAction(formData));
      }
      
    }
  })

  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = dayjs(value).format('YYYY-MM-DD');
    formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu);
  }

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value)
    }
  }

  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    }
  }

  const handleChangeFile = (e) => {
    let file = e.target.files[0];

    if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      }
      formik.setFieldValue('hinhAnh', file);
    }
  }


  return (
    <Form
      onSubmitCapture={formik.handleSubmit}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 16,
      }}
      layout="horizontal"
    >
      <h3 className="text-2xl">Thêm phim mới</h3>
      <div className='row'>
        <div className='col-8'>
          <Form.Item label="Tên phim">
            <Input name="tenPhim" onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Trailer">
            <Input name="trailer" onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Mô tả">
            <TextArea name="moTa" allowClear rows={4} onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Ngày khởi chiếu">
            {/* format={"DD/MM/YYYY"} */}
            <DatePicker format={dateFormat} onChange={handleChangeDatePicker} />
          </Form.Item>
          <Form.Item label="Đang chiếu" >
            <Switch onChange={handleChangeSwitch('dangChieu')} />
          </Form.Item>
          <Form.Item label="Sắp chiếu">
            <Switch onChange={handleChangeSwitch('sapChieu')} />
          </Form.Item>
          <Form.Item label="Hot">
            <Switch onChange={handleChangeSwitch('hot')} />
          </Form.Item>

          <Form.Item label="Số sao">
            <InputNumber onChange={handleChangeInputNumber('danhGia')} min={1} max={10} />
          </Form.Item>
          <Form.Item label="Tác vụ">
            <Button htmlType="submit" >Thêm phim</Button>
          </Form.Item>
        </div>
        <div className='col-4'>
          <h3>Hình minh họa </h3>
          <Form.Item label="">
            <input required type="file" onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png" />
            <br />
            {imgSrc ? <img style={{ width: 200, height: 150, objectFit: 'cover', borderRadius: '6px' }} src={imgSrc} alt="..." /> : <img style={{ width: 200, border: '0.1px solid #ccc', borderRadius: '6px' }} src='/img/placeholder-image.jpg' alt="..." />}
          </Form.Item>
        </div>
      </div>

    </Form>
  );
};

export default AddNew;