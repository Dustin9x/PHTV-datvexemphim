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
import { capNhatTinTucAction, layDanhSachTinTucAction } from '../../../redux/actions/QuanLyTinTucAction';

const NewsEdit = (props) => {
  const [componentSize, setComponentSize] = useState('default');
  const {detailTinTuc} = useSelector(state => state.NewsReducer)
  const { TextArea } = Input;
  const [imgSrc, setImgSrc] = useState('');
  const dispatch = useDispatch();

  console.log('detailTinTuc',detailTinTuc)
  let {id} =  props.match.params;
  useEffect(()=>{
    // let {id} =  props.match.params;
    dispatch(layDanhSachTinTucAction(id));
  },[])

  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      tieuDe: detailTinTuc?.tieuDe,
      tacGia: detailTinTuc?.tacGia,
      noiDungPhu: detailTinTuc?.noiDungPhu,
      noiDung: detailTinTuc?.noiDung,
      theLoai: detailTinTuc?.theLoai,
      hinhAnh: detailTinTuc?.hinhAnh,
    },
    onSubmit: (values) => {
      // Tạo đối tượng formdata => Đưa giá trị values từ formik vào formdata
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
      console.table('formData',[...formData])
      dispatch(capNhatTinTucAction(id,formData))
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
        <h3>Chỉnh sửa bài viết </h3>
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tiêu Đề">
          <Input name="tieuDe" onChange={formik.handleChange} value={formik.values.tieuDe}/>
        </Form.Item>
        <Form.Item label="Tác Giả">
          <Input name="tacGia" onChange={formik.handleChange} value={formik.values.tacGia}/>
        </Form.Item>
        <Form.Item label="Thể Loại">
          <Input name="theLoai" onChange={formik.handleChange} value={formik.values.theLoai}/>
        </Form.Item>
        <Form.Item label="Nội Dung Phụ">
          <TextArea rows={4} name="noiDungPhu" onChange={formik.handleChange} value={formik.values.noiDungPhu}/>
        </Form.Item>
        <Form.Item label="Nội Dung">
          <TextArea rows={10} name="noiDung" onChange={formik.handleChange} value={formik.values.noiDung}/>
        </Form.Item>

        <Form.Item label="Hình ảnh">
          <input type="file" onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png" />
          <br />
          <img style={{ width: 150, height: 150 }} src={imgSrc===''? detailTinTuc.hinhAnh : imgSrc} alt="..." />
        </Form.Item>

        <Form.Item label="Tác vụ">
          <button type="submit" className="bg-blue-300 text-white p-2">Cập nhật</button>
        </Form.Item>
      </Form>
  );
};

export default NewsEdit;