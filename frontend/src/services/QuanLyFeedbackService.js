/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class QuanLyFeedbackService extends baseService {
    constructor() {
        super();
    }

    layDanhSachFeedback = (id = '') => {
        if (id !== '') {
            return this.get(`/api/laydanhsachfeedback/${id}`);
        } else {
            return this.get(`/api/laydanhsachfeedback`);
        }
    }

    themFeedback = (formData) => {
        return this.post(`/api/laydanhsachfeedback`, formData);
    }

    capNhatFeedback = (id,formData) => {
        return this.post(`/api/laydanhsachfeedback/${id}/update`,formData);
    }

    xoaFeedback = (id) => {
        return this.delete(`/api/laydanhsachfeedback/${id}/delete`);
    }

}

export const quanLyFeedbackService = new QuanLyFeedbackService();