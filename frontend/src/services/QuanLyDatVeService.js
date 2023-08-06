/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";
import { ThongTinDatVe } from './../_core/models/ThongTinDatVe';

export class QuanLyDatVeService extends baseService {
    constructor() {
        super();
    }

    layChiTietPhongVe = (maLichChieu) => { 
        return this.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
    }

    // datVe = (thongTinDatVe = new ThongTinDatVe()) => {
    //     return this.post(`/api/QuanLyDatVe/DatVe`,thongTinDatVe);
    // }

    

    layDanhSachLichChieu = () => {
        return this.get(`/api/laydanhsachlichchieu`);
    }

    layLichChieuTheoPhim = (id) => {
        return this.get(`/api/laylichchieutheophim/${id}`);
    }

    layChiTietLichChieu = (id) => {
        return this.get(`/api/laydanhsachlichchieu/${id}`);
    }

    taoLichChieu = (thongTinLichChieu) => {
        return this.post(`/api/laydanhsachlichchieu`,thongTinLichChieu);
    }

    capNhatLichChieu = (id,formData) => {
        return this.post(`/api/laydanhsachlichchieu/${id}/update`, formData);
    }

    xoaLichChieu = (id) => {
        return this.delete(`/api/laydanhsachlichchieu/${id}/delete`);
    }


    layDanhSachGhe = (id) => {
        return this.get(`/api/laydanhsachghe/${id}`);
    }
    chonGhe = (danhSachGheDangChon) => {
        return this.post(`/api/chonghe`,danhSachGheDangChon);
    }

    

}

export const quanLyDatVeService = new QuanLyDatVeService();