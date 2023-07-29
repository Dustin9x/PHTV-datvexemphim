/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class QuanLyDonHangService extends baseService {
    constructor() {
        super();
    }

    datVe = (donHang) => {
        return this.post(`/api/laydanhsachdonhang`,donHang);
    }

    layChiTietDonHang = (id ) => {
        return this.get(`/api/laychitietdonhang/${id}`);
    }



    layDonHangTheoUser = (id ) => {
        return this.get(`/api/laydanhsachdonhang/${id}`);
    }


    layDoanhThu = ( year ) => {
        return this.get(`/api/doanhthu/${year}`);
    }


}

export const quanLyDonHangService = new QuanLyDonHangService();