import { GET_BINH_LUAN_DETAIL_PHIM, GET_BINH_LUAN_PHIM, SET_CHI_TIET_PHIM, SET_DANH_SACH_PHIM, SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU, SET_THONG_TIN_PHIM } from "../constants";

const initialState = {
    arrMovie: [
      {
        "maPhim": 11078,
        "tenPhim": "Avatar: Dòng chảy của nước 2 tiếp tục series",
        "biDanh": "avatar-dong-chay-cua-nuoc-2-tiep-tuc-series",
        "trailer": "https://www.youtube.com/watch?v=gq2xKJXYZ80",
        "hinhAnh": "https://movieapi.cyberlearn.vn/hinhanh/avatar-dong-chay-cua-nuoc-2-tiep-tuc-series_gp01.jpg",
        "moTa": "avartar 2 dong chay nuoc",
        "maNhom": "GP01",
        "ngayKhoiChieu": "2023-05-14T13:12:31.497",
        "danhGia": 9,
        "hot": false,
        "dangChieu": true,
        "sapChieu": false
      }
    ],
    dangChieu: true,
    sapChieu: true,
    arrMovieDefault: [],
    movieDetail:{},
    movieEditDetail:{},
    arrBinhLuanPhim: [],
    detailBinhLuanPhim: {},
}

export const MovieReducer = (state = initialState, action) => {
  switch (action.type) {

  case SET_DANH_SACH_PHIM: {
    state.arrMovie = action.arrMovie;
    state.arrMovieDefault = action.arrMovie;
    return { ...state }
  }

  case SET_PHIM_DANG_CHIEU: {
    state.dangChieu = !state.dangChieu;
    state.arrMovie = state.arrMovieDefault.filter(movie => movie.dangChieu === state.dangChieu);
    return { ...state }
  }

  case SET_PHIM_SAP_CHIEU: {
    state.sapChieu = !state.sapChieu;
    state.arrMovie = state.arrMovieDefault.filter(movie => movie.sapChieu === state.sapChieu);
    return { ...state }
  }

  // case SET_CHI_TIET_PHIM: {
  //   state.movieDetail = action.movieDetail;
  //   return { ...state }
  // }

  case SET_THONG_TIN_PHIM: {
    state.movieEditDetail = action.movieEditDetail;
    return { ...state }
  }

  case GET_BINH_LUAN_PHIM: {
    state.arrBinhLuanPhim = action.arrBinhLuanPhim;
    return { ...state }
  }

  case GET_BINH_LUAN_DETAIL_PHIM: {
    state.detailBinhLuanPhim = action.detailBinhLuanPhim;
    return { ...state }
  }

  default:
    return state
  }
}
