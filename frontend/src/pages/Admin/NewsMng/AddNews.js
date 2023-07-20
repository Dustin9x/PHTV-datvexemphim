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
import { themTinTucAction } from '../../../redux/actions/QuanLyTinTucAction';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const AddNews = () => {
  const [componentSize, setComponentSize] = useState('default');
  const [imgSrc, setImgSrc] = useState('');
  const { TextArea } = Input;
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      tieuDe: '',
      tacGia: '',
      noiDungPhu: '',
      noiDung: '',
      theLoai: '',
      hinhAnh: {},
    },
    onSubmit: (values) => {
      // Tạo đối tượng formdata => Đưa giá trị values từ formik vào formdata
      let formData = new FormData();
      for (let key in values) {
        if (key !== 'hinhAnh') {
          formData.append(key, values[key]);
        }
        else {
          formData.append('hinhAnh', values['hinhAnh']);
        }
      }
      console.table('formData123', [...formData])
      dispatch(themTinTucAction(formData));
    }
  })


  const handleChangeFile = (e) => {
    let file = e.target.files[0];

    if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {
      // Tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      }
      formik.setFieldValue('hinhAnh', file);
    }
  }


  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleChangeContent = (e, editor) => {
    const data = editor.getData();
    formik.setFieldValue('noiDung', data)
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
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
    >
      <h3>Thêm bài viết mới </h3>
      <div className='row'>
        <div className='col-8'>
          <Form.Item label="Tiêu Đề">
            <Input name="tieuDe" onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Tác Giả">
            <Input name="tacGia" onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Thể Loại">
            <Input name="theLoai" onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Nội Dung Phụ">
            <TextArea rows={4} name="noiDungPhu" onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Nội Dung">
            <CKEditor className='rounded-lg overflow-hidden' name="noiDung" editor={ClassicEditor} onChange={(event, editor) => { handleChangeContent(event, editor) }}
              onReady={(editor) => {
                editor.editing.view.change((writer) => {
                  writer.setStyle(
                    "height",
                    "200px",
                    editor.editing.view.document.getRoot()
                  );
                });
              }}
            ></CKEditor>
          </Form.Item>
          <Form.Item label="Tác vụ">
            <button type="submit" className="bg-blue-700 text-white p-2">Thêm bài viết</button>
          </Form.Item>
        </div>
        <div className='col-4'>
          <h3>Hình minh họa </h3>
          <Form.Item label="">
            <input type="file" onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png" />
            <br />
            <img style={{ width: 150, height: 150 }} src={imgSrc} alt="..." />
          </Form.Item>
        </div>
      </div>



    </Form>
  );
};

export default AddNews;