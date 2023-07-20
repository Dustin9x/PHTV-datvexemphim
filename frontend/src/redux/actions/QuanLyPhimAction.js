import { history } from "../../App";
import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { SET_DANH_SACH_PHIM, SET_THONG_TIN_PHIM } from "../constants";

export const layDanhSachPhimAction = (tenPhim='') => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.layDanhSachPhim(tenPhim)
            dispatch({
                type: SET_DANH_SACH_PHIM,
                arrMovie: result.data.content
            })
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const themPhimUploadHinhAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.themPhimUploadHinh(formData)
            alert('Thêm phim thành công');
            history.push('/admin/moviemng');
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const capNhatPhimUploadAction = (maPhim,formData) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.capNhatPhimUpload(maPhim,formData)
            alert('Cập nhật phim thành công');
            history.push('/admin/moviemng');
        } catch (error) {
            console.log('error', error);
        }
    }
}


export const layThongTinPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.layThongTinPhim(maPhim);
            dispatch({
                type: SET_THONG_TIN_PHIM,
                movieEditDetail: result.data.content
            })
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const xoaPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.xoaPhim(maPhim);
            alert('Xóa phim thành công');
            dispatch(layDanhSachPhimAction())
        } catch (error) {
            console.log('error', error);
        }
    }
}