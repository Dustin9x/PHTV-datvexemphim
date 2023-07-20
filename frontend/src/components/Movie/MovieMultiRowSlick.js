import React from "react";
import Slider from "react-slick";
import styleSlick from './MovieMultiRowSlick.module.css';
import MovieHover from "./MovieHover";
import { SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from "../../redux/constants";
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash';

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

  const dispatch = useDispatch();
  const { dangChieu, sapChieu } = useSelector(state => state.MovieReducer);
  let activeClassDC = dangChieu === true? 'active_Film' : 'none_active_Film';
  let activeClassSC = sapChieu === true? 'active_Film' : 'none_active_Film';


  const renderMovie = () => {
    return _.orderBy(props.arrMovie,'maPhim','desc').slice(0, 16).map((item, index) => {
      return <div key={index} >
        {/* <Movie phim={item} /> */}
        <MovieHover phim={item} />
      </div>
    })
  }


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
      <button className={`${styleSlick[activeClassDC]} px-8 py-3 font-semibold rounded-full mr-2`} onClick={() => {
        const action = { type: SET_PHIM_DANG_CHIEU }
        dispatch(action)
      }}>PHIM ĐANG CHIẾU</button>
      <button className={`${styleSlick[activeClassSC]} px-8 py-3 font-semibold  rounded-full`} onClick={() => {
        const action = { type: SET_PHIM_SAP_CHIEU }
        dispatch(action)
      }}>PHIM SẮP CHIẾU</button>
      <Slider {...settings} >
        {renderMovie()}
      </Slider>
    </div>
  );

}