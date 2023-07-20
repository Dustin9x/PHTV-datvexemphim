import React, { useState } from 'react'
import { Radio, Space, Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom'
import moment from 'moment/moment';
const { TabPane } = Tabs;

export default function HomeMenu(props) {
    const { heThongRapChieu } = props;
    const renderHeThongRap = () => {
        return heThongRapChieu?.map((heThongRap, index) => {
            return <TabPane tab={<img src={heThongRap.logo} className='rounded-full' width="50" />} key={index}>
                <Tabs tabPosition={'left'}>
                    {heThongRap.lstCumRap?.map((cumRap, index) => {
                        return <TabPane tab={
                            <div className='d-flex break-words' style={{width:'500px'}}>
                                <img src={heThongRap.logo} style={{height:'50px'}} className='rounded-full mr-2' width="50" height="50" />
                                <div className='text-left break-words'>
                                    {cumRap.tenCumRap}
                                    <p style={{textWrap: 'wrap'}} className='text-gray-500 break-words'>{cumRap.diaChi}</p>
                                    <p className='text-red-300'>Chi Tiết</p>
                                </div>
                            </div>
                        } key={index}>
                            {cumRap.danhSachPhim.map((phim, index) => {
                                return <Fragment key={index}>
                                    <div className='d-flex my-2'>
                                        <img src={phim.hinhAnh} width={100} style={{height:'150px'}} alt={phim.tenPhim} />
                                        <div className='ml-2'>
                                            <h3>{phim.tenPhim}</h3>
                                            <div className='grid grid-cols-12 gap-3'>
                                            {phim.lstLichChieuTheoPhim?.map((lichChieu,index)=>{
                                                return <NavLink className="text-green-500" to={`/checkout/${lichChieu.maLichChieu}`} key={index}>
                                                    {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                </NavLink>
                                            })}
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <hr/>
                                </Fragment>
                            })}
                        </TabPane>
                    })}
                </Tabs>
            </TabPane>
        })
    }
    return (
        <>
            <Tabs tabPosition={'left'}>
                {renderHeThongRap()}
            </Tabs>
        </>
    )
}
