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


}

export const quanLyDonHangService = new QuanLyDonHangService();