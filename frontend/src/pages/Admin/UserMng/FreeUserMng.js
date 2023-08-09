import React, { Fragment, useEffect } from 'react'
import { SearchOutlined, EditOutlined, DeleteOutlined, HistoryOutlined } from '@ant-design/icons';
import { Avatar, Button, Input, Space, Table } from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachNguoiDungAction, xoaNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import { TOKEN, USER_LOGIN } from '../../../util/settings/config';
import { history } from '../../../App';



export default function FreeUserMng() {
  let userLogin = {}
if (localStorage.getItem(USER_LOGIN)) {
    userLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
}

if (!localStorage.getItem(TOKEN)) {
    history.replace('/')
}

if (userLogin.role !== 'Super') {
    alert('Bạn không có quyền truy cập trang này!');
    history.replace('/')
}
  let { arrUser } = useSelector(state => state.UserReducer);
  const dispatch = useDispatch();
  useEffect((value) => {
    dispatch(layDanhSachNguoiDungAction(value))
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
    setSearchText(selectedKeys[0]='');
    setSearchedColumn(dataIndex);
  };
  

  const data = arrUser.filter(item => item.role === 'KhachHang');

  console.log(data)

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
          placeholder={`Tìm kiếm`}
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
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id.length - b.id.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text, movie, index) => {return movie.avatar != "null" && movie.avatar != null
        ? <img key={index} style={{width:40, height:40, objectFit: 'cover', borderRadius: '50%'}} src={movie.avatar} alt={movie.avatar} /> 
      : <Avatar size={40} style={{ fontSize: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} icon={movie.name.substr(0, 1)} />}
    },
    {
      title: 'Họ và Tên',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Loại tài khoản',
      dataIndex: 'role',
      key: 'role',
      ...getColumnSearchProps('role'),
      sorter: (a, b) => a.role.length - b.role.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Đơn Hàng',
      render: (text, user, index) => {
        return <Fragment key={index}>
          <Button key={1} href={`/users/order/${user.id}`} onClick={() => {
            localStorage.setItem('userParams', JSON.stringify(user));
          }}>Lịch Sử Đặt Hàng</Button>
        </Fragment>
      }
    },
    {
      title: 'Quản Lý',
      render: (text, user, index) => {
        return <Fragment key={index}>
          <Button key={1} href={`/admin/users/edit/${user.id}`} type="link" icon={<EditOutlined />} onClick={() => {
            localStorage.setItem('userParams', JSON.stringify(user));
          }}></Button>
          <Button key={2} type="link" danger icon={<DeleteOutlined />} onClick={() => {
            if (window.confirm('Bạn có chắc chắn muốn xóa người dùng ' + user.email + '?')) {
              dispatch(xoaNguoiDungAction(user.id))
            }
          }}></Button>
        </Fragment>
      }
    },
  ];
  return <div>
    <div className='d-flex mb-3'>
      <h3 className='text-lg'>Quản Lý Người Dùng</h3>
      <Button href='/admin/users/adduser' type="primary" className='ml-3 small bg-primary'>+ Thêm Người Dùng</Button>
    </div>
    
    <Table columns={columns} dataSource={data} rowKey={'id'} />;
  </div>
}
