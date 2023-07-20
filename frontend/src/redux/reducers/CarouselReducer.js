import { GET_CAROUSEL, SET_THONG_TIN_CAROUSEL, UPDATE_CAROUSEL } from "../constants";

const initialState = {
    arrCarousel: [
        {
            "maPhim": 1314,
            "tenPhim": "Black Window",
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png",
            "hot": false,
            "dangChieu": false,
            "sapChieu": true
        }
    ],
    carouselEditDetail: {}

}

export const CarouselReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_CAROUSEL:
            state.arrCarousel = action.arrCarousel;
            return { ...state }

        case SET_THONG_TIN_CAROUSEL: {
            state.carouselEditDetail = action.carouselEditDetail;
            return { ...state }
        }
        default:
            return { ...state }
    }
}
