import { quanLyRapService } from "../../services/QuanLyRapService"
import { SET_CHI_TIET_PHIM, GET_HE_THONG_RAP_CHIEU, GET_CUM_RAP_CHIEU, GET_DANH_SACH_TINH_THANH, LAY_FEEDBACK } from "../constants";
import { history } from "../../App";
import { quanLyFeedbackService } from "../../services/QuanLyFeedbackService";


export const layDanhSachFeedbackAction = () => {
    return async dispatch => {
        try {
            const result = await quanLyFeedbackService.layDanhSachFeedback();
            if(result.status === 200) {
                dispatch({
                    type: LAY_FEEDBACK,
                    arrFeedback:result.data.content,
                })
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

export const capNhatFeedbackAction = (formData) => {
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