import React, { Fragment, useEffect } from 'react'
import { DeleteOutlined, KeyOutlined } from '@ant-design/icons';
import { Button, DatePicker, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachFeedbackAction, xoaFeedbackAction } from '../../../redux/actions/QuanLyFeedbackAction';
import dayjs from 'dayjs';


export default function FeedbackMng() {
  let { arrFeedback } = useSelector(state => state.FeedbackReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachFeedbackAction())
  }, [dispatch])

  const data = arrFeedback;

  console.log('arrFeedback',arrFeedback)

  const columnsWithNgayXuLy = [
    {
      title: 'Mã',
      dataIndex: 'maFeedback',
      key: 'maFeedback',
      sorter: (a, b) => a.maFeedback - b.maFeedback,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Ngày feedback',
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: (a, b) => dayjs(a.created_at).unix() - dayjs(b.created_at).unix(),
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
      title: 'Tiêu Đề',
      dataIndex: 'tieuDe',
      key: 'tieuDe',
      sorter: (a, b) => a.tieuDe.length - b.tieuDe.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Nội Dung',
      dataIndex: 'noiDung',
      key: 'noiDung',
      width: '20%',
      sorter: (a, b) => a.noiDung.length - b.noiDung.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Ngày Xử Lý',
      dataIndex: 'ngayXuLy',
      key: 'ngayXuLy',
      sorter: (a, b) => dayjs(a.ngayXuLy).unix() - dayjs(b.ngayXuLy).unix(),
      sortDirections: ['descend', 'ascend'],
      render: (text, feedback) => {
        return feedback.ngayXuLy ? <div>{dayjs(feedback.ngayXuLy).format('DD-MM-YYYY')}</div> : '';
      },
    },
    {
      title: 'Nội Dung Đã Xử Lý',
      dataIndex: 'noiDungXuLy',
      key: 'noiDungXuLy',
      width: '25%',
      sorter: (a, b) => a.noiDungXuLy.length - b.noiDungXuLy.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Quản Lý',
      width: '7%',
      render: (text, feedback) => {
        return <Fragment>
          <Button key={1} href={`/admin/editfeedback/${feedback.maFeedback}`} type="link" icon={<KeyOutlined />}></Button>
          <Button key={2} type="link" danger icon={<DeleteOutlined />} onClick={() => {
            if (window.confirm('Bạn có chắc chắn muốn xóa feedback có mã ' + feedback.maFeedback + '?')) {
              dispatch(xoaFeedbackAction(feedback.maFeedback))
            }
          }}></Button>
        </Fragment>
      }
    },
  ];
  const columnsWithoutNgayXuLy = [
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
      sorter: (a, b) => dayjs(a.created_at).unix() - dayjs(b.created_at).unix(),
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
      title: 'Tiêu Đề',
      dataIndex: 'tieuDe',
      key: 'tieuDe',
      sorter: (a, b) => a.tieuDe.length - b.tieuDe.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Nội Dung Chờ Xử Lý',
      dataIndex: 'noiDung',
      key: 'noiDung',
      width: '25%',
      sorter: (a, b) => a.noiDung.length - b.noiDung.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Quản Lý',
      width: '7%',
      render: (text, feedback) => {
        return <Fragment>
          <Button key={1} href={`/admin/editfeedback/${feedback.maFeedback}`} type="link" icon={<KeyOutlined />}></Button>
          <Button key={2} type="link" danger icon={<DeleteOutlined />} onClick={() => {
            if (window.confirm('Bạn có chắc chắn muốn xóa feedback có mã ' + feedback.maFeedback + '?')) {
              dispatch(xoaFeedbackAction(feedback.maFeedback))
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
    <h1 className='text-md text-center'>Feedback Chưa Xử Lý</h1>
    <Table columns={columnsWithoutNgayXuLy} dataSource={data.filter(item => item.noiDungXuLy == null)} rowKey={'maFeedback'} />

    <h1 className='text-md text-center'>Feedback Đã Xử Lý</h1>
    <Table columns={columnsWithNgayXuLy} dataSource={data.filter(item => item.noiDungXuLy != null)} rowKey={'maFeedback'} />

    
  </div>
}
