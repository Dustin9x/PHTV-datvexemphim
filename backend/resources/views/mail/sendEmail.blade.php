<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body style="margin: auto;  width: 80%;  padding: 10px;">
    <div style=" background-color:rgb(174, 174, 174)">
        <div style="padding-top: 20px; opacity: 0.8; text-align: center">
            <span style="font-size: 40px">
                <img style="width: 70px" src="{{ $message->embed('images/logo.png') }}">

            </span>
            <span style="font-size: 40px">
                <img style="width: 130px" src="{{ $message->embed('images/name.png') }}">

            </span>

        </div>

    </div>
    <div style="margin: auto;  background-color: aliceblue; padding: 30px ">
        <br>
        <div>Dịch vụ đặt vé của quý khách đã hoàn tất!!</div>
        <hr style="width: 80%">
        <h3 style="text-align: center ; padding-top: 10px"> THÔNG TIN HÓA ĐƠN</h3>
        <div style="margin: auto;  width: max-content;  padding: 10px;">

            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data={{ $rapChieu.', '.$phim.', '.$gioChieu.', '.$ngayChieu.', '.$danhSachGhe.', '.$name.', '.$email }}"
                width="150" />

            <table>
                <tr>
                    <td>Tên Phim :</td>
                    <td>{{ $phim }}.</td>
                </tr>
                <tr>
                    <td>Rạp:</td>
                    <td>{{ $rapChieu }}.</td>
                </tr>
                <tr>
                    <td>Ngày Chiếu:</td>
                    <td>{{ $ngayChieu }}.</td>
                </tr>
                <tr>
                    <td>Giờ Chiếu:</td>
                    <td>{{ $gioChieu }}.</td>
                </tr>
                <tr>
                    <td>Tổng Tiền:</td>
                    <td>{{ $tongTien }} Vnđ.</td>
                </tr>

                <tr>
                    <td>Ghế:</td>
                    <td>{{ $danhSachGhe }}.</td>
                </tr>


            </table>
        </div>
        <hr style="width: 80%">
        <div style="text-align: start ; padding-top: 10px">Mọi thắc mắc xin liên hệ: PHTV.datve@gmail.com</div>
        <div style="text-align: start ; padding-bottom: 10px">Thông tin tất cả các vé
            tại: http://localhost:3000/users/ordershistory</div>
        <div style="text-align: end ; padding-top: 10px">PHTV XIN CHÂN THÀNH CẢM ƠN QUÝ KHÁCH ĐÃ ĐẶT VÉ!</div>

    </div>
</body>

</html>
