import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { capNhatBinhLuanAction, layChiTietBinhLuanAction, layDanhSachBinhLuanAction, layDanhSachTinTucAction, themBinhLuanAction, xoaBinhLuanAction } from '../../redux/actions/QuanLyTinTucAction';
import { Card, Avatar, Form, Input, Popover, Button } from 'antd';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import { GET_BINH_LUAN_DETAIL } from '../../redux/constants';
import { TOKEN } from '../../util/settings/config';

export default function NewsDetail(props) {
    const { TextArea } = Input;
    const { arrBinhLuan, detailTinTuc, detailBinhLuan } = useSelector(state => state.NewsReducer);
    const { userLogin } = useSelector(state => state.UserReducer)

    console.log('detailBinhLuan', detailBinhLuan)

    const dispatch = useDispatch();

    let { id } = props.match.params;
    useEffect(() => {
        dispatch(layDanhSachTinTucAction(id))
        dispatch(layDanhSachBinhLuanAction(id))
    }, [])


    const [form] = Form.useForm();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maBaiViet: id,
            username: userLogin.name,
            useremail: userLogin.email,
            comment: detailBinhLuan?.comment,
        },
        onSubmit: (values) => {
            let formData = new FormData();
            for (let key in values) {
                formData.append(key, values[key]);
            }
            console.table('formData123', [...formData])
            if (!detailBinhLuan.maComment) {
                dispatch(themBinhLuanAction(id, formData))
            } else {
                dispatch(capNhatBinhLuanAction(detailBinhLuan.maComment, formData))
                dispatch(layDanhSachBinhLuanAction(id))
                dispatch({
                    type: GET_BINH_LUAN_DETAIL,
                    detailBinhLuan: {}
                })
            }
            // dispatch(themBinhLuanAction(id, formData))
            form.resetFields();
            // localStorage.removeItem("commentEdit");
        }
    })

    const renderBinhLuan = () => {
        return arrBinhLuan.map((item, index) => {
            const content = (
                <div className='d-flex flex-col'>
                    <Button className='btn' type='link' onClick={() => {
                        dispatch(layChiTietBinhLuanAction(item.maComment))
                    }}>Sửa</Button>
                    <Button className='btn' danger type='link' onClick={() => {
                        if (window.confirm('Bạn có chắc chắn muốn xóa bình luận này?')) {
                            dispatch(xoaBinhLuanAction(item.maComment))
                            dispatch(layDanhSachBinhLuanAction(id))
                        }

                    }

                    }>Xóa</Button>
                </div>
            );
            return <Card
                className='d-flex my-3 w-full no-underline'
                style={{ minHeight: 130, overflow: 'hidden' }}
                bodyStyle={{ width: '100%' }}

            >
                <div className='d-flex align-center'>
                    <Avatar size={40} style={{ fontSize: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} icon={item?.username.substr(0, 1)} />
                    <div className='w-full'>
                        <p className='my-auto m-3 text-danger'>{item.username}</p>
                        <p className='my-auto ml-3'>{dayjs(item.created_at).format('DD-MM-YYYY')}</p>
                    </div>
                    {item.useremail === userLogin.email ? <Popover placement="bottomRight" content={content} trigger="hover">
                        <div className='btn cursor-pointer px-3 border-none drop-shadow-none hover:bg-gray-100'>...</div>
                    </Popover> : ''}

                </div>

                <div className='text-slate-700 mt-3'> {item.comment} </div>
            </Card>
        }).reverse()

    }

    return (
        <div>
            <div className='container' >
                <div className='d-flex items-center absolute z-10' style={{top:'28%'}}>
                    <div className='container' >
                        <h2 class=" text-white drop-shadow-md text-5xl">{detailTinTuc.tieuDe}</h2>
                        <div class="text-white end__text drop-shadow-md">{detailTinTuc.noiDungPhu}</div>
                    </div>

                </div>
            </div>

            <div className='' style={{ backgroundImage: `url(${detailTinTuc.hinhAnh})`, height: 700, backgroundSize: 'cover', filter:'brightness(0.5)' }}>


            </div>
            <div className='container relative z-10 bg-white p-10 shadow-lg mb-10 rounded-lg' style={{ marginTop: '-120px' }}>
                <div className='row'>
                    <div className='col-8'>
                        <div className='mb-5'>
                            <div className='d-flex justify-between p-3'>
                                <div className='d-flex'>
                                    <p className='text-danger rounded-full border  border-indigo-700 p-2'>{detailTinTuc.tacGia}</p>
                                    <p className='ml-3 p-2'>{detailTinTuc.theLoai}</p>
                                </div>

                                <p className='text-gray-400 p-2'>{dayjs(detailTinTuc.created_at).format('DD-MM-YYYY')}</p>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: detailTinTuc.noiDung }}></div>
                        </div>
                        <hr></hr>
                        <h1 className='mt-5 text-xl'>Bình Luận Từ Người Xem</h1>
                        <div className='bg-light rounded-xl p-2 mb-5 '>

                            {(localStorage.getItem(TOKEN)) ? <Form form={form} onSubmitCapture={formik.handleSubmit} className='w-full d-flex flex-col items-end' >
                                <Form.Item label="" className='mb-2 w-full' >
                                    <TextArea name='comment' allowClear rows={4} placeholder='nhập bình luận' onChange={formik.handleChange} value={formik.values.comment} />
                                </Form.Item>
                                <button type="submit" className="bg-blue-700 rounded-full text-white p-2 px-5">Gửi</button>
                            </Form> : <Button href="/login" className='w-full'>Vui lòng đăng nhập để bình luận</Button>}

                        </div>
                        {renderBinhLuan()}


                    </div>
                    <div className='col-4'>
                        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-md md:flex-row w-full my-3">
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Bài Viết Mới Nhất</h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                                    
                                    </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}