import React, { useState } from 'react'
import './Detail.css'
import { Tabs, Rate, Tag, Button, Form, Input, Card, Avatar, Popover, List, Pagination } from 'antd';
import moment from 'moment/moment';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { capNhatBinhLuanPhimAction, layChiTietBinhLuanPhimAction, layDanhSachBinhLuanPhimAction, layThongTinPhimAction, themBinhLuanPhimAction, xoaBinhLuanPhimAction } from '../../redux/actions/QuanLyPhimAction';
import { layLichChieuTheoPhimAction } from '../../redux/actions/QuanLyDatVeAction';
import dayjs from 'dayjs'
import _ from 'lodash';
import { GET_BINH_LUAN_DETAIL_PHIM } from '../../redux/constants';
import { useFormik } from 'formik';
import { TOKEN } from '../../util/settings/config';
import { layDanhSachNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';
const { TabPane } = Tabs;

export default function Detail(props) {
    const { TextArea } = Input;
    const { movieEditDetail } = useSelector(state => state.MovieReducer);
    const { lichChieuTheoPhim } = useSelector(state => state.QuanLyDatVeReducer);
    const { userLogin } = useSelector(state => state.UserReducer)
    const { arrUser } = useSelector(state => state.UserReducer)
    const { arrBinhLuanPhim } = useSelector(state => state.MovieReducer);
    const { detailBinhLuanPhim } = useSelector(state => state.MovieReducer);
    const dispatch = useDispatch();
    let { id } = props.match.params;
    useEffect(() => {
        dispatch(layThongTinPhimAction(id))
        dispatch(layLichChieuTheoPhimAction(id))
        dispatch(layDanhSachBinhLuanPhimAction(id))
        dispatch(layDanhSachNguoiDungAction())
    }, [])

    //Loc lich chieu theo rap
    const [lichChieuTheoRap, setLichChieuTheoRap] = useState(lichChieuTheoPhim.filter((item) => item.ngayChieu === ""));
    const handleClick = (event) => {
        let clickNgayChieu = event.target.name;
        let lichChieuTheoRap = lichChieuTheoPhim.filter(item => item.ngayChieu === clickNgayChieu)
        setLichChieuTheoRap(lichChieuTheoRap);
    };
    let listNgayChieu = lichChieuTheoPhim.map(item => item.ngayChieu).filter((item, index, arr) => arr.indexOf(item) === index)
    let listTinhThanh = _.uniq(_.flattenDeep(lichChieuTheoRap.map((rapchieu, index) => {
        return rapchieu.rapchieu.map((tinhthanh, index) => tinhthanh.tinhthanh)
    })))
    const today = dayjs().format('YYYY-MM-DD')
    const now = dayjs(new Date().getTime()).format('HH:mm');
    let listNgayChieuActive = listNgayChieu.filter(e => e >= today)

    //Loc cum rap theo tinh
    let uniqueTinhThanh = [...new Map(listTinhThanh.map((item) => [item["maTinh"], item])).values(),];
    const noNullCumRap = _.uniqBy(_.flatten(lichChieuTheoRap.map(item => item.rapchieu)), 'maRap')
    const [cumRaptheotinh, setCumRaptheotinh] = useState(noNullCumRap);
    const handleClickRap = (event) => {
        let clickTinhThanh = Number(event.target.name);
        let cumRaptheotinh = noNullCumRap.filter(item => item.maTinh_id === clickTinhThanh)
        setCumRaptheotinh(cumRaptheotinh);
    };

    //Phan trang
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const reveseArrBinhLuanPhim = arrBinhLuanPhim.slice().reverse()
    const currentArrBinhLuan = reveseArrBinhLuanPhim.slice(indexOfFirstPost, indexOfLastPost);


    const [form] = Form.useForm();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: id,
            username: userLogin.name,
            useremail: userLogin.email,
            comment: detailBinhLuanPhim?.comment,
        },
        onSubmit: (values) => {
            let formData = new FormData();
            for (let key in values) {
                formData.append(key, values[key]);
            }
            console.table('formData123', [...formData])
            if (!detailBinhLuanPhim.maComment) {
                dispatch(themBinhLuanPhimAction(id, formData))
            } else {
                dispatch(capNhatBinhLuanPhimAction(detailBinhLuanPhim.maComment, formData))
                dispatch(layDanhSachBinhLuanPhimAction(id))
                dispatch({
                    type: GET_BINH_LUAN_DETAIL_PHIM,
                    detailBinhLuanPhim: {}
                })
            }
            values.comment = '';
        }
    })

    const renderBinhLuanPhim = () => {
        return currentArrBinhLuan?.map((item, index) => {
            const content = (
                <div className='d-flex flex-col'>
                    <Button className='btn' type='link' onClick={() => {
                        dispatch(layChiTietBinhLuanPhimAction(item.maComment))
                    }}>Sửa</Button>
                    <Button className='btn' danger type='link' onClick={() => {
                        if (window.confirm('Bạn có chắc chắn muốn xóa bình luận này?')) {
                            dispatch(xoaBinhLuanPhimAction(item.maComment))
                            dispatch(layDanhSachBinhLuanPhimAction(id))
                        }
                    }}>Xóa</Button>
                </div>
            );
            return <Card
                key={index}
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
    };
    

    return (
        <div style={{ position: 'absolute', height: 'auto', width: '100%' }}>
            <div style={{
                backgroundImage: `url(${movieEditDetail.hinhAnh})`,
                height: 'auto',
                width: '100%',
                filter: 'blur(15px)',
                zIndex: -10,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
            ></div>
            <div style={{
                backgroundImage: `url(${movieEditDetail.hinhAnh})`,
                height: 'auto',
                width: '100%',
                zIndex: -20,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
            ></div>
            <div className='row h-full relative z-10 mt-60'>
                <div className='col-4 d-flex justify-end items-center h-full' >
                    <img className='posterphim mr-3 object-cover' src={movieEditDetail.hinhAnh} alt={movieEditDetail.hinhAnh} />
                </div>
                <div className='col-4 d-flex justify-start items-center z-10'>
                    <div className='text-white'>
                        <p>Ngày chiếu: {moment(movieEditDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                        <p className='text-4xl'>{movieEditDetail.tenPhim}</p>
                        <Rate allowHalf value={movieEditDetail.danhGia / 2} />
                    </div>
                </div>
                <div className='col-4 d-flex justify-start items-center' >
                    <div className={`c100 p${movieEditDetail.danhGia / 10 * 100} big green`}>
                        <span>{movieEditDetail.danhGia}/10</span>
                        <div className="slice">
                            <div className="bar" />
                            <div className="fill" />
                        </div>
                    </div>

                </div>
            </div>
            <div className='container px-5 pb-2 mb-5 rounded-2xl' style={{ minHeight: '500px', background: 'rgba(204, 204, 204, 0.5)' }}>

                <Tabs defaultActiveKey='1' centered className='text-white mt-20'>
                    <TabPane tab={<p className='text-lg bg-slate-800 px-5 py-2 rounded-full'>Lịch Chiếu</p>} key="1" >
                        {listNgayChieuActive.sort().map((item, index) => {
                            return <button key={index} type="button" className="text-white mr-3 mt-3 bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2"
                                onClick={handleClick}
                                name={item}
                            >
                                {dayjs(item).format('DD-MM-YYYY')}
                            </button>
                        })}

                        <div className='d-flex justify-center border-t-2 border-indigo-600 p-3 mt-5 '>
                            {uniqueTinhThanh.map((item, index) => {
                                return <button key={index} className='text-white mr-3 mt-3 bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2' name={item.maTinh}
                                    onClick={handleClickRap}
                                >
                                    {item.tenTinh}
                                </button>
                            })}
                        </div>

                        <List
                            itemLayout="vertical"
                            size="large"
                            dataSource={cumRaptheotinh}
                            renderItem={(item) => (

                                <List.Item
                                    key={item.index}
                                    extra={

                                        <div style={{ minWidth: '80%' }} >
                                            {_.orderBy(lichChieuTheoRap, ['gioChieu']).filter(rap => rap.maRap === item.maRap).filter(rap => rap.ngayChieu === today).filter(rap => now > rap.gioChieu).map((item, index) => {
                                                return <Tag key={index} disabled className='text-lg mr-3 px-3 opacity-50 cursor-default select-none' color='gray'>{item.gioChieu.substr(0, 5)}</Tag>
                                            })}
                                            {_.orderBy(lichChieuTheoRap, ['gioChieu']).filter(rap => rap.maRap === item.maRap).filter(rap => rap.ngayChieu === today).filter(rap => now <= rap.gioChieu).map((item, index) => {
                                                return <NavLink key={index} to={`/checkout/${item.maLichChieu}`}>
                                                    <Tag className='text-lg mr-3 px-3' color='green'>{item.gioChieu.substr(0, 5)}</Tag>
                                                </NavLink>
                                            })}
                                            {_.orderBy(lichChieuTheoRap, ['gioChieu']).filter(rap => rap.maRap === item.maRap).filter(rap => rap.ngayChieu !== today).map((item, index) => {
                                                return <NavLink key={index} to={`/checkout/${item.maLichChieu}`}>
                                                    <Tag className='text-lg mr-3 px-3' color='green'>{item.gioChieu.substr(0, 5)}</Tag>
                                                </NavLink>
                                            })}
                                        </div>
                                    }
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar style={{ width: 50, height: 50 }} src='/img/logo.png' />}
                                        title={<h1>{item.tenRap}</h1>}
                                        description={item.diaChi}
                                    />
                                </List.Item>
                            )}
                        />

                    </TabPane>
                    <TabPane tab={<p className='text-lg bg-slate-800 px-5 py-2 rounded-full'>Thông Tin</p>} key="2">
                        <p className='text-lg text-slate-900'>{movieEditDetail.moTa}</p>
                    </TabPane>
                    <TabPane tab={<p className='text-lg bg-slate-900 px-5 py-2 rounded-full'>Đánh Giá</p>} key="3">
                        <h1 className='mt-5 text-xl text-slate-900'>Bình Luận Từ Người Xem</h1>
                        <div className='bg-light rounded-xl p-2 mb-5 '>

                            {(localStorage.getItem(TOKEN)) ? <Form form={form} onSubmitCapture={formik.handleSubmit} className='w-full d-flex flex-col items-end' >
                                <Form.Item label="" className='mb-2 w-full' >
                                    <TextArea name='comment' allowClear rows={4} placeholder='nhập bình luận' onChange={formik.handleChange} value={formik.values.comment} />
                                </Form.Item>
                                <button disabled={!formik.values.comment?.trim()} type="submit" className="bg-blue-700 disabled:opacity-25 rounded-full text-white p-2 px-5">Gửi</button>
                            </Form> : <Button href="/login" className='w-full'>Vui lòng đăng nhập để bình luận</Button>}

                        </div>
                        {renderBinhLuanPhim()}
                        <Pagination className='d-flex justify-center line-clamp-3 mb-20' pageSize={postsPerPage} currentPage={currentPage} total={arrBinhLuanPhim.length} onChange={(page) => { setCurrentPage(page) }} />
                    </TabPane>
                </Tabs>
            </div>
        </div >

    )
}
