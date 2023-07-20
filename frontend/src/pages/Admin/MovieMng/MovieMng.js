import React, { Fragment, useEffect } from 'react'
import { SearchOutlined, EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimAction, xoaPhimAction } from '../../../redux/actions/QuanLyPhimAction';
import moment from 'moment';
import { layChiTietLichChieuAction, layDanhSachLichChieuAction } from '../../../redux/actions/QuanLyDatVeAction';
import _ from 'lodash';


export default function MovieMng() {
  let { arrMovieDefault } = useSelector(state => state.MovieReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachPhimAction())
    dispatch(layDanhSachLichChieuAction())
  }, [dispatch])

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };


  const resetSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0] = '');
    setSearchedColumn(dataIndex);
  };

  const data = arrMovieDefault;
  
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            className='bg-primary'
            style={{
              width: 90,
            }}
          >
            Tìm
          </Button>
          <Button
            onClick={() => clearFilters && resetSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>

        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text, index) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          key={index}
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: 'Mã Phim',
      dataIndex: 'maPhim',
      key: 'maPhim',
      width: '10%',
      sorter: (a, b) => a.maPhim.length - b.maPhim.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'hinhAnh',
      key: 'hinhAnh',
      width: '15%',
      render: (text, movie, index) => { return <img key={index} width={150} src={movie.hinhAnh} alt={movie.hinhAnh} /> }
    },
    {
      title: 'Tên Phim',
      dataIndex: 'tenPhim',
      key: 'tenPhim',
      ...getColumnSearchProps('tenPhim'),
      sorter: (a, b) => a.tenPhim.length - b.tenPhim.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Ngày Khởi Chiếu',
      dataIndex: 'ngayKhoiChieu',
      key: 'ngayKhoiChieu',
      ...getColumnSearchProps('ngayKhoiChieu'),
      sorter: (a, b) => a.ngayKhoiChieu.length - b.ngayKhoiChieu.length,
      sortDirections: ['descend', 'ascend'],
      render: (text, movie, index) => {
        return <Fragment key={index}>
          {moment(movie.ngayKhoiChieu).format('DD-MM-YYYY')}
        </Fragment>
      }
    },
    {
      title: 'Mô Tả',
      dataIndex: 'moTa',
      key: 'moTa',
      width: '30%',
      ...getColumnSearchProps('moTa'),
      sorter: (a, b) => a.moTa.length - b.moTa.length,
      sortDirections: ['descend', 'ascend'],
      render: (text, movie, index) => {
        return <Fragment key={index}>
          {movie.moTa.length > 50 ? movie.moTa.substr(0, 50) + '...' : movie.moTa}
        </Fragment>
      }
    },
    {
      title: 'Lịch Chiếu',
      render: (text, movie) => {
        return <Fragment>
          <Button key={3} href={`/admin/moviemng/showtime/${movie.maPhim}`} icon={<CalendarOutlined />} onClick={() => {
            localStorage.setItem('filmParams', JSON.stringify(movie))
          }}>Xem Lịch Chiếu</Button>
        </Fragment>
      }
    },
    {
      title: 'Quản Lý',
      width: '10%',
      render: (text, movie) => {
        return <Fragment>
          <Button key={1} href={`/admin/moviemng/edit/${movie.maPhim}`} type="link" icon={<EditOutlined />} onClick={() => {
            localStorage.setItem('filmParams', JSON.stringify(movie))
          }}></Button>
          <Button key={2} type="link" danger icon={<DeleteOutlined />} onClick={() => {
            if (window.confirm('Bạn có chắc chắn muốn xóa phim ' + movie.tenPhim + '?')) {
              dispatch(xoaPhimAction(movie.maPhim))
            }
          }}></Button>
          <Button key={3} href={`/admin/moviemng/showtime/${movie.maPhim}`} type="link" icon={<CalendarOutlined />} onClick={() => {
            localStorage.setItem('filmParams', JSON.stringify(movie))
          }}></Button>
        </Fragment>
      }
    },
  ]
  return <div>
    <div className='d-flex mb-3'>
      <h3 className='text-lg'>Quản Lý Phim</h3>
      <Button href='/admin/moviemng/addnew' type="primary" className='ml-3 small bg-primary'>+ Thêm Phim</Button>
    </div>
    <Table columns={columns} dataSource={data} rowKey={'maPhim'} />
  </div>
}