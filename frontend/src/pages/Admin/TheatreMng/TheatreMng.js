import React, { Fragment, useEffect } from 'react'
import { SearchOutlined, EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimAction, xoaPhimAction } from '../../../redux/actions/QuanLyPhimAction';
import { layDanhSachHeThongRapAction, layDanhSachTinhThanhAction, xoaHeThongRapAction } from '../../../redux/actions/QuanLyRapAction';



export default function TheatreMng() {
  let { heThongRapChieu } = useSelector(state => state.RapReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachHeThongRapAction())
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
    setSearchText(selectedKeys[0]='');
    setSearchedColumn(dataIndex);
  };

  const data = heThongRapChieu;

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
      title: 'Mã Hệ Thống Rạp',
      dataIndex: 'maHeThongRap',
      key: 'maHeThongRap',
      sorter: (a, b) => a.maHeThongRap.length - b.maHeThongRap.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Logo',
      dataIndex: 'logo',
      key: 'logo',
      render: (text, movie, index) => { return <img key={index} width={150} src={movie.logo} alt={movie.logo} /> }
    },
    {
      title: 'Tên Hệ Thống Rạp',
      dataIndex: 'tenHeThongRap',
      key: 'tenHeThongRap',
      ...getColumnSearchProps('tenHeThongRap'),
      sorter: (a, b) => a.tenHeThongRap.length - b.tenHeThongRap.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Quản Lý',
      render: (text, movie) => {
        return <Fragment>
          <Button key={1} href={`/admin/theatremng/edit/${movie.maHeThongRap}`} type="link" icon={<EditOutlined />}></Button>
          <Button key={2} type="link" danger icon={<DeleteOutlined />} onClick={() => {
            if (window.confirm('Bạn có chắc chắn muốn xóa hệ thống ' + movie.tenHeThongRap + '?')) {
              dispatch(xoaHeThongRapAction(movie.maHeThongRap))
            }
          }}></Button>
        </Fragment>
      }
    },
  ];
  return <div>
    <div className='d-flex mb-3'>
      <h3 className='text-lg'>Quản Lý Hệ Thống Rạp</h3>
      <Button href='/admin/theatremng/addtheatre' type="primary" className='ml-3 small bg-primary'>+ Thêm Hệ Thống</Button>
    </div>
    <Table columns={columns} dataSource={data} rowKey={'maPhim'} />;
  </div>
}
