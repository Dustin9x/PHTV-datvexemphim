import React, { useEffect } from 'react'
import { Form, Button, Typography, Input, DatePicker } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatFeedbackAction, layDanhSachFeedbackAction } from '../../../redux/actions/QuanLyFeedbackAction';
import dayjs from 'dayjs';

export default function EditFeedback(props) {
    const { TextArea } = Input;
    const { feedbackEditDetail } = useSelector(state => state.FeedbackReducer);
    const dispatch = useDispatch();
    let { id } = props.match.params
    useEffect(() => {
        dispatch(layDanhSachFeedbackAction(id))
    }, [])
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: feedbackEditDetail?.email,
            tieuDe: feedbackEditDetail?.tieuDe,
            noiDung: feedbackEditDetail?.noiDung,
            ngayXuLy: dayjs().format('YYYY-MM-DD'),
            noiDungXuLy: feedbackEditDetail?.noiDungXuLy
        },
        onSubmit: async (values) => {
            let formData = new FormData();
            for (let key in values) {
                formData.append(key, values[key]);
            }
            console.table('formData', [...formData])
            dispatch(capNhatFeedbackAction(id, formData));
        }
    })

    const handleChangeDatePicker = (value) => {
        let ngayXuLy = dayjs(value).format('YYYY-MM-DD');
        formik.setFieldValue('ngayXuLy', ngayXuLy);
    }

    return (
        <div className="container">
            <Form
                name="basic"
                onSubmitCapture={formik.handleSubmit}
            >
                <h3 className="text-2xl">Xử Lý Feedback</h3>
                <Typography>
                    <pre>Email: {formik.values.email}</pre>
                </Typography>
                <Typography>
                    <pre>Tiêu Đề: {formik.values.tieuDe}</pre>
                </Typography>
                <Typography>
                    <pre>Nội Dung: {formik.values.noiDung}</pre>
                </Typography>
                {/* <Form.Item>
                    Ngày Xử Lý: <br />
                    {feedbackEditDetail?.ngayXuLy
                        ? <DatePicker format={'DD-MM-YYYY'} value={dayjs(formik.values.ngayXuLy, 'YYYY-MM-DD')} onChange={handleChangeDatePicker} />
                        : <DatePicker format={'DD-MM-YYYY'} onChange={handleChangeDatePicker} />
                    }
                </Form.Item> */}
                <Form.Item>
                    Nội Dung Xử Lý: <br />
                    <TextArea rows={8} name="noiDungXuLy" value={formik.values.noiDungXuLy} onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item >
                    <Button htmlType="submit">Cập Nhật</Button>
                </Form.Item>
            </Form>
        </div>
    )
}