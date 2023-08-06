/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class QuanLyNguoiDungService extends baseService {
    constructor() {
        super();
    }

    dangNhap = (thongTinDangNhap) => {
        return this.post(`/api/auth/login`,thongTinDangNhap);
    }

    dangKy = (thongTinDangKy) => {
        return this.post(`/api/auth/signup`,thongTinDangKy);
    }

    layLaiMatKhau = (thongTinEmail) => {
        return this.post(`/api/auth/passwordRetrieval`, thongTinEmail);
      };

    themNguoiDung = (newUser) => {
        return this.post(`/api/laydanhsachuser`,newUser);
    }

    capNhatNguoiDung = (id,newUser) => {
        return this.post(`/api/laydanhsachuser/${id}/update`,newUser);
    }

    layThongTinDatVe = () => {
        return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`);
    }

    layDanhSachNguoiDung = (id = '') => {
        if (id !== '' ) {
            return this.get(`/api/laydanhsachuser/${id}`);
        } else {
            return this.get(`/api/laydanhsachuser/`);
        }
    }

    xoaNguoiDung = (TaiKhoan) => {
        return this.delete(`/api/laydanhsachuser/${TaiKhoan}/delete`);
    }
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();