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
        <div>Dịch vụ lấy lại mật khẩu của quý khách đã hoàn tất !!</div>
        <hr style="width: 80%">
        <h3 style="text-align: center ; padding-top: 10px"> PASSWORD NEW</h3>
        <div style="margin: auto;  width: max-content;  padding: 10px;">


            <div> {{ $pass }}</div>



        </div>
        <hr style="width: 80%">
        <div style="text-align: start ; padding-bottom: 10px">Thông tin tất cả các vé
            tại: http://localhost:3000/users/ordershistory</div>
        <div style="text-align: start ; padding-top: 10px">Mọi thắc mắc xin liên hệ: PHTV.datvexemphim@gmail.com</div>
        <div style="text-align: end ; padding-top: 10px">PHTV XIN CHÂN THÀNH CẢM ƠN QUÝ KHÁCH ĐÃ SỬ DỤNG DỊCH VỤ !</div>

    </div>
</body>

</html>
