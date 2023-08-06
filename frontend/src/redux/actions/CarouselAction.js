import { GET_CAROUSEL, SET_THONG_TIN_CAROUSEL } from "../constants";
import { quanLyCarouselService } from "../../services/QuanLyCarouselService";
import { history } from "../../App";


export const layDanhSachCarouselAction = (thamSo) => {
    return async (dispatch) => {
        try {
            const result = await quanLyCarouselService.layDanhSachCarousel();
            dispatch({
                type: GET_CAROUSEL,
                arrCarousel: result.data.content
            })
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const themCarouselAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await quanLyCarouselService.themCarousel(formData)
            alert('Thêm carousel thành công');
            history.push('/admin/carouselmng');
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const capNhatCarouselAction = (maBanner,formData) => {
    return async (dispatch) => {
        try {
            const result = await quanLyCarouselService.capNhatCarousel(maBanner,formData)
            alert('Cập nhật carousel thành công');
            history.push('/admin/carouselmng');
        } catch (error) {
            console.log('error', error);
        }
    }
}


export const layThongTinCarouselAction = (maBanner) => {
    return async (dispatch) => {
        try {
            const result = await quanLyCarouselService.layThongTinCarousel(maBanner);
            dispatch({
                type: SET_THONG_TIN_CAROUSEL,
                carouselEditDetail: result.data.content
            })
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const xoaCarouselAction = (maPhim) => {
    return async (dispatch) => {
        try {
            const result = await quanLyCarouselService.xoaCarousel(maPhim);
            alert('Xóa carousel thành công');
            dispatch(layDanhSachCarouselAction())
        } catch (error) {
            console.log('error', error);
        }
    }
}