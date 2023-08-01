import React, { useEffect } from 'react'
import './News.css'
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachTinTucAction } from './../../redux/actions/QuanLyTinTucAction';
import { Avatar, Card, List } from 'antd';
import dayjs from 'dayjs';

export default function News() {
  const { Meta } = Card;
  const { arrTinTuc } = useSelector(state => state.NewsReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachTinTucAction())
  }, [])

  console.log('arrTinTuc', arrTinTuc)
  const renderTinTuc = () => {
    return arrTinTuc.map((item, index) => {
      return <a className='hover:no-underline' href={`/news/detail/${item.maBaiViet}`}>
      <Card
        key={index}
        hoverable
        className='d-flex my-3 w-full no-underline'
        style={{ height: 185, overflow: 'hidden' }}
        bodyStyle={{ width: '100%', padding:'12px' }}
        cover={<img alt={item.tieuDe} className='ant-card-cover-customs' src={item.hinhAnh} style={{ minWidth: 320, height: 185, objectFit: 'cover' }} />}
      >
        <div className='d-flex justify-between w-full'>
          <div className='text-danger'>{item.tacGia}</div>
          <div className='text-right'>{dayjs(item.created_at).format('DD-MM-YYYY')}</div>
        </div>
        <div className='text-left'>{item.theLoai}</div>
        <div>
          <h1 className='text-lg mt-1'>{item.tieuDe}</h1>
          <p className='text-gray-500 text-ellipsis overflow-hidden line-clamp-2'>{item.noiDungPhu}</p>
        </div>
      </Card>

    </a>
    }).reverse()
  }
  return (
    <div>
      <div class="header__img-text">
        <h2 class=" text-white heading__text drop-shadow-md">Tin Điện Ảnh</h2>
        <div class="text-white end__text drop-shadow-md">Tin tức điện ảnh Việt Nam & thế giới</div>
      </div>
      <div class="header__bg-dark header__with-img"></div>
      <div className='container'>
        <div className='row'>
          <div className='col-8'>{renderTinTuc()}</div>
          <div className='col-4'>
            <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-md md:flex-row w-full my-3">
              <div className="flex flex-col justify-between p-4 leading-normal w-full">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Bài Viết Mới Nhất</h5>
                <List
                  itemLayout="horizontal"
                  dataSource={arrTinTuc.slice(-5).reverse()}
                  renderItem={(item, index) => (
                    <List.Item>
                      <div className='d-flex mb-1 mt-1 w-full font-normal text-gray-700 dark:text-gray-400'>
                        <img className='rounded-md' src={item.hinhAnh} alt={item.hinhAnh} style={{ width: 140, height: 110, objectFit: 'cover' }} />
                        <div className='p-2'>
                        <a className='text-md font-bold' href={`/news/detail/${item.maBaiViet}`}>{item.tieuDe}</a>
                        <div className='text-ellipsis overflow-hidden line-clamp-2'>{item.noiDungPhu}</div>
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
