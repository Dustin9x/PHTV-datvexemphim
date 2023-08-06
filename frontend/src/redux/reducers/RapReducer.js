import { GET_CUM_RAP_CHIEU, GET_DANH_SACH_TINH_THANH } from "../constants"

const initialState = {
  cumRap: [],
  tinhThanh: []
}

export const RapReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_CUM_RAP_CHIEU:
      state.cumRap = action.cumRap;
      return { ...state }

    case GET_DANH_SACH_TINH_THANH:
      state.tinhThanh = action.tinhThanh;
      return { ...state }
    default:
      return state
  }
}
