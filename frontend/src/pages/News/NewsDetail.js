import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { capNhatBinhLuanAction, layChiTietBinhLuanAction, layDanhSachBinhLuanAction, layDanhSachTinTucAction, themBinhLuanAction, xoaBinhLuanAction } from '../../redux/actions/QuanLyTinTucAction';
import { Card, Avatar, Form, Input, Popover, Button, List, Pagination } from 'antd';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import { GET_BINH_LUAN_DETAIL } from '../../redux/constants';
import { TOKEN } from '../../util/settings/config';
import { layDanhSachNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';

export default function NewsDetail(props) {
    const { TextArea } = Input;
    const { arrBinhLuan, arrTinTuc, detailTinTuc, detailBinhLuan } = useSelector(state => state.NewsReducer);
    const { userLogin, arrUser } = useSelector(state => state.UserReducer)

    const dispatch = useDispatch();

    let { id } = props.match.params;
    useEffect(() => {
        dispatch(layDanhSachTinTucAction(id))
        dispatch(layDanhSachBinhLuanAction(id))
        dispatch(layDanhSachTinTucAction())
        dispatch(layDanhSachNguoiDungAction())
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
            if (!detailBinhLuan.maComment && !!values.comment !== '') {
                dispatch(themBinhLuanAction(id, formData))
            } else {
                dispatch(capNhatBinhLuanAction(detailBinhLuan.maComment, formData))
                dispatch(layDanhSachBinhLuanAction(id))
                dispatch({
                    type: GET_BINH_LUAN_DETAIL,
                    detailBinhLuan: {}
                })
            }
            values.comment = '';
        }
    })

    //Phan trang
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const reveseArrBinhLuan = arrBinhLuan.slice().reverse()
    const currentArrBinhLuan = reveseArrBinhLuan.slice(indexOfFirstPost, indexOfLastPost);

    const renderBinhLuan = () => {
        return currentArrBinhLuan.map((item, index) => {
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
                    }}>Xóa</Button>
                </div>
            );
            return <Card
                className='d-flex my-3 w-full no-underline'
                style={{ minHeight: 130, overflow: 'hidden' }}
                bodyStyle={{ width: '100%' }}
            >
                <div className='d-flex align-center'>
                    {arrUser.find(us => us.email == item.useremail)?.avatar !== null
                        ? <div style={{ width: 40, height: 40, minWidth: '40px', minHeight: 40, backgroundSize: 'cover', borderRadius: '50%', backgroundImage: `url(${arrUser.find(us => us.email == item.useremail)?.avatar})` }} />
                        : <Avatar size={40} style={{ fontSize: '28px', lineHeight: '32px' }} icon={item.username.substr(0, 1)} />}
                    <div className='w-full'>
                        <p className='my-auto m-3 text-danger'>{item.username}</p>
                        <p className='my-auto ml-3'>{dayjs(item.created_at).format('DD-MM-YYYY')}</p>
                    </div>
                    {item.useremail === userLogin.email || userLogin.role === 'QuanTri' || userLogin.role === 'Super' ? <Popover placement="bottomRight" content={content} trigger="hover">
                        <div className='btn cursor-pointer px-3 border-none drop-shadow-none hover:bg-gray-100'>...</div>
                    </Popover> : ''}

                </div>

                <div className='text-slate-700 mt-3'> {item.comment} </div>
            </Card>
        })
    }

    return (
        <div>
            <div className='container' >
                <div className='d-flex items-center absolute z-10' style={{ top: '28%' }}>
                    <div className='container' >
                        <h2 className=" text-white drop-shadow-md text-5xl">{detailTinTuc.tieuDe}</h2>
                        <div className="text-white end__text drop-shadow-md">{detailTinTuc.noiDungPhu}</div>
                    </div>

                </div>
            </div>

            <div className='' style={{ backgroundImage: `url(${detailTinTuc.hinhAnh})`, height: 700, backgroundSize: 'cover', filter: 'brightness(0.5)' }}>


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
                                    <TextArea
                                        name='comment' allowClear rows={4} placeholder='nhập bình luận' onChange={formik.handleChange} value={formik.values.comment} />
                                </Form.Item>
                                <button disabled={!formik.values.comment?.trim()} type="submit" className="bg-blue-700 disabled:opacity-25 rounded-full text-white p-2 px-5">Gửi</button>
                            </Form> : <Button href="/login" className='w-full'>Vui lòng đăng nhập để bình luận</Button>}

                        </div>
                        {renderBinhLuan()}
                        <Pagination className='d-flex justify-center line-clamp-3 mb-20' pageSize={postsPerPage} currentPage={currentPage} total={arrBinhLuan.length} onChange={(page) => { setCurrentPage(page) }} />


                    </div>
                    <div className='col-4'>
                        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-md md:flex-row w-full my-3">
                            <div className="flex flex-col justify-between p-4 leading-normal w-full">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Bài Viết Mới Nhất</h5>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={arrTinTuc.slice(-5).reverse()}
                                    renderItem={(item, index) => (
                                        <List.Item>
                                            <div className='d-flex mb-1 mt-1 w-full font-normal text-gray-700 dark:text-gray-400'>
                                                <img className='rounded-md' src={item.hinhAnh} alt={item.hinhAnh} style={{ width: 140, height: 110, objectFit: 'cover' }} />
                                                <div className='p-2'>
                                                    <a className='text-md font-bold' href={`/news/detail/${item.maBaiViet}`}>{item.tieuDe}</a>
                                                    <div className='text-ellipsis overflow-hidden line-clamp-2'>{item.noiDungPhu}</div>
                                                </div>
                                            </div>
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
