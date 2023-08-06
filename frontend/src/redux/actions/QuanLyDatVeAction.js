import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { CHON_GHE, CHUYEN_TAB, LAY_CHI_TIET_LICH_CHIEU, LAY_DANH_SACH_GHE, LAY_DANH_SACH_LICH_CHIEU, LAY_LICH_CHIEU_THEO_PHIM, SET_CHI_TIET_PHONG_VE, XAC_NHAN_DON_HANG } from "../constants";
import { displayLoadingAction, hideLoadingAction } from './LoadingAction';


export const layDanhSachLichChieuAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyDatVeService.layDanhSachLichChieu();
            if (result.data.status === 200) {
                dispatch({
                    type: LAY_DANH_SACH_LICH_CHIEU,
                    lichChieu: result.data.content
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const layLichChieuTheoPhimAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await quanLyDatVeService.layLichChieuTheoPhim(id);
            dispatch({
                type: LAY_LICH_CHIEU_THEO_PHIM,
                lichChieuTheoPhim: result.data.content
            })
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const layChiTietLichChieuAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await quanLyDatVeService.layChiTietLichChieu(id);
            dispatch({
                type: LAY_CHI_TIET_LICH_CHIEU,
                lichChieuChiTiet: result.data.content
            })
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const taoLichChieuAction = (thongTinLichChieu) => {
    return async (dispatch) => {
        try {
            const result = await quanLyDatVeService.taoLichChieu(thongTinLichChieu);
            if (result.data.status === 200) {
                alert('Thêm lịch chiếu thành công');
            } else if (result.data.status === 401) {
                alert('Lịch chiếu bị trùng lặp, vui lòng kiểm tra lại');
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const capNhatLichChieuAction = (id,formData) => {
    return async (dispatch) => {
        try {
            const result = await quanLyDatVeService.capNhatLichChieu(id,formData)
            if (result.data.status === 200) {
                alert('Cập nhật lịch chiếu thành công');
            } else if (result.data.status === 401) {
                alert('Lịch chiếu bị trùng lặp, vui lòng kiểm tra lại');
            }
            
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const xoaLichChieuAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await quanLyDatVeService.xoaLichChieu(id);
            alert('Xóa lịch chiếu thành công');
            // dispatch(layDanhSachLichChieuAction())
        } catch (error) {
            console.log('error', error);
        }
    }
}


export const layDanhSachGheAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await quanLyDatVeService.layDanhSachGhe(id);
            dispatch({
                type: LAY_DANH_SACH_GHE,
                danhSachGhe: result.data.content
            })
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const chonGheAction = (danhSachGheSelect) => {
    return async (dispatch) => {
        try {
            const result = await quanLyDatVeService.chonGhe(danhSachGheSelect);
            dispatch({
                type: CHON_GHE,
                danhSachGheSelect: danhSachGheSelect
            })
            console.log('chonGhe',result)
        } catch (error) {
            console.log(error)
        }
    }
}

export const xacNhanDatVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
            dispatch({
                type: XAC_NHAN_DON_HANG,
                donHang: thongTinDatVe
            })
            await dispatch(hideLoadingAction)
            dispatch({type:CHUYEN_TAB})
        } catch (error) {
            console.log(error)
        }
    }
}

