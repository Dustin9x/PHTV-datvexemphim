import React, { useState } from 'react'
import './Detail.css'
import { Tabs, Rate, Segmented, Tag, Button } from 'antd';
import moment from 'moment/moment';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { layChiTietPhimAction, layDanhSachCumRapAction } from '../../redux/actions/QuanLyRapAction';
import { NavLink } from 'react-router-dom';
import { layThongTinPhimAction } from '../../redux/actions/QuanLyPhimAction';
import { layChiTietLichChieuAction } from '../../redux/actions/QuanLyDatVeAction';
import dayjs from 'dayjs'
import _ from 'lodash';
const { TabPane } = Tabs;

export default function Detail(props) {

    const { movieEditDetail } = useSelector(state => state.MovieReducer);
    const { lichChieuChiTiet } = useSelector(state => state.QuanLyDatVeReducer);
    const { cumRap } = useSelector(state => state.RapReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        let { id } = props.match.params;
        dispatch(layThongTinPhimAction(id))
        dispatch(layChiTietLichChieuAction(id))
        dispatch(layDanhSachCumRapAction())
    }, [])

    const [lichChieuTheoRap, setLichChieuTheoRap] = useState(lichChieuChiTiet.filter((item) => item.ngayChieu === ""));
    // let lichChieuTheoRap = []
    const handleClick = (event) => {
        let clickNgayChieu = event.target.name;
        let lichChieuTheoRap = lichChieuChiTiet.filter(item => item.ngayChieu === clickNgayChieu)
        setLichChieuTheoRap(lichChieuTheoRap);
    };
    let listNgayChieu = lichChieuChiTiet.map(item => item.ngayChieu).filter((item, index, arr) => arr.indexOf(item) === index)
    let listTinhThanh = _.uniq(_.flattenDeep(lichChieuTheoRap.map((rapchieu, index) => {
        return rapchieu.rapchieu.map((tinhthanh, index) => {
            return tinhthanh.tinhthanh
        })
    })))

    console.log('listNgayChieu',listNgayChieu)

    let uniqueTinhThanh = [...new Map(listTinhThanh.map((item) => [item["maTinh"], item])).values(),];
    const [cumRaptheotinh, setCumRaptheotinh] = useState(cumRap.filter((item) => item.maTinh_id === ''));
    const handleClickRap = (event) => {
        let clickTinhThanh = Number(event.target.name);
        let cumRaptheotinh = cumRap.filter(item => item.maTinh_id === clickTinhThanh)
        setCumRaptheotinh(cumRaptheotinh);
    };

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
                    <img className='posterphim mr-3' src={movieEditDetail.hinhAnh} alt={movieEditDetail.hinhAnh} />

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
                    <TabPane tab="Lịch chiếu" key="1" >
                        {listNgayChieu.sort().map((item, index) => {
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
                                return <TabPane tab={rap.tenRap}>
                                    {lichChieuTheoRap.filter(item => item.maRap === rap.maRap).map((item, index) => {
                                        return <NavLink to={`/checkout/${item.maLichChieu}`}><Tag color='green'>{item.gioChieu}</Tag></NavLink>
                                    })}
                                </TabPane>
                            })}
                        </Tabs>





                    </TabPane>
                    <TabPane tab="Thông tin" key="2">
                        Thông tin
                    </TabPane>
                    <TabPane tab="Đánh giá" key="3">
                        Đánh giá
                    </TabPane>
                </Tabs>

            </div>

        </div >




    )
}
