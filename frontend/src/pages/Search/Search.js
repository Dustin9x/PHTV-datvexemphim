import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { layKetQuaTimKiem } from './../../redux/actions/QuanLyTinTucAction';
import { Card } from 'antd';
import { Modal } from 'antd';
import dayjs from 'dayjs';



export default function Search(props) {
  const dispatch = useDispatch();

  const { news, movie } = useSelector(state => state.NewsReducer.arrTimKiem);
  const [modal2Open, setModal2Open] = useState(false);

  let searchValue = props.location.search.slice(8, props.location.search.length);

  useEffect(() => {
    dispatch(layKetQuaTimKiem(searchValue));
  }, [])

  const renderNews = () => {
    return news?.map((item, index) => {
      return <div className='col-6'>
        <a className='hover:no-underline w-full' href={`/news/detail/${item.maBaiViet}`}>
          <Card
            key={index}
            hoverable
            className='d-flex my-3 w-full no-underline'
            style={{ height: 185, overflow: 'hidden' }}
            bodyStyle={{ width: '100%', padding: '12px' }}
            cover={<img alt={item.tieuDe} className='ant-card-cover-customs' src={item.hinhAnh} style={{ minWidth: 250, height: 185, objectFit: 'cover' }} />}
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
      </div>
    })
  }

  const renderMovies = () => {
    return movie?.map((phim, index) => {
      return <div className='col-3 d-flex justify-center mb-3'>
        <div className="container_foto" style={{ width: 260, height: 360 }}>
          <div className="ver_mas text-center">
            <span id="click" className="lnr lnr-eye" />
            <a href={`/detail/${phim.maPhim}`} className='btn btn-danger text-white'>Đặt vé</a>
            <button className='btn btn-danger text-white ml-2' onClick={() => setModal2Open(true)}>Trailer</button>
            <Modal
              title={`${phim.tenPhim}`}
              centered
              open={modal2Open}
              onOk={() => setModal2Open(false)}
              onCancel={() => setModal2Open(false)}
              bodyStyle={{ height: 500, padding: 0, margin: '0 -16px -12px', borderRadius: 8 }}
              width={800}
              footer={null}
              destroyOnClose={true}
            >
              <iframe width="100%" height="100%" src={`${phim.trailer}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </Modal>
          </div>
          <article className="text-left w-full">
            <h2>{phim.tenPhim}</h2>
            <h4>{phim.moTa}</h4>
          </article>
          <img src={phim.hinhAnh} alt={phim.tenPhim} className='w-full object-cover' />
        </div>
      </div>
    })
  }

  return (
    <div>
      <div className="header__img-text" style={{ maxHeight: 120 }}>
        <h2 className=" text-white text-2xl mt-5">Tìm kiếm từ khóa</h2>
        <h2 className=" text-white text-xl">{searchValue}</h2>
      </div>
      <div className="header__bg-dark header__with-img" style={{ maxHeight: 120 }}></div>
      <div className='container'>
        <div className='row'>
          <h1 className="text-3xl text-center w-full mt-3">Kết Quả Tìm Kiếm Phim</h1>
          {movie?.length !== 0 ? renderMovies() : <p className='text-center w-full'>Xin lỗi! Không tìm thấy phim nào</p>}
        </div>
        <div className='row'>
          <h1 className="text-3xl text-center w-full mt-5">Kết Quả Tìm Kiếm Tin Tức</h1>
          {news?.length !== 0 ? renderNews() : <p className='text-center w-full'>Xin lỗi! Không tìm thấy tin tức nào</p>}
        </div>
      </div>
    </div>
  )
}
