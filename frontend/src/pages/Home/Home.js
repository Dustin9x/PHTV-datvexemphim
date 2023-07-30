import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MovieMultiRowSlick from '../../components/Movie/MovieMultiRowSlick';
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimAction';
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel';
import { layDanhSachNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { layDanhSachTinTucAction } from '../../redux/actions/QuanLyTinTucAction';
import { Card } from 'antd';

export default function Home(props) {
  const dispatch = useDispatch();
  const { Meta } = Card;
  const { arrMovie } = useSelector(state => state.MovieReducer);
  const { arrTinTuc } = useSelector(state => state.NewsReducer);

  useEffect(() => {
    dispatch(layDanhSachPhimAction());
    dispatch(layDanhSachTinTucAction())
    // dispatch(layDanhSachNguoiDungAction())
  }, [])

  const renderTinTuc = () => {
    return arrTinTuc.splice(0, 5).map((item, index) => {
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

  console.log('arrMovie', arrMovie)
  const renderTrailer = () => {
    arrMovie.map((item, index) => {
      return <iframe id="ytplayer" type="text/html" width="720" height="405"
      src="https://www.youtube.com/embed/M7lc1UVf-VE"
      frameborder="0" allowfullscreen/>
    })
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
          <div className='col-8 mt-3'>
            {renderTinTuc()}
          </div>
        </div>
        <div className='my-12'>
          <h1 className='text-center text-2xl'>NHỮNG TRAILER VỪA RA MẮT</h1>
          <hr />
          <div className='col-8 mt-3'>
            {renderTrailer()}
          </div>
        </div>
      </div>
    </div>
  )
}



