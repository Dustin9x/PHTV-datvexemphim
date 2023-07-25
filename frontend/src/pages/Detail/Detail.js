import React, { useState } from 'react'
import './Detail.css'
import { Tabs, Rate, Segmented, Tag, Button } from 'antd';
import moment from 'moment/moment';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { layChiTietPhimAction, layDanhSachCumRapAction } from '../../redux/actions/QuanLyRapAction';
import { NavLink } from 'react-router-dom';
import { layThongTinPhimAction } from '../../redux/actions/QuanLyPhimAction';
import { layChiTietLichChieuAction, layLichChieuTheoPhimAction } from '../../redux/actions/QuanLyDatVeAction';
import dayjs from 'dayjs'
import _ from 'lodash';
const { TabPane } = Tabs;

export default function Detail(props) {

    const { movieEditDetail } = useSelector(state => state.MovieReducer);
    const { lichChieuTheoPhim } = useSelector(state => state.QuanLyDatVeReducer);
    const { cumRap } = useSelector(state => state.RapReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        let { id } = props.match.params;
        dispatch(layThongTinPhimAction(id))
        dispatch(layLichChieuTheoPhimAction(id))
        dispatch(layDanhSachCumRapAction())
    }, [])

    const [lichChieuTheoRap, setLichChieuTheoRap] = useState(lichChieuTheoPhim.filter((item) => item.ngayChieu === ""));
    // let lichChieuTheoRap = []
    const handleClick = (event) => {
        let clickNgayChieu = event.target.name;
        let lichChieuTheoRap = lichChieuTheoPhim.filter(item => item.ngayChieu === clickNgayChieu)
        setLichChieuTheoRap(lichChieuTheoRap);
    };
    let listNgayChieu = lichChieuTheoPhim.map(item => item.ngayChieu).filter((item, index, arr) => arr.indexOf(item) === index)
    let listTinhThanh = _.uniq(_.flattenDeep(lichChieuTheoRap.map((rapchieu, index) => {
        return rapchieu.rapchieu.map((tinhthanh, index) => {
            return tinhthanh.tinhthanh
        })
    })))
    let todayDate = new Date().toISOString().slice(0, 10);
    let listNgayChieuActive = listNgayChieu.filter(e => e > todayDate)

    let uniqueTinhThanh = [...new Map(listTinhThanh.map((item) => [item["maTinh"], item])).values(),];
    const [cumRaptheotinh, setCumRaptheotinh] = useState(cumRap.filter((item) => item.maTinh_id === ''));
    const handleClickRap = (event) => {
        let clickTinhThanh = Number(event.target.name);
        let cumRaptheotinh = cumRap.filter(item => item.maTinh_id === clickTinhThanh)
        setCumRaptheotinh(cumRaptheotinh);
    };



    console.log('movieEditDetail', movieEditDetail)

    return (
        <div style={{
            position: 'absolute',
            height: 'auto',
            width: '100%',
        }}
        >
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
            <div className='container' style={{ minHeight: '500px' }}>
                <Tabs defaultActiveKey='1' centered className='text-white mt-20'>
                    <TabPane tab={<p className='text-lg bg-slate-800 px-5 py-2 rounded-full'>Lịch Chiếu</p>} key="1" >
                        {listNgayChieuActive.sort().map((item, index) => {
                            return <button type="button" className="text-white mr-3 mt-3 bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2"
                                onClick={handleClick}
                                name={item}
                            >
                                {dayjs(item).format('DD-MM-YYYY')}
                            </button>
                        })}

                        <div className='d-flex justify-center border-t-2 border-indigo-600 p-3 mt-5 '>
                            {uniqueTinhThanh.map((item, index) => {
                                return <button className='text-white mr-3 mt-3 bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2' name={item.maTinh}
                                    onClick={handleClickRap}
                                >
                                    {item.tenTinh}
                                </button>
                            })}
                        </div>



                        <Tabs defaultActiveKey='1' tabPosition={'left'} className='text-white mt-20'>
                            {cumRaptheotinh.map((rap, index) => {
                                var now = dayjs(new Date().getTime()).format('HH:mm');
                                return <TabPane className='p-3' tab={<div className='bg-slate-50 p-4 rounded-xl'><div className='text-lg d-flex justify-center'><img style={{width:40}} src='/img/logo.png' />{rap.tenRap}</div><div>{rap.diaChi}</div></div>} key={index}>
                                    {_.orderBy(lichChieuTheoRap, ['gioChieu']).filter(item => item.maRap === rap.maRap).filter(item => now > item.gioChieu).map((item, index) => {
                                        return <Tag disabled className='text-lg mr-3 px-3 opacity-50 cursor-default select-none' color='gray'>{item.gioChieu.substr(0,5)}</Tag>
                                    })}
                                    {_.orderBy(lichChieuTheoRap, ['gioChieu']).filter(item => item.maRap === rap.maRap).filter(item => now <= item.gioChieu).map((item, index) => {
                                        return <NavLink to={`/checkout/${item.maLichChieu}`}>
                                            <Tag className='text-lg mr-3 px-3' color='green'>{item.gioChieu.substr(0,5)}</Tag>
                                        </NavLink>
                                    })}
                                </TabPane>
                            })}
                        </Tabs>





                    </TabPane>
                    <TabPane tab={<p className='text-lg bg-slate-800 px-5 py-2 rounded-full'>Thông Tin</p>} key="2">
                        <p className='text-lg'>{movieEditDetail.moTa}</p>
                    </TabPane>
                    <TabPane tab={<p className='text-lg bg-slate-800 px-5 py-2 rounded-full'>Đánh Giá</p>} key="3">
                        Đánh giá
                    </TabPane>
                </Tabs>

            </div>

        </div >




    )
}
