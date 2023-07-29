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
          values: { email: '', tieuDe: '', noiDung:'' },
        });
      }
  })

  return (
    <div class="">
      <Form className="bg-white dark:bg-gray-900" onSubmitCapture={formik.handleSubmit}>
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
          <form action="#" className="space-y-8">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
              <Input type="email" required name="email" onChange={formik.handleChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@flowbite.com" />
            </div>
            <div>
              <label htmlFor="tieuDe" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
              <Input type="text" required name="tieuDe" onChange={formik.handleChange} className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="noiDung" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
              <TextArea required name="noiDung" onChange={formik.handleChange} rows={6} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..." defaultValue={""} />
            </div>
            <Button htmlType="submit" onSubmitCapture={formik.handleSubmit} className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</Button>
          </form>
        </div>
      </Form>

    </div>
  )
}
