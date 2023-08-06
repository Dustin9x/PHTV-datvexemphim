import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Button, Card, Form, Input, Pagination, Popover, QRCode, Tabs } from 'antd';
import { UserOutlined, HomeOutlined, CreditCardOutlined, KeyOutlined } from '@ant-design/icons';
import './Checkout.css'
import { chonGheAction, layChiTietLichChieuAction, layDanhSachGheAction, xacNhanDatVeAction } from '../../redux/actions/QuanLyDatVeAction';
import { CHUYEN_TAB_ACTIVE, DAT_VE } from '../../redux/constants';
import _ from 'lodash';
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';
import { layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { datVeAction, layDonHangTheoUserAction } from '../../redux/actions/QuanLyDonHangAction';
import { TOKEN, USER_LOGIN } from '../../util/settings/config';
import dayjs from 'dayjs';
import { history } from './../../App';
import { DanhSachGheDangChon } from '../../_core/models/DanhSachGheDangChon';
const { TabPane } = Tabs;


export default function ChonGhe(props) {
    const { disableTab } = useSelector(state => state.QuanLyDatVeReducer)
    const { disableTab1 } = useSelector(state => state.QuanLyDatVeReducer)
    const { tabActive } = useSelector(state => state.QuanLyDatVeReducer)
    const { donHang } = useSelector(state => state.QuanLyDatVeReducer)
    const { profile } = useSelector(state => state.UserReducer)

    let userLogin = {}
    if (localStorage.getItem(USER_LOGIN)) {
        userLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
    }
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(layThongTinNguoiDungAction(userLogin.id))
        dispatch({
            type: CHUYEN_TAB_ACTIVE,
            number: '1'
        })
    }, [])


    const content = (
        <div style={{ width: 200 }}>
            {(userLogin.role === 'Super') ? <Button type="text" className='w-full text-left' href="/admin/moviemng">Super Admin</Button> : ''}
            {(userLogin.role === 'QuanTri') ? <Button type="text" className='w-full text-left' href="/admin/users">Trang Quản Trị</Button> : ''}
            <Button type="text" href="/users/profile" className='w-full text-left'>Trang Cá Nhân</Button>
            <Button type="text" href="/home" className='w-full text-left' onClick={() => {
                localStorage.removeItem(USER_LOGIN)
                localStorage.removeItem(TOKEN)
                window.location.reload()
            }}>Đăng Xuất</Button>
        </div>
    );

    const operations = <Fragment>
        {_.isEmpty(userLogin) ? <Fragment>
            <Button type="text" href="/register" className="text-white">Sign Up</Button>
            <Button type="primary" href="/login" className="font-semibold bg-violet-400">Sign In</Button>
        </Fragment> : <div className="d-flex">
            <Button type="link" href="/"><HomeOutlined style={{ fontSize: '24px' }} /></Button>
            <Popover placement="bottomRight" title={userLogin.taiKhoan} content={content} trigger="click">
                <Button className='rounded-full bg-slate-300 p-0 d-flex justify-center items-center w-full h-full' style={{ width: 40, height: 40 }}>
                    {profile?.avatar !== null ?
                        <div style={{ minWidth: '40px', minHeight: 40, backgroundSize: 'cover', borderRadius: '50%', backgroundImage: `url(${profile?.avatar})` }} />
                        : <Avatar size={40} style={{ fontSize: '28px', lineHeight: '32px' }} icon={profile?.name.substr(0, 1)} />
                    }
                    {/* <Avatar size={40} style={{ fontSize: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} icon={userLogin.name.substr(0, 1)} /> */}
                </Button>
            </Popover>
        </div>}
    </Fragment>

    return <div className='container p-4'>
        <Tabs tabBarExtraContent={operations} defaultActiveKey='1' activeKey={tabActive} onChange={(key) => {
            dispatch({
                type: CHUYEN_TAB_ACTIVE,
                number: key
            })
        }}>
            <TabPane disabled={!donHang || disableTab1} tab='01 CHỌN GHẾ & THANH TOÁN' key='1' >
                <Checkout {...props} />
            </TabPane>
            <TabPane disabled={!donHang || disableTab} tab='02 XÁC NHẬN THÔNG TIN ĐẶT VÉ' key='2' >
                <XacNhanThongTin {...props} />
            </TabPane>
            <TabPane disabled={!donHang || disableTab} tab='03 KẾT QUẢ ĐẶT VÉ' key='3' >
                <KetQuaDatVe {...props} />
            </TabPane>
        </Tabs>
    </div>

}


