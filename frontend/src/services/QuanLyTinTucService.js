/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class QuanLyTinTucService extends baseService {
    constructor() {
        super();
    }

    layDanhSachTinTuc = (id = '') => {
        if (id != '') {
            return this.get(`/api/laydanhsachtintuc/${id}`);

        } else {
            return this.get(`/api/laydanhsachtintuc`);

        }
    }

    themTinTuc = (formData) => {
        return this.post(`/api/laydanhsachtintuc`, formData);
    }

    capNhatTinTuc = (id,formData) => {
        return this.post(`/api/laydanhsachtintuc/${id}/update`,formData);
    }

    xoaTinTuc = (id) => {
        return this.delete(`/api/laydanhsachtintuc/${id}/delete`);
    }

    layBinhLuanBaiViet = (id) => {
        return this.get(`/api/laydanhsachbinhluan/${id}`);
    }

    themBinhLuanBaiViet = (binhLuan) => {
        return this.post(`/api/laydanhsachbinhluan`,binhLuan);
    }

    xoaBinhLuan = (id) => {
        return this.delete(`/api/laydanhsachbinhluan/${id}/delete`);
    }


    capNhatBinhLuan = (id,formData) => {
        return this.post(`/api/laydanhsachbinhluan/${id}/update`,formData);
    }

    layBinhLuan = (id) => {
        return this.get(`/api/laydanhsachbinhluan/${id}/edit`);
    }


    timkiem = (content) => {
        return this.get(`/api/timkiem/search/?search=${content}`)
    }

}

export const quanLyTinTucService = new QuanLyTinTucService();