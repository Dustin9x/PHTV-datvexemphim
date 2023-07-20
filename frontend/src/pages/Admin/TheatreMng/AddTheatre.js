import React, { useState } from 'react';
import {
  Form,
  Input,
  Radio,
  DatePicker,
  InputNumber,
  Switch,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { themHeThongRapAction } from '../../../redux/actions/QuanLyRapAction';

const AddTheatre = () => {
  const [componentSize, setComponentSize] = useState('default');
  const [imgSrc, setImgSrc] = useState('');
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      tenHeThongRap: '',
      logo: {},
    },
    onSubmit: (values) => {
      // Tạo đối tượng formdata => Đưa giá trị values từ formik vào formdata
      let formData = new FormData();
      for (let key in values) {
        if (key !== 'logo') {
          formData.append(key, values[key]);
        } else {
            // formData.append('hinhAnh', values.hinhAnh, values.hinhAnh.name);
            formData.append('logo', values['logo']);
        }
      }
      console.table('formData123',[...formData])
      dispatch(themHeThongRapAction(formData));
    }
  })


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
      formik.setFieldValue('logo', file);
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
        <h3>Thêm hệ thống rạp mới </h3>
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tên hệ thống rạp">
          <Input name="tenHeThongRap" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Logo">
          <input type="file" onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png" />
          <br />
          <img style={{ width: 150, height: 150 }} src={imgSrc} alt="..." />
        </Form.Item>

        <Form.Item label="Tác vụ">
          <button type="submit" className="bg-blue-300 text-white p-2">Thêm hệ thống rạp</button>
        </Form.Item>
      </Form>
  );
};

export default AddTheatre;