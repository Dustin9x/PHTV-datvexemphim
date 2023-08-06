import React from 'react'
import './Contact.css'
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { themFeedbackAction } from '../../redux/actions/QuanLyFeedbackAction';
import { Button, Form, Input } from 'antd';

export default function Contact() {
  const dispatch = useDispatch();
  // const [form] = Form.useForm();
  const { TextArea } = Input;

  const formik = useFormik({
    initialValues: {
      email: '',
      tieuDe: '',
      noiDung: '',
    },
    onSubmit: (values) => {

      let formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }
      console.table('formData123', [...formData])
      dispatch(themFeedbackAction(formData))
      formik.resetForm({
        values: { email: '', tieuDe: '', noiDung: '' },
      });
    }
  })

  return (
    <div className="">
      <div className="header__img-text">
        <Form className="bg-white dark:bg-gray-900 absolute rounded-xl" style={{ left: '50%', top: '30%', transform: 'translate(-50%)' }} onSubmitCapture={formik.handleSubmit}>
          <div className="py-8 px-12 mx-auto max-w-screen-md text-left">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white ">Liên Hệ Với Chúng Tôi</h2>
            <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Chúng tôi luôn lắng nghe bạn, hãy để lại cho chúng tôi một lời nhắn nhé!</p>
            <form className="space-y-8">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email của bạn</label>
                <Form.Item
                  label=""
                  name="email"
                  rules={[
                    {
                      type: 'email',
                      message: 'E-mail chưa đúng định dạng!',
                    },
                    {
                      required: true,
                      message: 'E-mail không được để trống!',
                    },
                  ]}
                >
                  <Input required className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" onChange={formik.handleChange} placeholder="Email" />
                </Form.Item>
              </div>
              <div>
                <label htmlFor="tieuDe" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tiêu đề</label>
                <Form.Item
                  label=""
                  name="tieuDe"
                  rules={[
                    {
                      required: true,
                      message: 'Tiêu đề không được để trống!',
                      transform: (value) => value.trim(),
                    },
                  ]}
                >
                  <Input required className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" onChange={formik.handleChange} placeholder="Bạn cần hỗ trợ về việc gì?" />
                </Form.Item>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="noiDung" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Nội dung</label>
                <Form.Item
                  label=""
                  name="noiDung"
                  rules={[
                    {
                      required: true,
                      message: 'Nội dung không được để trống!',
                      transform: (value) => value.trim(),
                    },
                  ]}
                >
                  <TextArea required rows={6} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={formik.handleChange} placeholder="Nội dung chi tiết" />
                </Form.Item>
              </div>
              <button type="submit" onSubmitCapture={formik.handleSubmit} className="py-3 px-5 font-medium text-center text-white rounded-lg bg-primary hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Gửi lời nhắn</button>
            </form>
          </div>
        </Form>
      </div>
      <div className="header__bg-dark header__with-img" style={{ height: '100vh' }}></div>
    </div>
  )
}
