import { GET_BINH_LUAN, GET_BINH_LUAN_DETAIL, GET_CHI_TIET_TIN_TUC, GET_HE_THONG_RAP_CHIEU, GET_TIN_TUC, SET_CHI_TIET_PHIM, SET_DANH_SACH_PHIM, SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU, SET_THONG_TIN_PHIM } from "../constants";

const initialState = {
  arrTinTuc: [],
  detailTinTuc: {},
  arrBinhLuan: [],
  detailBinhLuan: {},

}

export const NewsReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_TIN_TUC: {
      state.arrTinTuc = action.arrTinTuc;
      return { ...state }
    }

    case GET_CHI_TIET_TIN_TUC: {
      state.detailTinTuc = action.detailTinTuc;
      return { ...state }
    }

    case GET_BINH_LUAN: {
      state.arrBinhLuan = action.arrBinhLuan;
      return { ...state }
    }

    case GET_BINH_LUAN_DETAIL: {
      state.detailBinhLuan = action.detailBinhLuan;
      return { ...state }
    }

    default:
      return state
  }
}
