/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class QuanLyRapService extends baseService {
    constructor() {
        super();
    }

    layThongTinHeThongRap = () => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap`);
    }

    layThongTinLichChieuPhim = (maPhim) => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?maPhim=${maPhim}`);
    }

    layDanhSachHeThongRap = (id = '') => {
        if (id !== '' ) {
            return this.get(`/api/layhethongrap/${id}`);
        } else {
            return this.get(`/api/layhethongrap`);
        }
    }

    themHeThongRap = (formData) => {
        return this.post(`/api/layhethongrap`,formData);
    }

    capNhatTheThongRap = (id,newUser) => {
        return this.post(`/api/layhethongrap/${id}/update`,newUser);
    }

    xoaHeThongRap = (rap) => {
        return this.delete(`/api/layhethongrap/${rap}/delete`);
    }


    ////////

    layDanhSachTinhThanh = () => {
        return this.get(`/api/laydanhsachtinh`);
    }

    layDanhSachCumRap = (id = '') => {
        if (id !== '' ) {
            return this.get(`/api/laydanhsachrap/${id}`);
        } else {
            return this.get(`/api/laydanhsachrap`);
        }
    }

    themCumRap = (formData) => {
        return this.post(`/api/laydanhsachrap`,formData);
    }

    capNhatRap = (id,rap) => {
        return this.post(`/api/laydanhsachrap/${id}/update`,rap);
    }

    xoaRap = (rap) => {
        return this.delete(`/api/laydanhsachrap/${rap}/delete`);
    }
}

export const quanLyRapService = new QuanLyRapService();