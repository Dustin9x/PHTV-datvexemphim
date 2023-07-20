import React, { Fragment, useEffect } from 'react'
import { SearchOutlined, EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachCarouselAction, themCarouselAction, xoaCarouselAction } from '../../../redux/actions/CarouselAction';
import { layDanhSachPhimAction } from '../../../redux/actions/QuanLyPhimAction';
import _ from 'lodash';
import { GET_CAROUSEL, UPDATE_CAROUSEL } from '../../../redux/constants';
import { layDanhSachCumRapAction, layDanhSachTinhThanhAction, xoaRapChieuAction } from '../../../redux/actions/QuanLyRapAction';



export default function ThetreChildMng() {
  let { cumRap } = useSelector(state => state.RapReducer);
  let { tinhThanh } = useSelector(state => state.RapReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachCumRapAction())
    dispatch(layDanhSachCarouselAction())
    dispatch(layDanhSachTinhThanhAction())
  }, [])

  // const status = Object.fromEntries(
  //   heThongRapChieu.map(({maHeThongRap, tenHeThongRap}) => [maHeThongRap, tenHeThongRap])
  // );
  
  // const updateCarousel = arrCarousel.map(({maBanner, hinhAnh, maPhim}) => ({
  //   maBanner,
  //   hinhAnh,
  //   maPhim,
  //   tenPhim: status[maPhim]
  // }));

  const data = cumRap;
  console.log('data',data)
  

  const columns = [
    {
      title: 'Mã Cụm Rạp',
      dataIndex: 'maRap',
      key: 'maRap',
      sorter: (a, b) => a.maRap.length - b.maRap.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Tên Rạp',
      dataIndex: 'tenRap',
      key: 'tenRap',
      sorter: (a, b) => a.tenRap.length - b.tenRap.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Tỉnh - Thành',
      dataIndex: 'tinh_thanh',
      key: 'tinh_thanh',
      
      render: (text, movie) => {
          return tinhThanh.filter(item => item.maTinh === movie.maTinh_id).map((item, index) => {
              return <p>{item.tenTinh}</p>
          })
      },
  },
    {
      title: 'Địa Chỉ',
      dataIndex: 'diaChi',
      key: 'diaChi',
      sorter: (a, b) => a.diaChi.length - b.diaChi.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Quản Lý',
      render: (text, movie) => {
        return <Fragment>
          <Button key={1} href={`/admin/carouselmng/edit/${movie.maRap}`} type="link" icon={<EditOutlined />} onClick={() => {
            localStorage.setItem('carouselParams', JSON.stringify(movie));
          }}></Button>
          <Button key={2} type="link" danger icon={<DeleteOutlined />} onClick={() => {
            if (window.confirm('Bạn có chắc chắn muốn xóa rạp ' + movie.tenRap + '?')) {
              dispatch(xoaRapChieuAction(movie.maRap))
            }
          }}></Button>
        </Fragment>
      }
    },
  ];
  return <div>
    <div className='d-flex mb-3'>
      <h3 className='text-lg'>Quản Lý Cụm Rạp</h3>
      <Button href='/admin/theatremng/addtheatrechild' type="primary" className='ml-3 small bg-primary'>+ Thêm Rạp Chiếu</Button>
    </div>
    <Table columns={columns} dataSource={data} rowKey={'maPhim'} />;
  </div>
}
