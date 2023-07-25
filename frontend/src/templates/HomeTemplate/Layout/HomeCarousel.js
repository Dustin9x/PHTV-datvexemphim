import React, { useEffect } from 'react';
import { Carousel } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { layDanhSachCarouselAction } from '../../../redux/actions/CarouselAction';
import './HomeCarousel.css';

export default function HomeCarousel(props) {
    const dispatch = useDispatch();
    let { arrCarousel } = useSelector(state => state.CarouselReducer);
    const contentStyle = {
        height: '600px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        backgroundPosition: 'center',
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
    };
    
    useEffect(() => {
        dispatch(layDanhSachCarouselAction());
    }, [dispatch])

    const renderCarousel = () => {
        return arrCarousel.map((item, index) => {
            return <a key={index} href={item.duongDan} target='_blank' rel="noreferrer">
                <div style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}>
                </div>
            </a>
        })
    }

    return (
        <Carousel autoplay style={{ width: '100%', padding: 0, margin: 0 }}>
            {renderCarousel()}
        </Carousel>
    );

}
