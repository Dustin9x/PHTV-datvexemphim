/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class QuanLyFeedbackService extends baseService {
    constructor() {
        super();
    }

    layDanhSachFeedback = () => {
        return this.get(`/api/laydanhsachfeedback`);
    }

    themFeedback = (formData) => {
        return this.post(`/api/laydanhsachfeedback`, formData);
    }

}

export const quanLyFeedbackService = new QuanLyFeedbackService();