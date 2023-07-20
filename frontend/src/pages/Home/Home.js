import React, { useEffect } from 'react'
import HomeMenu from './HomeMenu'
import { useDispatch, useSelector } from 'react-redux';
import MovieMultiRowSlick from '../../components/Movie/MovieMultiRowSlick';
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimAction';
import { layDanhSachHeThongRapAction } from '../../redux/actions/QuanLyRapAction';
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel';
import { layDanhSachNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';

export default function Home(props) {
  const dispatch = useDispatch();

  const { arrMovie } = useSelector(state => state.MovieReducer);
  const { heThongRapChieu } = useSelector(state => state.RapReducer);

  useEffect(() => {
    dispatch(layDanhSachPhimAction());
    dispatch(layDanhSachHeThongRapAction());
    dispatch(layDanhSachNguoiDungAction())
  }, [])

  return (
    <div>
      <HomeCarousel />
      <div className='container mx-auto my-12'>
        <MovieMultiRowSlick arrMovie={arrMovie} />
        <div className='grid grid-cols-3 gap-32'>
          {/* <Movie/> */}
        </div>
        <div className='my-12'>
          <HomeMenu heThongRapChieu={heThongRapChieu} />
        </div>
      </div>
    </div>
  )
}



