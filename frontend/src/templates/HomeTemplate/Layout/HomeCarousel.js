import React, { useEffect } from 'react';
import { Carousel } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { layDanhSachCarouselAction } from '../../../redux/actions/CarouselAction';
import './HomeCarousel.css';

export default function HomeCarousel(props) {

    let { arrCarousel } = useSelector(state => state.CarouselReducer);
    let { arrMovie } = useSelector(state => state.MovieReducer);
    const contentStyle = {
        height: '600px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        backgroundPosition: 'center',
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(layDanhSachCarouselAction());
        dispatch(layDanhSachCarouselAction())

        //Nhận 2 loại dữ liệu: 
        //1.action (type:'',data)
        //2.callBack function
    }, [])

    const status = Object.fromEntries(
        arrMovie.map(({maPhim, tenPhim}) => [maPhim, tenPhim])
      );
      
      const updateCarousel = arrCarousel.map(({maBanner, hinhAnh, maPhim}) => ({
        maBanner,
        hinhAnh,
        maPhim,
        tenPhim: status[maPhim]
      }));


    const renderCarousel = () => {
        return updateCarousel.map((item, index) => {
            return <div key={index}>
                <div style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}>
                    <img src={item.hinhAnh} className="opacity-0" alt={item.tenPhim} />
                </div>
            </div>
        })
    }

    return (
        <Carousel autoplay style={{ width: '100%', padding: 0, margin: 0 }}>
            {renderCarousel()}
        </Carousel>
    );

}
