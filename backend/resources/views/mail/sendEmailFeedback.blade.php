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
        <div></div>
        <hr style="width: 80%">
        <h3 style="text-align: center ; padding-top: 10px"> THÔNG TIN FEEDBACK</h3>
        <div style="margin: auto;  width: max-content;  padding: 10px;">


            <table>
                <tr>

                    <td>Tiêu đề:</td>
                    <td>{{ $tieuDe }}.</td>
                </tr>
                <tr>
                    <td>Nội dung:</td>
                    <td>{{ $noiDung }}.</td>
                </tr>
                <tr>
                    <td>Ngày xử lý:</td>
                    <td>{{ $ngayXuLy }}.</td>
                </tr>
                <tr>
                    <td>Nội dung xử lý:</td>
                    <td>{{ $noiDungXuLy }}.</td>
                </tr>
                {{-- <tr>
                    <td>Ngày Chiếu:</td>
                    <td>{{ $ngayXuLy }}.</td>
                </tr> --}}
            </table>
        </div>
        <hr style="width: 80%">
        <div style="text-align: start ; padding-top: 10px">Mọi thắc mắc xin liên hệ: PHTV.datve@gmail.com</div>
        <div style="text-align: start ; padding-bottom: 10px">Thông tin tất cả các vé
            tại: http://localhost:3000/users/ordershistory</div>
        <div style="text-align: end ; padding-top: 10px">PHTV XIN CHÂN THÀNH CẢM ƠN QUÝ KHÁCH ĐÃ FEEDBACK!</div>

    </div>
</body>

</html>
