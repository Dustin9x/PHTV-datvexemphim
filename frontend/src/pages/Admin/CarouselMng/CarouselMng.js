import React, { Fragment, useEffect } from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachCarouselAction, xoaCarouselAction } from '../../../redux/actions/CarouselAction';
import { layDanhSachPhimAction } from '../../../redux/actions/QuanLyPhimAction';

export default function CarouselMng() {
  let { arrCarousel } = useSelector(state => state.CarouselReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachPhimAction())
    dispatch(layDanhSachCarouselAction())
    
  }, [])

  const updateCarousel = arrCarousel.map(({maBanner, hinhAnh, duongDan}) => ({
    maBanner,
    hinhAnh,
    duongDan,
  }));

  const data = updateCarousel;

  const columns = [
    {
      title: 'Liên Kết',
      dataIndex: 'duongDan',
      key: 'duongDan',
      sorter: (a, b) => a.duongDan.length - b.duongDan.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Carousel',
      dataIndex: 'hinhAnh',
      key: 'hinhAnh',
      render: (text, movie, index) => { return <img key={index} width={150} style={{borderRadius:'6px'}} src={movie.hinhAnh} alt={movie.hinhAnh} /> }
    },
    {
      title: 'Quản Lý',
      render: (text, movie) => {
        return <Fragment>
          <Button key={1} href={`/admin/carouselmng/edit/${movie.maBanner}`} type="link" icon={<EditOutlined />} onClick={() => {
            localStorage.setItem('carouselParams', JSON.stringify(movie));
          }}></Button>
          <Button key={2} type="link" danger icon={<DeleteOutlined />} onClick={() => {
            if (window.confirm('Bạn có chắc chắn muốn xóa carousel ' + movie.tenPhim + '?')) {
              dispatch(xoaCarouselAction(movie.maBanner))
            }
          }}></Button>
        </Fragment>
      }
    },
  ];
  return <div>
    <div className='d-flex mb-3'>
      <h3 className='text-lg'>Quản Lý Carousel</h3>
      <Button href='/admin/carouselmng/addnew' type="primary" className='ml-3 small bg-primary'>+ Thêm Carousel</Button>
    </div>
    <Table columns={columns} dataSource={data} rowKey={'maPhim'} />;
  </div>
}
