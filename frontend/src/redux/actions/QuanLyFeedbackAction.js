import { quanLyRapService } from "../../services/QuanLyRapService"
import { SET_CHI_TIET_PHIM, GET_HE_THONG_RAP_CHIEU, GET_CUM_RAP_CHIEU, GET_DANH_SACH_TINH_THANH, LAY_FEEDBACK, LAY_CHITIET_FEEDBACK } from "../constants";
import { history } from "../../App";
import { quanLyFeedbackService } from "../../services/QuanLyFeedbackService";


export const layDanhSachFeedbackAction = (id = '') => {
    return async dispatch => {
        try {
            if (id !== '') {
                const result = await quanLyFeedbackService.layDanhSachFeedback(id);
                if(result.status === 200) {
                    dispatch({
                        type: LAY_CHITIET_FEEDBACK,
                        feedbackEditDetail:result.data.content,
                    })
                }
            } else {
                const result = await quanLyFeedbackService.layDanhSachFeedback();
                if(result.status === 200) {
                    dispatch({
                        type: LAY_FEEDBACK,
                        arrFeedback:result.data.content,
                    })
                }
            }
            
        } catch (error) {
            console.log(error.response?.data)
        }
    }
}

export const themFeedbackAction = (formData) => {
    return async dispatch => {
        try {
            const result = await quanLyFeedbackService.themFeedback(formData);
            alert('Đã gửi feedback thành công, chúng tôi sẽ liên hệ bạn sớm nhất có thể nhé!');
            history.push('/home');
        } catch (error) {
            console.log(error.response?.data)
        }
    }
}

export const capNhatFeedbackAction = (id,formData) => {
    return async dispatch => {
        try {
            const result = await quanLyFeedbackService.capNhatFeedback(id,formData);
            alert('Cập nhật xử lý thành công');
            history.push('/admin/feedbackmng');
        } catch (error) {
            console.log(error.response?.data)
        }
    }
}

export const xoaFeedbackAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await quanLyFeedbackService.xoaFeedback(id);
            // alert('Xóa feedback thành công');
            dispatch(layDanhSachFeedbackAction())
        } catch (error) {
            console.log('error', error);
        }
    }
}