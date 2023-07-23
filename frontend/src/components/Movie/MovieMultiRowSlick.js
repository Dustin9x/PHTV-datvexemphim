import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import styleSlick from './MovieMultiRowSlick.module.css';
import MovieHover from "./MovieHover";
import { SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from "../../redux/constants";
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash';
import { Tabs, Rate, Segmented, Tag, Button } from 'antd';
import { layDanhSachPhimAction } from "../../redux/actions/QuanLyPhimAction";

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
  return (
    <div>
      <Tabs defaultActiveKey='1' left className='mt-5' style={{ border: 0 }} tabBarStyle={{ width: '100%', border: 0 }}>
        <TabPane tab={<button class="block w-full text-xl text-slate-500 focus:outline-none mr-4 py-2 px-4 rounded-full font-semibold  bg-violet-50 text-violet-700 hover:bg-violet-100 focus:bg-violet-700 active:bg-violet-700 focus:text-white"
       ref={btnRef}>ĐANG CHIẾU
        </button>} key="1">

          {arrMovie.filter(item => item.dangChieu === 1).slice(0, 16).map((item, index) => {
            return <Slider {...settings} >
              <div key={index} >
                {/* <Movie phim={item} /> */}
                <MovieHover phim={item} />
              </div>
            </Slider>
          })}





        </TabPane>
        <TabPane tab={<button class="block w-full text-xl text-slate-500 focus:outline-none mr-4 py-2 px-4 rounded-full font-semibold  bg-violet-50 text-violet-700 hover:bg-violet-100 focus:bg-violet-700 active:bg-violet-700 focus:text-white"
        >SẮP CHIẾU
        </button>} key="2">
          {arrMovie.filter(item => item.sapChieu === 1).slice(0, 16).map((item, index) => {
            return <Slider {...settings} >
              <div key={index} >
                {/* <Movie phim={item} /> */}
                <MovieHover phim={item} />
              </div>
            </Slider>
          })}
        </TabPane>
      </Tabs>




      {/* <button name="dangChieu" className={`${styleSlick[activeClassDC]} px-8 py-3 font-semibold rounded-full mr-2`} onClick={() => {
        lstMovieByStatus = arrMovie.filter(item => item.dangChieu === 1)
        setLstMovieByStatus(lstMovieByStatus);
        // const action = { type: SET_PHIM_DANG_CHIEU }
        // dispatch(action)
      }}>PHIM ĐANG CHIẾU</button>
      <button name="sapChieu" className={`${styleSlick[activeClassSC]} px-8 py-3 font-semibold  rounded-full`} onClick={() => {
        lstMovieByStatus = arrMovie.filter(item => item.sapChieu === 1)
        setLstMovieByStatus(lstMovieByStatus);
        // const action = { type: SET_PHIM_SAP_CHIEU }
        // dispatch(action)
      }}>PHIM SẮP CHIẾU</button>
      <Slider {...settings} >
        {renderMovie()}
      </Slider> */}
    </div>
  );

}