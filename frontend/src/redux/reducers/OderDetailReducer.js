import { DAT_VE, GET_BINH_LUAN, GET_BINH_LUAN_DETAIL, GET_CHI_TIET_TIN_TUC, GET_HE_THONG_RAP_CHIEU, GET_TIN_TUC, LAY_DOANH_THU, SET_CHI_TIET_PHIM, SET_DANH_SACH_PHIM, SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU, SET_THONG_TIN_PHIM } from "../constants";

const initialState = {
  detailDonHang: [],
  arrDoanhThu:[]
}

export const OrderDetailReducer = (state = initialState, action) => {
  switch (action.type) {

    case DAT_VE: {
      state.detailDonHang = action.detailDonHang;
      return { ...state }
    }

    case LAY_DOANH_THU: {
      state.arrDoanhThu = action.arrDoanhThu;
      return { ...state }
    }

    default:
      return state
  }
}
