import { quanLyRapService } from "../../services/QuanLyRapService"
import { SET_CHI_TIET_PHIM, GET_HE_THONG_RAP_CHIEU, GET_CUM_RAP_CHIEU, GET_DANH_SACH_TINH_THANH } from "../constants";
import { history } from "../../App";


export const layDanhSachHeThongRapAction = (id = '') => {
    return async dispatch => {
        try {
            const result = await quanLyRapService.layDanhSachHeThongRap(id);
            if(result.status === 200) {
                dispatch({
                    type: GET_HE_THONG_RAP_CHIEU,
                    heThongRapChieu:result.data.content,
                })
            }
        } catch (error) {
            console.log(error.response?.data)
        }
    }
}

export const themHeThongRapAction = (formData) => {
    return async dispatch => {
        try {
            const result = await quanLyRapService.themHeThongRap(formData);
            alert('Thêm hệ thống rạp thành công');
            history.push('/admin/theatremng');
        } catch (error) {
            alert(error.response.data.message)
        }
    }
}

export const capNhatHeThongRapAction = (id,newUser) => {
    return async (dispatch) => {
        try {
            const result = await quanLyRapService.capNhatTheThongRap(id,newUser);
            dispatch(layDanhSachHeThongRapAction())
            alert('Cập nhật hệ thống rạp thành công')
            history.goBack();
        } catch (error) {
            console.log(error)
        }
    }
}


export const xoaHeThongRapAction = (rap) => {
    return async (dispatch) => {
        try {
            const result = await quanLyRapService.xoaHeThongRap(rap);
            alert('Xóa hệ thống rạp thành công');
            dispatch(layDanhSachHeThongRapAction())
        } catch (error) {
            console.log('error', error);
        }
    }
}


////


export const layDanhSachTinhThanhAction = () => {
    return async dispatch => {
        try {
            const result = await quanLyRapService.layDanhSachTinhThanh();
            if(result.status === 200) {
                dispatch({
                    type: GET_DANH_SACH_TINH_THANH,
                    tinhThanh:result.data.content,
                })
            }
        } catch (error) {
            console.log(error.response?.data)
        }
    }
}

export const layDanhSachCumRapAction = (id = '') => {
    return async dispatch => {
        try {
            const result = await quanLyRapService.layDanhSachCumRap(id);
            if(result.status === 200) {
                dispatch({
                    type: GET_CUM_RAP_CHIEU,
                    cumRap:result.data.content,
                })
            }
        } catch (error) {
            console.log(error.response?.data)
        }
    }
}


export const themCumRapAction = (formData) => {
    return async dispatch => {
        try {
            const result = await quanLyRapService.themCumRap(formData);
            alert('Thêm cụm rạp thành công');
            history.push('/admin/theatrechildmng');
        } catch (error) {
            alert(error.response.data.message)
        }
    }
}

export const capNhaRapChieuAction = (id,rap) => {
    return async (dispatch) => {
        try {
            const result = await quanLyRapService.capNhatRap(id,rap);
            dispatch(layDanhSachCumRapAction())
            alert('Cập nhật rạp chiếu thành công')
            history.goBack();
        } catch (error) {
            console.log(error)
        }
    }
}


export const xoaRapChieuAction = (rap) => {
    return async (dispatch) => {
        try {
            const result = await quanLyRapService.xoaRap(rap);
            alert('Xóa rạp chiếu thành công');
            dispatch(layDanhSachCumRapAction())
        } catch (error) {
            console.log('error', error);
        }
    }
}