import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { themTinTucAction } from '../../../redux/actions/QuanLyTinTucAction';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { isAxiosError } from 'axios';
import { isError, isNull, isUndefined } from 'lodash';

const AddNews = () => {
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
      console.log(values)
      if (values.tieuDe == '' || values.tacGia == '' || values.noiDungPhu == '' || values.noiDung == '' || values.theLoai == '') {
        alert('Vui lòng nhập đầy đủ thông tin')
      } else {
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
    }
  })


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
            <Button htmlType="submit" >Thêm bài viết</Button>
          </Form.Item>
        </div>
        <div className='col-4'>
          <h3>Hình minh họa </h3>
          <Form.Item label="">
            <input required type="file" onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png" />
            <br />
            {/* <img style={{ width: 150, height: 150 }} src={imgSrc} alt="..." /> */}
            {imgSrc ? <img style={{ width: 200, height: 150, objectFit: 'cover', borderRadius: '6px' }} src={imgSrc} alt="..." /> : <img style={{ width: 200, border: '0.1px solid #ccc', borderRadius: '6px' }} src='/img/placeholder-image.jpg' alt="..." />}
          </Form.Item>
        </div>
      </div>



    </Form>
  );
};

export default AddNews;