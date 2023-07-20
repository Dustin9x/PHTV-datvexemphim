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
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { capNhatPhimUploadAction } from '../../../redux/actions/QuanLyPhimAction';
import { capNhatHeThongRapAction, layDanhSachHeThongRapAction } from '../../../redux/actions/QuanLyRapAction';

const TheatreEdit = (props) => {
  const [componentSize, setComponentSize] = useState('default');
  const {heThongRapChieu} = useSelector(state => state.RapReducer)
  const [imgSrc, setImgSrc] = useState('');
  const dispatch = useDispatch();

  let {id} =  props.match.params;
  useEffect(()=>{
    // let {id} =  props.match.params;
    dispatch(layDanhSachHeThongRapAction(id));
  },[])

  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      // maPhim: movieEditDetail.maPhim,
      tenHeThongRap: heThongRapChieu?.tenHeThongRap,
      logo: heThongRapChieu?.logo,
    },
    onSubmit: (values) => {
      // Tạo đối tượng formdata => Đưa giá trị values từ formik vào formdata
      let formData = new FormData();
      for (let key in values) {
        if (key !== 'logo') {
          formData.append(key, values[key]);
        } else {
          if (values.logo !== null) {
            formData.append('logo', values['logo']);
          } 
        }
      }
      console.table('formData',[...formData])
      dispatch(capNhatHeThongRapAction(id,formData))
    }
  })

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
await formik.setFieldValue('logo', file);
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
        <Form.Item label="Tên hệ thống rạp">
          <Input name="tenHeThongRap" onChange={formik.handleChange}  value={formik.values.tenHeThongRap}/>
        </Form.Item>

        <Form.Item label="Hình ảnh">
          <input type="file" onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png" />
          <br />
          <img style={{ width: 150, height: 150 }} src={imgSrc===''? heThongRapChieu.logo : imgSrc} alt="..." />
        </Form.Item>

        <Form.Item label="Tác vụ">
          <button type="submit" className="bg-blue-300 text-white p-2">Cập nhật</button>
        </Form.Item>
      </Form>
  );
};

export default TheatreEdit;