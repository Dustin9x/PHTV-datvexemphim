import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import styleSlick from './MovieMultiRowSlick.module.css';
import MovieHover from "./MovieHover";
import { useSelector } from "react-redux";
import { Tabs } from 'antd';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick['slick-prev']}`}
      style={{ ...style, right: "-25px", display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick['slick-prev']}`}
      style={{ ...style, left: "-50px", display: "block" }}
      onClick={onClick}
    />
  );
}

export default function MovieMultiRowSlick(props) {
  const { TabPane } = Tabs;
  const { arrMovie } = useSelector(state => state.MovieReducer);
  const btnRef = useRef();

  useEffect(() => {
    btnRef.current.focus();
  }, []);

  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "100px",
    slidesToShow: 2,
    speed: 500,
    rows: 1,
    slidesPerRow: 2,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  const arrMovieReverse = arrMovie.slice().reverse();
  return (
    <div>
      <Tabs defaultActiveKey='1' left className='' tabBarStyle={{ width: '100%', border: 0 }}>
        <TabPane tab={<button className="block w-full text-xl  focus:outline-none mr-4 py-2 px-4 rounded-full font-semibold  bg-violet-50 text-violet-700 hover:bg-violet-100 focus:bg-violet-700 active:bg-violet-700 focus:text-white"
          ref={btnRef}>ĐANG CHIẾU
        </button>} key="1">

          <Slider {...settings} >
            {arrMovieReverse.filter(item => item.dangChieu === 1).map((item, index) => {
              return <div key={index} >
                <MovieHover phim={item} />
              </div>
            })}
          </Slider>
        </TabPane>
        <TabPane tab={<button className="block w-full text-xl  focus:outline-none mr-4 py-2 px-4 rounded-full font-semibold  bg-violet-50 text-violet-700 hover:bg-violet-100 focus:bg-violet-700 active:bg-violet-700 focus:text-white"
        >SẮP CHIẾU
        </button>} key="2">
          <Slider {...settings} >
            {arrMovieReverse.filter(item => item.sapChieu === 1).map((item, index) => {
              return <div key={index} >
                <MovieHover phim={item} />
              </div>
            })}
          </Slider>
        </TabPane>
      </Tabs>
    </div>
  );
}