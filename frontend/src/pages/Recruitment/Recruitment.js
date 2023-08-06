import React from "react";
import "./Recruitment.css";

// import { Card } from 'antd';

export default function Recruitment() {
  return (
    <div>
      <div className="header__img-text">
        <h2 className=" text-white heading__text drop-shadow-md">Tuyển Dụng</h2>
        <div className="text-white end__text drop-shadow-md">Đồng Hành Cùng PHTV Việt Nam</div>
      </div>
      <div className="header__bg-dark header__with-img"></div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="body">
              <p className="body_text">
                PHTV CINEMA trực thuộc PHTV Group, một trong những tập đoàn kinh tế đa
                ngành lớn nhất Việt Nam. PHTV nằm trong trong top 05 cụm rạp
                chiếu phim lớn nhất toàn cầu và là nhà phát hành, cụm rạp chiếu
                phim lớn nhất tại Việt Nam.
              </p>
              <p className="body_body">Lịch Sử Phát Triển</p>
              <ul className="history">
                <li className="history__list">
                  <p className="history__text">31/3/2023</p>
                  <p className="history__text">
                    Công ty TNHH Truyền thông PHTV được thành lập
                  </p>
                </li>

                <li className="history__list">
                  <p className="history__text">05/8/2023</p>
                  <p className="history__text">
                    Trang Web Đặt Vé Xem Phim PHTV được thành lập
                  </p>
                </li>

                <li className="history__list">
                  <p className="history__text">07/8/2023</p>
                  <p className="history__text">
                    Trang Web Đặt Vé Xem Phim PHTV được đưa vào sử dụng
                  </p>
                </li>
              </ul>
              <p className="body_text">
                Cùng với việc phát triển các giá trị cốt lõi về nuôi dưỡng nhân
                tài hàng đầu, kiến tạo văn hóa cương nhu để trở thành doanh
                nghiệp phong cách sống toàn cầu. PHTV Việt Nam mong muốn mang
                đến nhiều cơ hội việc làm cho các tài năng trẻ, năng động và yêu
                thích ngành công nghiệp điện ảnh.
              </p>
              <p className="body_text">
                Chúng tôi chào đón bạn gia nhập đại gia đình PHTV Việt Nam thông
                qua các cơ hội nghề nghiệp cho cả khối văn phòng và khối cụm
                rạp:
              </p>
            </div>
            <div className="text__image">
              <img src="https://www.cgv.vn/media/wysiwyg/web/member-star.png" className="text__images" alt="logo"></img>
            </div>

            <p className="body_body center">Kênh Tuyển Dụng</p>

            <div className="row">
              <div className="col-6 split__bar">
                <p className="body_body center">Khối Văn Phòng</p>
                <div className="image__office">
                  <img
                    src="https://www.cgv.vn/media/wysiwyg/web/icon_linkedin.png"
                    className="image__office-link"
                    alt="logo"
                  ></img>
                  <img
                    src="https://www.cgv.vn/media/wysiwyg/web/icon_web.png"
                    className="image__office-link"
                    alt="logo"
                  ></img>
                </div>
              </div>
              <div className="col-6">
                <p className="body_body center">Khối Cụm Rạp</p>
                <div className="image__office">
                  <img
                    src="https://www.cgv.vn/media/wysiwyg/web/icon_fb.png"
                    className="image__office-link"
                    alt="logo"
                  ></img>
                  <img
                    src="https://www.cgv.vn/media/wysiwyg/web/icon_web.png"
                    className="image__office-link"
                    alt="logo"
                  ></img>
                </div>
              </div>
            </div>

            <div className="text__image">
              <img
                src="https://www.cgv.vn/media/wysiwyg/web/member-star.png"
                className="text__images"
                alt="logo"
              ></img>
            </div>

            <p className="body_body center">Cách Thức Ứng Tuyển</p>

            <div className="row">
              <div className="col-6">
                <p className="body_body center">Vị Trí Toàn Thời Gian</p>
                <div className="application">
                  <p className="body_body center">Khối Văn Phòng / Cụm Rạp</p>
                  <p className="body_text">
                    <strong>Cách 1 :</strong> Gửi CV đến email PHTVtalent@phtv.com
                    với tiêu đề "[HỌ TÊN] - Ứng tuyển [VỊ TRÍ]”.
                  </p>
                  <p className="body_text">
                    <strong>Cách 2 :</strong> Nộp hồ sơ trực tiếp trên các trang
                    tuyển dụng uy tín mà PHTV có đăng tuyển như Linkedin,
                    Vietnamwork, Careerbuilder, Hoteljob, Vieclam24, TopCV ….
                  </p>
                </div>
              </div>
              <div className="col-6">
                <p className="body_body center">Vị Trí Bán Thời Gian</p>
                <div className="application">
                  <p className="body_body center">Khối Cụm Rạp</p>
                  <p className="body_text">
                    <strong>Cách 1 :</strong> Nộp hồ sơ trực tiếp tại quầy Guest
                    Service của cụm rạp PHTV mà bạn muốn ứng tuyển.
                  </p>
                  <p className="body_text">
                    <strong>Cách 2 :</strong> Theo dõi thông tin tuyển dụng trên
                    Facebook - PHTV Careers.
                  </p>
                  <p className="body_text">
                    <em> <strong>*Đối tượng:</strong> dành cho sinh viên </em>
                  </p>
                </div>
              </div>
            </div>

            <p className="body_body">Lưu Ý : </p>
            <p className="body_text">PHTV KHÔNG thu bất kỳ chi phí tuyển dụng nào dưới mọi hình thức (phí hồ sơ, đồng phục….).</p>
            <p className="body_text">Với những vị trí cho khối Cụm Rạp, PHTV KHÔNG tuyển nhân viên thông qua đơn vị khác.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
