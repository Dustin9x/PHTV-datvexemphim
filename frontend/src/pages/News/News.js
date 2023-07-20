import React, { useEffect } from 'react'
import './News.css'
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachTinTucAction } from './../../redux/actions/QuanLyTinTucAction';
import { Card, List } from 'antd';

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
          style={{ height: 180, overflow: 'hidden' }}
          bodyStyle={{ width: '100%' }}
          cover={<img alt={item.tieuDe} className='ant-card-cover-customs' src={item.hinhAnh} style={{ minWidth: 300, height: 180, objectFit: 'cover' }} />}
        >
          <div className='d-flex justify-between w-full mb-4'>
            <div className='text-danger w-1/3'>{item.tacGia}</div>
            <div className='w-1/3 text-left'>{item.theLoai}</div>
            <div className='w-1/3 text-right'>{item.created_at.substr(0, 10)}</div>
          </div>

          <Meta title={item.tieuDe} description={item.noiDungPhu} />
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
                    dataSource={arrTinTuc.splice(0, 5).reverse()}
                    renderItem={(item, index) => (
                      <List.Item>
                        <List.Item.Meta
                        className='mb-3 w-full font-normal text-gray-700 dark:text-gray-400'
                          title={<a href={`/news/detail/${item.maBaiViet}`}>{item.tieuDe}</a>}
                          description={item.noiDungPhu}
                        />
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
