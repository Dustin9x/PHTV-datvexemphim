import { GET_CAROUSEL, SET_THONG_TIN_CAROUSEL } from "../constants";

const initialState = {
    arrCarousel: [],
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
