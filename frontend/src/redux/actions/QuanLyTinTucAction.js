import { history } from "../../App";
import { quanLyTinTucService } from "../../services/QuanLyTinTucService";
import { GET_BINH_LUAN, GET_BINH_LUAN_DETAIL, GET_CHI_TIET_TIN_TUC, GET_TIN_TUC, LAY_KET_QUA_TIM_KIEM } from "../constants";

export const layDanhSachTinTucAction = (id = '') => {
    return async (dispatch) => {

        try {
            if (id !== '') {
                const result = await quanLyTinTucService.layDanhSachTinTuc(id)
                dispatch({
                    type: GET_CHI_TIET_TIN_TUC,
                    detailTinTuc: result.data.content
                })
            } else {
                const result = await quanLyTinTucService.layDanhSachTinTuc()
                dispatch({
                    type: GET_TIN_TUC,
                    arrTinTuc: result.data.content
                })
            }

        } catch (error) {
            console.log('error', error);
        }
    }
}

export const themTinTucAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await quanLyTinTucService.themTinTuc(formData)
            alert('Thêm bài viết thành công');
            history.push('/admin/newsmng');
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const capNhatTinTucAction = (id, formData) => {
    return async (dispatch) => {
        try {
            const result = await quanLyTinTucService.capNhatTinTuc(id, formData)
            alert('Cập nhật bài viết thành công');
            history.push('/admin/newsmng');
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const xoaTinTucAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await quanLyTinTucService.xoaTinTuc(id);
            alert('Xóa tin tức thành công');
            dispatch(layDanhSachTinTucAction())
        } catch (error) {
            console.log('error', error);
        }
    }
}


export const layDanhSachBinhLuanAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await quanLyTinTucService.layBinhLuanBaiViet(id)
            dispatch({
                type: GET_BINH_LUAN,
                arrBinhLuan: result.data.content
            })
        }
        catch (error) {
            console.log('error', error);
        }
    }

}

export const themBinhLuanAction = (id, formData) => {
    return async (dispatch) => {
        try {
            const result = await quanLyTinTucService.themBinhLuanBaiViet(formData)
            // alert('Thêm bài viết thành công');
            // history.push('/admin/newsmng');
            dispatch(layDanhSachBinhLuanAction(id))
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const xoaBinhLuanAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await quanLyTinTucService.xoaBinhLuan(id);
            alert('Xóa bình luận thành công');
        } catch (error) {
            console.log('error', error);
        }
    }
}


export const capNhatBinhLuanAction = (id, formData) => {
    return async (dispatch) => {
        try {
            const result = await quanLyTinTucService.capNhatBinhLuan(id, formData)
            alert('Cập nhật bình luận thành công');
        } catch (error) {
            console.log('error', error);
        }
    }
}


export const layChiTietBinhLuanAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await quanLyTinTucService.layBinhLuan(id)
            dispatch({
                type: GET_BINH_LUAN_DETAIL,
                detailBinhLuan: result.data.content
            })
        }
        catch (error) {
            console.log('error', error);
        }
    }

}



export const layKetQuaTimKiem = (content) => {
    
    return async (dispatch) => {
        try {
            const result = await quanLyTinTucService.timkiem(content)
            dispatch({
                type: LAY_KET_QUA_TIM_KIEM,
                arrTimKiem: result.data.content,
            })
        } catch (error) {
            console.log('error', error);
        }
    }
}