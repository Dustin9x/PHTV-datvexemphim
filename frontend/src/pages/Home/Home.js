import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MovieMultiRowSlick from '../../components/Movie/MovieMultiRowSlick';
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimAction';
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel';
import { layDanhSachTinTucAction } from '../../redux/actions/QuanLyTinTucAction';
import { Button, Card } from 'antd';
import dayjs from 'dayjs';
import { KetQuaDatVe } from './../Checkout/Checkout';

export default function Home(props) {
  const dispatch = useDispatch();
  const { arrMovie } = useSelector(state => state.MovieReducer);
  const { arrTinTuc } = useSelector(state => state.NewsReducer);

  useEffect(() => {
    dispatch(layDanhSachPhimAction());
    dispatch(layDanhSachTinTucAction())
  }, [])

  const renderTinTuc = () => {
    return <div className='row d-flex'>
      <div className='col-6 flex-1'>
        {arrTinTuc.slice(-1).map((item, index) => {
          return <a key={index} className='hover:no-underline' href={`/news/detail/${item.maBaiViet}`}>
            <Card
              hoverable
              className='my-3 w-full no-underline'
              style={{ overflow: 'hidden' }}
              bodyStyle={{ width: '100%', height: '100%' }}
              cover={<img alt={item.tieuDe} className='' src={item.hinhAnh} style={{ minWidth: 300, height: 390, objectFit: 'cover' }} />}
            >
              <div className='d-flex justify-between w-full'>
                <div className='text-danger'>{item.tacGia}</div>
                <div className='text-right'>{dayjs(item.created_at).format('DD-MM-YYYY')}</div>
              </div>
              <div className='text-left'>{item.theLoai}</div>
              <div>
                <h1 className='text-4xl mt-2'>{item.tieuDe}</h1>
                <p className='text-gray-500 text-ellipsis overflow-hidden line-clamp-3'>{item.noiDungPhu}</p>
              </div>
            </Card>
          </a>
        })}
      </div>
      <div className='col-6'>
        {arrTinTuc.slice(-5, -1).map((item, index) => {
          return <a key={index} className='hover:no-underline' href={`/news/detail/${item.maBaiViet}`}>
            <Card
              hoverable
              className='d-flex my-3 w-full no-underline'
              style={{ height: 155, overflow: 'hidden' }}
              bodyStyle={{ width: '100%', padding:'12px' }}
              cover={<img alt={item.tieuDe} className='ant-card-cover-customs' src={item.hinhAnh} style={{ minWidth: 220, height: 155, objectFit: 'cover' }} />}
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
        }).reverse()}
      </div>
    </div>

  }


  return (
    <div>
      <HomeCarousel />
      <div className='container mx-auto my-8'>
        <MovieMultiRowSlick arrMovie={arrMovie} />
        <div className='grid grid-cols-3 gap-32'>
        </div>
        <div className='my-12'>
          <h1 className='text-center text-2xl'>CÁC TIN TỨC PHIM ẢNH MỚI NHẤT</h1>
          <hr />
          <div className='mt-3'>
            {renderTinTuc()}
            <Button className='text-red-500 text-right w-full' href='/news' type='link'>Xem thêm &gt;&gt;</Button>
          </div>
        </div>
      </div>
    </div>
  )
}



