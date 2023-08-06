import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService"
import { DANG_NHAP_ACTION, LAY_CHI_TIET_NGUOI_DUNG, LAY_DANH_SACH_NGUOI_DUNG, SET_THONG_TIN_DAT_VE, TIM_KIEM_NGUOI_DUNG } from "../constants";
import { history } from './../../App';
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";


export const dangNhapAction = (thongTinDangNhap) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
            const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
            if (result.data.status === 200) {
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.content
                })
                history.push('home');
            }
            await dispatch(hideLoadingAction)
        } catch (error) {
            console.log(error)
            alert(error.response.data.message)
        }
    }
}


export const dangKyAction = (thongTinDangKy) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.dangKy(thongTinDangKy);
            if (result.data.status === 200) {
                alert('Đăng ký thành công, xin đăng nhập để tiếp tục')
                history.replace('login');
            } else {
                alert('Xin lỗi! Email này đã được sử dụng!')
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const themNguoiDungAction = (newUser) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.themNguoiDung(newUser);
            alert('Thêm người dùng mới thành công')
            history.push('/admin/users');
        } catch (error) {
            alert(error.response.data.message)
        }
    }
}

export const capNhatNguoiDungAction = (id,newUser) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.capNhatNguoiDung(id,newUser);
            dispatch(layDanhSachNguoiDungAction())
            dispatch(layThongTinNguoiDungAction(id))
            alert('Cập nhật người dùng thành công')
            history.goBack();
        } catch (error) {
            console.log(error)
        }
    }
}

export const layThongTinDatVeAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layThongTinDatVe();
            if (result.data.status === 200) {
                dispatch({
                    type: SET_THONG_TIN_DAT_VE,
                    thongTinNguoiDung: result.data.content
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const layDanhSachNguoiDungAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layDanhSachNguoiDung();
            if (result.data.status === 200) {
                dispatch({
                    type: LAY_DANH_SACH_NGUOI_DUNG,
                    arrUser: result.data.content
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}


export const layThongTinNguoiDungAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layDanhSachNguoiDung(id);
            if (result.data.status === 200) {
                dispatch({
                    type: LAY_CHI_TIET_NGUOI_DUNG,
                    profile: result.data.content
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}



export const xoaNguoiDungAction = (TaiKhoan) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.xoaNguoiDung(TaiKhoan);
            alert('Xóa người dùng thành công');
            dispatch(layDanhSachNguoiDungAction())
        } catch (error) {
            console.log('error', error);
        }
    }
}