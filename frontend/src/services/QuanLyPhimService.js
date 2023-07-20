/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class QuanLyPhimService extends baseService {
    constructor() {
        super();
    }

    layDanhSachPhim = (maPhim = '') => {
        if (maPhim != '') {
            return this.get(`/api/LayDanhSachPhim/${maPhim}`);

        } else {
            return this.get(`/api/LayDanhSachPhim`);

        }
    }

    themPhimUploadHinh = (formData) => {
        return this.post(`/api/LayDanhSachPhim`, formData);
    }

    layThongTinPhim = (maPhim) => {
        return this.get(`/api/LayDanhSachPhim/${maPhim}`);
    }

    capNhatPhimUpload = (maPhim,formData) => {
        return this.post(`/api/LayDanhSachPhim/${maPhim}/update`, formData);
    }

    xoaPhim = (maPhim) => {
        return this.delete(`/api/LayDanhSachPhim/${maPhim}/delete`);
    }

    
}

export const quanLyPhimService = new QuanLyPhimService();