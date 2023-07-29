import { result } from "lodash";
import { history } from "../../App";
import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { quanLyTinTucService } from "../../services/QuanLyTinTucService";
import { CHUYEN_TAB, CHUYEN_TAB_ACTIVE, DAT_VE, GET_BINH_LUAN, GET_BINH_LUAN_DETAIL, GET_CHI_TIET_TIN_TUC, GET_TIN_TUC, LAY_DANH_SACH_DON_HANG_THEO_USER, LAY_DOANH_THU, SET_DANH_SACH_PHIM, SET_THONG_TIN_PHIM } from "../constants";
import { quanLyDonHangService } from "../../services/QuanLyDonHangService";
import { displayLoadingAction, hideLoadingAction } from './LoadingAction';


export const layDonHangTheoUserAction = (id) => {
    return async (dispatch) => {

        try {
            const result = await quanLyDonHangService.layDonHangTheoUser(id)
            dispatch({
                type: LAY_DANH_SACH_DON_HANG_THEO_USER,
                arrDonHang: result.data.content
            })
            console.log('arrDonHang',result.data.content)
        } catch (error) {
            console.log('error', error);
        }
    }
}


export const datVeAction = (donHang) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)

            const result = await quanLyDonHangService.datVe(donHang);
            // alert('Đặt vé thành công, xin cám ơn');
            await dispatch(hideLoadingAction)
            dispatch({type:CHUYEN_TAB_ACTIVE,number:'3'})
        } catch (error) {
            console.log(error)
        }
    }
}


export const layDoanhThuAction = (year) => {
    return async (dispatch) => {
        try {
            const result = await quanLyDonHangService.layDoanhThu(year);
            dispatch({
                type:LAY_DOANH_THU,
                arrDoanhThu: result.data.content
            })
        } catch (error) {
            console.log(error)
        }
    }
}