import { history } from "../../App";
import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { GET_BINH_LUAN_DETAIL_PHIM, GET_BINH_LUAN_PHIM, SET_DANH_SACH_PHIM, SET_THONG_TIN_PHIM } from "../constants";

export const layDanhSachPhimAction = (tenPhim='') => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.layDanhSachPhim(tenPhim)
            dispatch({
                type: SET_DANH_SACH_PHIM,
                arrMovie: result.data.content
            })
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const themPhimUploadHinhAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.themPhimUploadHinh(formData)
            alert('Thêm phim thành công');
            history.push('/admin/moviemng');
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const capNhatPhimUploadAction = (maPhim,formData) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.capNhatPhimUpload(maPhim,formData)
            alert('Cập nhật phim thành công');
            history.push('/admin/moviemng');
        } catch (error) {
            console.log('error', error);
        }
    }
}


export const layThongTinPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.layThongTinPhim(maPhim);
            dispatch({
                type: SET_THONG_TIN_PHIM,
                movieEditDetail: result.data.content
            })
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const xoaPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.xoaPhim(maPhim);
            alert('Xóa phim thành công');
            dispatch(layDanhSachPhimAction())
        } catch (error) {
            console.log('error', error);
        }
    }
}


//Review phim
export const layDanhSachBinhLuanPhimAction = (id = '') => {
    return async (dispatch) => {
      try {
        const result = await quanLyPhimService.layBinhLuanPhim(id);
        dispatch({
          type: GET_BINH_LUAN_PHIM,
          arrBinhLuanPhim: result.data.content,
        })
      } catch (error) {
        console.log("error", error);
      }
    }
  }
  
  export const themBinhLuanPhimAction = (id, formData) => {
    return async (dispatch) => {
      try {
        const result = await quanLyPhimService.themBinhLuanPhim(formData);
        dispatch(layDanhSachBinhLuanPhimAction(id));
      } catch (error) {
        console.log("error", error);
      }
    }
  }
  

  export const xoaBinhLuanPhimAction = (id) => {
    return async (dispatch) => {
      try {
        const result = await quanLyPhimService.xoaBinhLuanPhim(id);
        alert("Xóa bình luận thành công");
      } catch (error) {
        console.log("error", error);
      }
    }
  }
  
  export const capNhatBinhLuanPhimAction = (id, formData) => {
    return async (dispatch) => {
      try {
        const result = await quanLyPhimService.capNhatBinhLuanPhim(
          id,
          formData
        );
        alert("Cập nhật bình luận thành công");
      } catch (error) {
        console.log("error", error);
      }
    }
  }
  
  export const layChiTietBinhLuanPhimAction = (id) => {
    return async (dispatch) => {
      try {
        const result = await quanLyPhimService.layChiTietBinhLuanPhim(id);
        dispatch({
          type: GET_BINH_LUAN_DETAIL_PHIM,
          detailBinhLuanPhim: result.data.content,
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  }