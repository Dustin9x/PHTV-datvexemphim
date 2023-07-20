import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Radio,
  DatePicker,
  InputNumber,
  Switch,
} from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { capNhatPhimUploadAction, layThongTinPhimAction, themPhimUploadHinhAction } from '../../../redux/actions/QuanLyPhimAction';
import dayjs from 'dayjs';

const Edit = (props) => {
  const [componentSize, setComponentSize] = useState('default');
  const { movieEditDetail } = useSelector(state => state.MovieReducer)
  const [imgSrc, setImgSrc] = useState('');
  const dispatch = useDispatch();
  const dateFormat = 'DD-MM-YYYY';

  let { id } = props.match.params;
  let film = {};
  if (localStorage.getItem('filmParams')) {
    film = JSON.parse(localStorage.getItem('filmParams'));
  }
  useEffect(() => {
    dispatch(layThongTinPhimAction(id));
  }, [])


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      // maPhim: movieEditDetail.maPhim,
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

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

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
        <Input name="tenPhim" onChange={formik.handleChange} value={formik.values.tenPhim} />
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

      <Form.Item label="Hình ảnh">
        <input type="file" onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png" />
        <br />
        <img style={{ width: 150, height: 150 }} src={imgSrc === '' ? movieEditDetail.hinhAnh : imgSrc} alt="..." />
      </Form.Item>

      <Form.Item label="Tác vụ">
        <button type="submit" className="bg-blue-300 text-white p-2">Cập nhật</button>
      </Form.Item>
    </Form>
  );
};

export default Edit;