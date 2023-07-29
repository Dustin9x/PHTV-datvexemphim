import React, { Fragment, useEffect } from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, DatePicker, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import {  xoaRapChieuAction } from '../../../redux/actions/QuanLyRapAction';
import { layDanhSachFeedbackAction } from '../../../redux/actions/QuanLyFeedbackAction';
import dayjs from 'dayjs';
import { values } from 'lodash';


export default function FeedbackMng() {
  let { arrFeedback } = useSelector(state => state.FeedbackReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachFeedbackAction())
  }, [dispatch])


  const data = arrFeedback;
  console.log('arrFeedback',arrFeedback)
  

  const columns = [
    {
      title: 'Mã',
      dataIndex: 'maFeedback',
      key: 'maFeedback',
      sorter: (a, b) => a.maFeedback.length - b.maFeedback.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Ngày feedback',
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: (a, b) => a.created_at.length - b.created_at.length,
      sortDirections: ['descend', 'ascend'],
      render: (text,feedback)=>{
        return <div>{dayjs(feedback.created_at).format('DD-MM-YYYY')}</div>
      }
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Nội Dung',
      dataIndex: 'noiDung',
      key: 'noiDung',
      sorter: (a, b) => a.noiDung.length - b.noiDung.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Ngày Xử Lý',
      dataIndex: 'ngayXuLy',
      key: 'ngayXuLy',
      sorter: (a, b) => a.ngayXuLy.length - b.ngayXuLy.length,
      sortDirections: ['descend', 'ascend'],
      render: (text,feedback)=>{
        return <DatePicker format={'DD-MM-YYYY'}/>
      }
    },
    {
      title: 'Nội Dung Xử Lý',
      dataIndex: 'noiDungXuLy',
      key: 'noiDungXuLy',
      sorter: (a, b) => a.noiDungXuLy.length - b.noiDungXuLy.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Quản Lý',
      render: (text, movie) => {
        return <Fragment>
          <Button key={1} href={`/admin/theatremng/edit/${movie.maRap}`} type="link" icon={<EditOutlined />} onClick={() => {
            localStorage.setItem('theatreParams', JSON.stringify(movie));
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
      <h3 className='text-lg'>Quản Lý Feedback</h3>
    </div>
    <Table columns={columns} dataSource={data} rowKey={'maFeedback'} />;
  </div>
}
