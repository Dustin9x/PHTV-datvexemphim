import React, { useEffect, useState } from 'react';
import { Form, Input, DatePicker, InputNumber, Switch, Button } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatPhimUploadAction, layThongTinPhimAction } from '../../../redux/actions/QuanLyPhimAction';
import dayjs from 'dayjs';

const Edit = (props) => {
  const dispatch = useDispatch();
  const { movieEditDetail } = useSelector(state => state.MovieReducer)
  const [imgSrc, setImgSrc] = useState('');
  const dateFormat = 'DD-MM-YYYY';

  let { id } = props.match.params;
  let film = {};
  if (localStorage.getItem('filmParams')) {
    film = JSON.parse(localStorage.getItem('filmParams'));
  }
  useEffect(() => {
    dispatch(layThongTinPhimAction(id));
  }, [dispatch, id])


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tenPhim: movieEditDetail?.tenPhim,
      trailer: movieEditDetail?.trailer,
      moTa: movieEditDetail?.moTa,
      ngayKhoiChieu: '' || movieEditDetail.ngayKhoiChieu,
      dangChieu: movieEditDetail?.dangChieu === 1 ? true : false,
      sapChieu: movieEditDetail?.sapChieu === 1 ? true : false,
      hot: movieEditDetail?.hot === 1 ? true : false,
      danhGia: movieEditDetail?.danhGia,
      hinhAnh: movieEditDetail?.hinhAnh,
    },
    onSubmit: (values) => {
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
      dispatch(capNhatPhimUploadAction(id, formData))
    }
  })

  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = dayjs(value, dateFormat).format('YYYY-MM-DD');
    formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu);

  }
  let defaultDate = dayjs(film.ngayKhoiChieu).format(dateFormat)

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

  const handleChangeFile = async (e) => {
    let file = e.target.files[0];
    if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);//Hình base 64
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
      <h3 className="text-2xl">Chỉnh sửa phim: {formik.values.tenPhim}</h3>
      <div className='row'>
        <div className='col-8'>
          <Form.Item label="Tên phim">
            <Input name="tenPhim" className='text-dark' disabled onChange={formik.handleChange} value={formik.values.tenPhim} />
          </Form.Item>
          <Form.Item label="Trailer">
            <Input name="trailer" onChange={formik.handleChange} value={formik.values.trailer} />
          </Form.Item>
          <Form.Item label="Mô tả">
            <Input name="moTa" onChange={formik.handleChange} value={formik.values.moTa} />
          </Form.Item>
          <Form.Item label="Ngày khởi chiếu"   >
            <DatePicker onChange={handleChangeDatePicker} defaultValue={dayjs(defaultDate, dateFormat)} format={dateFormat} />
          </Form.Item>
          <Form.Item label="Đang chiếu" >
            <Switch onChange={handleChangeSwitch('dangChieu')} checked={formik.values.dangChieu} />
          </Form.Item>
          <Form.Item label="Sắp chiếu">
            <Switch onChange={handleChangeSwitch('sapChieu')} checked={formik.values.sapChieu} />
          </Form.Item>
          <Form.Item label="Hot">
            <Switch onChange={handleChangeSwitch('hot')} checked={formik.values.hot} />
          </Form.Item>
          <Form.Item label="Số sao">
            <InputNumber onChange={handleChangeInputNumber('danhGia')} min={1} max={10} value={formik.values.danhGia} />
          </Form.Item>
          <Form.Item label="Tác vụ">
            <Button htmlType="submit">Cập nhật</Button>
          </Form.Item>
        </div>
        <div className='col-4'>
        <h3>Hình minh họa </h3>
          <Form.Item label="">
            <input type="file" onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png" />
            <br />
            <img style={{ width: 200, height: 150, objectFit: 'cover', borderRadius: '6px' }} src={imgSrc === '' ? movieEditDetail.hinhAnh : imgSrc} alt="..." />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default Edit;