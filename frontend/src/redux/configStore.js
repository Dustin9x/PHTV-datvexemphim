import { applyMiddleware, createStore, combineReducers } from "redux";
import reduxThunk from 'redux-thunk';
import { CarouselReducer } from './reducers/CarouselReducer';
import { MovieReducer } from './reducers/MovieReducer';
import { RapReducer } from './reducers/RapReducer';
import { UserReducer } from './reducers/UserReducer';
import { QuanLyDatVeReducer } from './reducers/QuanLyDatVeReducer';
import { LoadingReducer } from './reducers/LoadingReducer';
import { NewsReducer } from './reducers/NewsReducer';



const rootReducer = combineReducers({
    CarouselReducer,
    MovieReducer,
    RapReducer,
    UserReducer,
    QuanLyDatVeReducer,
    LoadingReducer,
    NewsReducer
})

export const store = createStore(rootReducer,applyMiddleware(reduxThunk));