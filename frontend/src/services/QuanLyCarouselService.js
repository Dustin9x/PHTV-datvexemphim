/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class QuanLyCarouselService extends baseService {
    constructor() {
        super();
    }

    layDanhSachCarousel = () => {
        return this.get(`/api/laydanhsachbanner`);
    }


    themCarousel = (formData) => {
        return this.post(`/api/laydanhsachbanner`, formData);
    }

    layThongTinCarousel = (maBanner) => {
        return this.get(`/api/laydanhsachbanner/${maBanner}`);
    }

    capNhatCarousel = (maBanner,formData) => {
        return this.post(`/api/laydanhsachbanner/${maBanner}/update`, formData);
    }

    xoaCarousel = (maBanner) => {
        return this.delete(`/api/laydanhsachbanner/${maBanner}/delete`);
    }
    
}

export const quanLyCarouselService = new QuanLyCarouselService();