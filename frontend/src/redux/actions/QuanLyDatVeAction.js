import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { CHUYEN_TAB, DAT_VE_HOAN_TAT, DISPLAY_LOADING, HIDE_LOADING, LAY_CHI_TIET_LICH_CHIEU, LAY_DANH_SACH_GHE, LAY_DANH_SACH_LICH_CHIEU, SET_CHI_TIET_PHONG_VE } from "../constants";
import { displayLoadingAction, hideLoadingAction } from './LoadingAction';
import { history } from "../../App";


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
            console.log('lichchieuresult',result)
        } catch (error) {
            console.log(error)
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
            alert('Thêm lịch chiếu thành công');
            // history.push('/admin/moviemng');
            console.log('lichchieu',result)
        } catch (error) {
            console.log(error)
        }
    }
}

export const capNhatLichChieuAction = (id,formData) => {
    return async (dispatch) => {
        try {
            const result = await quanLyDatVeService.capNhatLichChieu(id,formData)
            alert('Cập nhật lịch chiếu thành công');
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
            console.log('resultdanhsachghe',result)
        } catch (error) {
            console.log('error', error);
        }
    }
}

// export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
//     return async (dispatch) => {
//         try {
//             dispatch(displayLoadingAction)

//             const result = await quanLyDatVeService.datVe(thongTinDatVe);
//             if (result.data.statusCode === 200) {
//                 dispatch({
//                     type: SET_CHI_TIET_PHONG_VE,
//                     chiTietPhongVe: result.data.content
//                 })
//             }

//             //Goi API load lai so do chon ghe
//             await dispatch(layDanhSachLichChieuAction(thongTinDatVe.maLichChieu))
//             await dispatch({
//                 type: DAT_VE_HOAN_TAT
//             })

//             await dispatch(hideLoadingAction)
//             dispatch({type:CHUYEN_TAB})
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }

