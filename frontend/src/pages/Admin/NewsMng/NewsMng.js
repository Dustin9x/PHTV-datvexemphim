import React, { Fragment, useEffect } from 'react'
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimAction } from '../../../redux/actions/QuanLyPhimAction';
import { layDanhSachTinTucAction, xoaTinTucAction } from '../../../redux/actions/QuanLyTinTucAction';


export default function NewsMng() {
  let { arrTinTuc } = useSelector(state => state.NewsReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachTinTucAction());
    dispatch(layDanhSachPhimAction());
  }, [])

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

  const data = arrTinTuc.slice().reverse();

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{ padding: 8, }}
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
      title: 'Mã Bài Viết',
      dataIndex: 'maBaiViet',
      key: 'maBaiViet',
      width: '10%',
      sorter: (a, b) => a.maBaiViet - b.maBaiViet,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Tiêu Đề',
      dataIndex: 'tieuDe',
      key: 'tieuDe',
      width: '20%',
      ...getColumnSearchProps('tieuDe'),
      sorter: (a, b) => a.tieuDe.length - b.tieuDe.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Tác Giả',
      dataIndex: 'tacGia',
      key: 'tacGia',
      ...getColumnSearchProps('tacGia'),
      sorter: (a, b) => a.tacGia.length - b.tacGia.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'hinhAnh',
      key: 'hinhAnh',
      render: (text, movie, index) => { return <img key={index} width={150} style={{ borderRadius: '6px' }} src={movie.hinhAnh} alt={movie.hinhAnh} /> }
    },
    {
      title: 'Nội Dung Phụ',
      dataIndex: 'noiDungPhu',
      key: 'noiDungPhu',
      width: '40%',
      ...getColumnSearchProps('noiDungPhu'),
      sorter: (a, b) => a.noiDungPhu.length - b.noiDungPhu.length,
      sortDirections: ['descend', 'ascend'],
      render: (text, movie, index) => { return <p key={index} className='text-ellipsis overflow-hidden line-clamp-2'>{text}</p>}
    },
    {
      title: 'Quản Lý',
      width: '8%',
      render: (text, movie) => {
        return <Fragment>
          <Button key={1} href={`/admin/newsmng/edit/${movie.maBaiViet}`} type="link" icon={<EditOutlined />}></Button>
          <Button key={2} type="link" danger icon={<DeleteOutlined />} onClick={() => {
            if (window.confirm('Bạn có chắc chắn muốn xóa bài viết ' + movie.tieuDe + '?')) {
              dispatch(xoaTinTucAction(movie.maBaiViet))
            }
          }}></Button>
        </Fragment>
      }
    },
  ];
  return <div>
    <div className='d-flex mb-3'>
      <h3 className='text-lg'>Quản Lý Bài Viết</h3>
      <Button href='/admin/newsmng/addnews' type="primary" className='ml-3 small bg-primary'>+ Thêm Bài Viết</Button>
    </div>
    <Table columns={columns} dataSource={data} rowKey={'maPhim'} />
  </div>
}
