import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatTinTucAction, layDanhSachTinTucAction } from '../../../redux/actions/QuanLyTinTucAction';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const NewsEdit = (props) => {
  const { detailTinTuc } = useSelector(state => state.NewsReducer)
  const { TextArea } = Input;
  const [imgSrc, setImgSrc] = useState('');
  const dispatch = useDispatch();

  let { id } = props.match.params;
  useEffect(() => {
    dispatch(layDanhSachTinTucAction(id));
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tieuDe: detailTinTuc?.tieuDe,
      tacGia: detailTinTuc?.tacGia,
      noiDungPhu: detailTinTuc?.noiDungPhu,
      noiDung: detailTinTuc?.noiDung,
      theLoai: detailTinTuc?.theLoai,
      hinhAnh: detailTinTuc?.hinhAnh,
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
      dispatch(capNhatTinTucAction(id, formData))
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
        span: 14,
      }}
      layout="horizontal"
    >
      <h3>Chỉnh sửa bài viết </h3>
      <div className='row'>
        <div className='col-8'>
          <Form.Item label="Tiêu Đề">
            <Input name="tieuDe" onChange={formik.handleChange} value={formik.values.tieuDe} />
          </Form.Item>
          <Form.Item label="Tác Giả">
            <Input name="tacGia" onChange={formik.handleChange} value={formik.values.tacGia} />
          </Form.Item>
          <Form.Item label="Thể Loại">
            <Input name="theLoai" onChange={formik.handleChange} value={formik.values.theLoai} />
          </Form.Item>
          <Form.Item label="Nội Dung Phụ">
            <TextArea rows={4} name="noiDungPhu" onChange={formik.handleChange} value={formik.values.noiDungPhu} />
          </Form.Item>
          <Form.Item label="Nội Dung">
            <CKEditor className='rounded-lg overflow-hidden' name="noiDung" editor={ClassicEditor} onChange={(event, editor) => { handleChangeContent(event, editor) }}
              data={formik.values.noiDung}
              onReady={(editor) => {
                editor.editing.view.change((writer) => {
                  writer.setStyle(
                    "height",
                    "200px",
                    editor.editing.view.document.getRoot(),
                  );
                });
              }}
            ></CKEditor>
          </Form.Item>
          <Form.Item label="Tác vụ">
            <Button htmlType="submit" >Cập nhật</Button>
          </Form.Item>
        </div>
        <div className='col-4'>
          <h3>Hình minh họa </h3>
          <Form.Item label="">
            <input type="file" onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png" />
            <br />
            <img style={{ width: 200, height: 150, objectFit: 'cover', borderRadius: '6px' }} src={imgSrc === '' ? detailTinTuc.hinhAnh : imgSrc} alt="..." />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default NewsEdit;