function Checkout(props) {
    const [timer, setTimer] = useState(900);
    const minutes = Math.floor(timer / 60);
    const seconds = Math.floor(timer % 60);
    const [runTimer, setRunTimer] = useState('true');
    useEffect(() => {
        if (timer > 0) {
            let myTimer = setTimeout(() => setTimer(timer - 1), 1000);
            if (runTimer === false) {
                clearTimeout(myTimer)
            }
        } else {
            alert('Hết thời gian giữ ghế. Hãy thực hiện lại đơn hàng của bạn nhé.');
            history.goBack()
        }
    })



    const { userLogin } = useSelector(state => state.UserReducer)
    const { lichChieuChiTiet, danhSachGhe, danhSachGheDangChon } = useSelector(state => state.QuanLyDatVeReducer)
    const dispatch = useDispatch();
    let { id } = props.match.params;
    useEffect(() => {
        dispatch(layDanhSachGheAction(id))
        dispatch(layChiTietLichChieuAction(id))
    }, [])

    const thongTinPhim = lichChieuChiTiet?.phim;
    const rapChieu = lichChieuChiTiet?.rapchieu;

    const renderGhe = () => {
        return danhSachGhe?.map((ghe, index) => {
            let classGheVip = ghe.loaiGhe === 'vip' ? 'seatVip' : '';
            let classGheDaDat = ghe.nguoiDat !== null ? 'seatOccupied' : '';
            let classGheOtherDat = ghe.nguoiChon !== null ? 'seatOtherOccupied' : '';

            let classGheDangDat = '';
            let indexGheDD = danhSachGheDangChon?.findIndex(gheDD => gheDD.maGhe === ghe.maGhe);
            if (indexGheDD != -1) {
                classGheDangDat = 'seatSelected'
            }

            let classGheUserDat = '';
            if (userLogin.id == ghe.nguoiDat) {
                classGheUserDat = 'seatUserOccupied'
            }


            return <Fragment key={index}>
                <Button disabled={ghe.nguoiDat} type='link' className={`seat p-0 ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheUserDat} `}
                    onClick={() => {
                        dispatch({
                            type: DAT_VE,
                            gheDuocChon: ghe
                        })
                        // const danhSachGheSelect = new DanhSachGheDangChon();
                        // danhSachGheSelect.maLichChieu = props.match.params.id;
                        // danhSachGheSelect.danhSachGhe = renderSoGhe();
                        // danhSachGheSelect.danhSachMaGhe = renderMaGhe();
                        // danhSachGheSelect.userId = userLogin.id;
                        // console.log('danhSachGheSelect',danhSachGheSelect)
                        // dispatch(chonGheAction(danhSachGheSelect))
                    }
                    }
                >
                    {ghe.nguoiDat ? classGheUserDat != '' ? <UserOutlined /> : 'x' : ghe.tenGhe}
                </Button>
                {(index + 1) % 16 === 0 ? <br /> : ''}
            </Fragment>
        })
    }

    const renderSoGhe = () => {
        return _.sortBy(danhSachGheDangChon, ['tenGhe']).map((gheDD, index) => {
            return (<b key={index} className='mr-1'>{gheDD?.tenGhe}</b>).props.children
        }).join(', ')
    }

    const renderMaGhe = () => {
        return _.sortBy(danhSachGheDangChon, ['tenGhe']).map((gheDD, index) => {
            return (<b key={index} className='mr-1'>{gheDD?.maGhe}</b>).props.children
        }).join(', ')
    }

    const tongTien = (danhSachGheDangChon.filter(({ loaiGhe }) => loaiGhe === 'thuong').length) * (lichChieuChiTiet.giaVeThuong) +
        (danhSachGheDangChon.filter(({ loaiGhe }) => loaiGhe === 'vip').length) * (lichChieuChiTiet.giaVeVip)

    return (
        <div className='container min-h-screen mt-5'>
            <div className='grid grid-cols-12'>
                <div className='col-span-8 mx-20'>
                    <ul className="showcase">
                        <li>
                            <div className="seat"></div><small>Ghế thường</small>
                        </li>
                        <li>
                            <div className="seat seatVip"></div><small>Ghế VIP</small>
                        </li>
                        <li>
                            <div className="seat seatSelected"></div><small>Đang chọn</small>
                        </li>
                        <li>
                            <div className="seat seatOccupied px-2.5 py-1 text-gray-400">x</div><small>Đã được đặt</small>
                        </li>
                        <li>
                            <div className="seat seatUserOccupied shadow-none px-1.5"><UserOutlined /></div><small>Bạn đã đặt</small>
                        </li>
                    </ul>
                    <div className={`d-flex justify-center stage`}><p className="self-end">MÀN HÌNH</p></div>

                    <div className='d-flex justify-center'>
                        <div>{renderGhe()}</div>
                    </div>
                </div>
                <div className='col-span-4'>
                    <Card className='m-2'>
                        <p>Thời gian giữ ghế:</p>
                        <div className='text-red-400 text-xl font-bold'>{minutes}:{seconds}</div>
                    </Card>
                    {thongTinPhim?.map((item, index) => {
                        return <Card className='m-2'>
                            <h3 className='text-xl font-bold'>{item.tenPhim}</h3>
                            {/* <p>{item.rapChieu[0].tenRap}</p> */}
                            {rapChieu.map((rap, index) => { return <p>{rap.tenRap}</p> })}
                            <p>Suất <b>{lichChieuChiTiet.gioChieu.substr(0, 5)}</b> Ngày <b>{dayjs(lichChieuChiTiet.ngayChieu).format('DD-MM-YYYY')}</b></p>
                            <p><b>{item.tenRap}</b> Ghế <b>{renderSoGhe()}</b></p>
                        </Card>
                    })}

                    <Card className='m-2'>
                        <p>Tổng đơn hàng</p>
                        <h3 className='text-red-400 text-xl font-bold'>{tongTien.toLocaleString()} đ</h3>
                    </Card>
                    <Card className='m-2'>
                        <p>Người đặt: {userLogin.name}</p>
                        <p>Email: {userLogin.email}</p>
                    </Card>
                    <div className='m-2'>
                        <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 w-full"
                            onClick={() => {
                                const thongTinDatVe = new ThongTinDatVe();
                                thongTinDatVe.maLichChieu = props.match.params.id;
                                thongTinDatVe.rapChieu = rapChieu[0].tenRap;
                                thongTinDatVe.maPhim = lichChieuChiTiet.maPhim;
                                thongTinDatVe.phim = lichChieuChiTiet.phim[0].tenPhim;
                                thongTinDatVe.gioChieu = lichChieuChiTiet.gioChieu;
                                thongTinDatVe.ngayChieu = lichChieuChiTiet.ngayChieu;
                                thongTinDatVe.danhSachGhe = renderSoGhe();
                                thongTinDatVe.danhSachMaGhe = renderMaGhe();
                                thongTinDatVe.tongTien = tongTien;
                                thongTinDatVe.userId = userLogin.id;
                                thongTinDatVe.name = userLogin.name;
                                thongTinDatVe.email = userLogin.email;
                                dispatch(xacNhanDatVeAction(thongTinDatVe))
                                setRunTimer(false)
                            }}
                        >Xác nhận thông tin</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export function XacNhanThongTin(props) {
    const { donHang } = useSelector(state => state.QuanLyDatVeReducer)
    const [show, setShow] = useState(false);
    const onFinish = (values) => {
        setShow(true)
    };
    const onSubmit = (values) => {
        if (values === '123456') {
            dispatch(datVeAction(donHang))
        }
    };

    const dispatch = useDispatch();
    return (
        <div className='container min-h-screen mt-5'>
            <div className='row'>
                <div className='col-6'>
                    <div className=''>
                        <Card className='m-2 w-full bg-indigo-400'>
                            <p>Chi tiết đơn hàng</p>
                            <h3 className='text-xl font-bold'>{donHang.phim}</h3>
                            <p className='text-lg'>Rạp chiếu: {donHang.rapChieu}</p>
                            <p className='text-lg'>Suất <b>{donHang.gioChieu.substr(0, 5)}</b> Ngày <b>{dayjs(donHang.ngayChieu).format('DD-MM-YYYY')}</b></p>
                            <p className='text-lg'><b>{donHang.tenRap}</b> Ghế <b>{donHang.danhSachGhe}</b></p>
                        </Card>
                    </div>
                    <Card className='m-2 w-full bg-orange-400'>
                        <p>Tổng đơn hàng</p>
                        <h3 className=' text-xl font-bold'>{donHang.tongTien.toLocaleString()} đ</h3>
                    </Card>
                    <Card className='m-2 w-full bg-cyan-400'>
                        <p>Người đặt vé</p>
                        <p className='text-md'>Tên: {donHang.name}</p>
                        <p className='text-md'>Email: {donHang.email}</p>
                    </Card>
                    <p className='text-gray-400 ml-5'>(*) Quý khách vui lòng kiểm tra kỹ thông tin, đơn hàng sau khi đặt sẽ không được hủy hoặc hoàn lại.</p>

                </div>
                <div className='col-6'>
                    <div className='row'>
                        <div className='col-6 mx-auto'>
                            <h1 className='text-center text-xl mb-5'>THANH TOÁN BẰNG THẺ TÍN DỤNG</h1>
                            {!show ? <Form
                                name="basic"
                                onFinish={onFinish}
                                autoComplete="off"
                            >
                                <Form.Item
                                    name="otp"
                                    rules={[
                                        {
                                            required: true,
                                            type: 'string',
                                            min: 16,
                                            max: 19,
                                            message: 'Số thẻ gồm 16-19 số và không được để trống!',
                                        },
                                    ]}
                                >
                                    <Input size="large" onInput={e => e.target.value = e.target.value.replace(/(\d{4})(\d+)/g, '$1 $2').trim()} placeholder='Số Thẻ' prefix={<CreditCardOutlined />} />
                                </Form.Item>

                                <Form.Item
                                    name="chuThe"
                                    rules={[
                                        {
                                            required: true,
                                            type: 'string',
                                            message: 'Tên chủ thẻ không được để trống!',
                                        },
                                    ]}
                                >
                                    <Input size="large" placeholder='Tên Chủ Thẻ Không Dấu' onInput={e => {
                                        e.target.value = e.target.value.toUpperCase()
                                        e.target.value = e.target.value.normalize("NFD")
                                        e.target.value = e.target.value.replace(/[\u0300-\u036f]/g, "")
                                        e.target.value = e.target.value.replace(/đ/g, "d")
                                        e.target.value = e.target.value.replace(/Đ/g, "D");
                                    }} prefix={<UserOutlined />} />
                                </Form.Item>
                                <button type="primary" className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 w-full' htmlType="submit">Tiếp tục</button>
                            </Form>
                                : <Form onFinish={onSubmit} >
                                    <Form.Item
                                        rules={[
                                            {
                                                required: true,
                                                type: 'string',
                                                min: 6,
                                                max: 6,
                                                message: 'OTP gồm 6 số và không được để trống!',
                                            },
                                        ]}
                                    >
                                        <Input size="large" placeholder='Nhập OTP' prefix={<KeyOutlined />} />
                                    </Form.Item>
                                    <div className='mt-5 d-flex justify-center'>
                                        <button type="button" style={{ width: 350 }} className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 w-full"
                                            onClick={() => {
                                                dispatch(datVeAction(donHang))
                                            }}
                                        >Xác Nhận Thanh Toán</button>
                                    </div>
                                </Form>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export function KetQuaDatVe(props) {
    const { Meta } = Card;
    const { donHang } = useSelector(state => state.QuanLyDatVeReducer)
    const { arrDonHang } = useSelector(state => state.QuanLyDatVeReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        const action = layDonHangTheoUserAction(donHang?.userId);
        dispatch(action)
    }, [])

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const reverseArrDonHang = arrDonHang.slice().reverse()
    const currentArrDonHang = reverseArrDonHang.slice(indexOfFirstPost, indexOfLastPost);


    let lastTicket = arrDonHang[arrDonHang.length - 1];
    return <div className='row'>
        <div className='col-12'>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Lịch Sử Đặt Vé</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Xin cám ơn bạn đã ủng hộ dịch vụ của chúng tôi, chúc bạn có những trải nghiệm tuyệt vời</p>
                    </div>
                    <div className="container">
                        {arrDonHang.length < 1 || arrDonHang == undefined ? <p className='text-xl text-center w-full'>Chưa có đơn hàng nào</p> :
                            <div>
                                <div className='row'>
                                    <div className='col-6 ml-auto mr-auto mt-3 '>
                                        <h1 className='text-center text-lg mb-5'>Vé vừa mua</h1>
                                        <Card
                                            hoverable
                                            className='bg-red-100 p-2 d-flex'
                                            style={{
                                                width: '100%',
                                            }}
                                            cover={<div>
                                                <small className='text-right'>Ngày đặt vé: {dayjs(lastTicket.create_at).format('DD-MM-YYYY')}</small>
                                                <QRCode value={
                                                    'Mã đơn: ' + lastTicket.maOrder +
                                                    ', Phim: ' + lastTicket.phim +
                                                    ', Rạp: ' + lastTicket.rapChieu +
                                                    ', Ngày: ' + dayjs(lastTicket.ngayChieu).format('DD-MM-YYYY') +
                                                    ', Suất: ' + lastTicket.gioChieu.substr(0, 5) +
                                                    ', Ghế: ' + lastTicket.danhSachGhe
                                                }
                                                />
                                            </div>
                                            }
                                        >
                                            <Meta className='font-bold' title={lastTicket.phim} />
                                            <div className='mt-2 text-gray-500'>
                                                <div>Ngày chiếu: {dayjs(lastTicket.ngayChieu).format('DD-MM-YYYY')}</div>
                                                <div>Giờ chiếu: {lastTicket.gioChieu.substr(0, 5)}</div>
                                                <div>Rạp: {lastTicket.rapChieu}</div>
                                                <div>Ghế: {lastTicket.danhSachGhe}</div>
                                                <div className='font-bold'>Bạn cần xuất trình vé điện tử này để vào phòng chiếu</div>
                                            </div>

                                        </Card>
                                        <h1 className='text-center text-lg mt-20'>Vé đã mua</h1>
                                    </div>
                                </div>
                                <div className='row'>
                                    {currentArrDonHang.slice(0, -1)?.map((item, index) => {
                                        return <div className='col-6 mt-3 '>
                                            <Card
                                                hoverable
                                                className='bg-teal-100 p-2 d-flex'
                                                style={{
                                                    width: '100%',
                                                }}
                                                cover={<div>
                                                    <small className='text-right'>Ngày đặt vé: {dayjs(item.create_at).format('DD-MM-YYYY')}</small>
                                                    <QRCode value={
                                                        'Mã đơn: ' + item.maOrder +
                                                        ', Phim: ' + item.phim +
                                                        ', Rạp: ' + item.rapChieu +
                                                        ', Ngày: ' + dayjs(item.ngayChieu).format('DD-MM-YYYY') +
                                                        ', Suất: ' + item.gioChieu.substr(0, 5) +
                                                        ', Ghế: ' + item.danhSachGhe
                                                    }
                                                    />
                                                </div>
                                                }
                                            >

                                                <Meta className='font-bold' title={item.phim} />
                                                <div className='mt-2 text-gray-500'>
                                                    <div>Ngày chiếu: {dayjs(item.ngayChieu).format('DD-MM-YYYY')}</div>
                                                    <div>Giờ chiếu: {item.gioChieu.substr(0, 5)}</div>
                                                    <div>Rạp: {item.rapChieu}</div>
                                                    <div>Ghế: {item.danhSachGhe}</div>
                                                    <div className='font-bold'>Bạn cần xuất trình vé điện tử này để vào phòng chiếu</div>
                                                </div>

                                            </Card>
                                        </div>
                                    })}
                                </div>
                                <Pagination className='d-flex justify-center line-clamp-3 my-20' pageSize={postsPerPage} currentPage={currentPage} total={arrDonHang.length} onChange={(page) => { setCurrentPage(page) }} />
                            </div>
                        }
                    </div>
                </div>
            </section>
        </div>
    </div>
}