import { CHUYEN_TAB, CHUYEN_TAB_ACTIVE, DAT_VE, DAT_VE_HOAN_TAT, LAY_CHI_TIET_LICH_CHIEU, LAY_DANH_SACH_GHE, LAY_DANH_SACH_LICH_CHIEU, LAY_LICH_CHIEU_THEO_PHIM, SET_CHI_TIET_PHONG_VE, XAC_NHAN_DON_HANG } from "../constants"

const initialState = {
    chiTietPhongVe: {},
    lichChieu: [],
    lichChieuTheoPhim: [],
    lichChieuChiTiet: [],
    lichChieuEdit: [],
    danhSachGhe: [],
    danhSachGheDangChon: [],
    danhSachGheKhachDat: [{ maGhe: 61641 }, { maGhe: 61642 }],
    tabActive: '1',
    donhang:{}
}

export const QuanLyDatVeReducer = (state = initialState, action) => {
    switch (action.type) {

        case LAY_DANH_SACH_LICH_CHIEU:
            state.lichChieu = action.lichChieu;
            return { ...state }

        case LAY_LICH_CHIEU_THEO_PHIM:
            state.lichChieuTheoPhim = action.lichChieuTheoPhim;
            return { ...state }

        case LAY_CHI_TIET_LICH_CHIEU:
            state.lichChieuChiTiet = action.lichChieuChiTiet;
            return { ...state }

        case LAY_DANH_SACH_GHE:
            state.danhSachGhe = action.danhSachGhe;
            return { ...state }

        case XAC_NHAN_DON_HANG:
            state.donHang = action.donHang;
            return { ...state }

        case DAT_VE:
            let danhSachGheCapNhat = [...state.danhSachGheDangChon];
            let index = danhSachGheCapNhat.findIndex(gheDD => gheDD.maGhe === action.gheDuocChon.maGhe);
            if (index != -1) {
                danhSachGheCapNhat.splice(index, 1)
            } else {
                danhSachGheCapNhat.push(action.gheDuocChon)
            }
            state.danhSachGheDangChon = danhSachGheCapNhat
            return { ...state }

        case DAT_VE_HOAN_TAT:
            state.danhSachGheDangChon = [];
            return { ...state }

        case CHUYEN_TAB:
            state.tabActive = '2'
            return { ...state }

        case CHUYEN_TAB_ACTIVE:
            state.tabActive = action.number
            return { ...state }

        default:
            return state
    }
}
