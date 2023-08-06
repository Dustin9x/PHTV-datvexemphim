import { CHUYEN_TAB, CHUYEN_TAB_ACTIVE, DAT_VE, DAT_VE_HOAN_TAT, LAY_CHI_TIET_LICH_CHIEU, LAY_DANH_SACH_DON_HANG_THEO_USER, LAY_DANH_SACH_GHE, LAY_DANH_SACH_LICH_CHIEU, LAY_LICH_CHIEU_THEO_PHIM, XAC_NHAN_DON_HANG } from "../constants"

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
    donhang: {},
    arrDonHang: [],
    disableTab: false
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

        case LAY_DANH_SACH_DON_HANG_THEO_USER:
            state.arrDonHang = action.arrDonHang;
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
            state.disableTab = true
            return { ...state }

        case CHUYEN_TAB_ACTIVE:
            state.tabActive = action.number
            state.disableTab = true
            state.disableTab1 = true
            return { ...state }

        default:
            return state
    }
}
