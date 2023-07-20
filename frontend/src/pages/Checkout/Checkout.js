import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Button, Card, Popover } from 'antd';
import { UserOutlined, HomeOutlined } from '@ant-design/icons';
import './Checkout.css'
import { datVeAction, layDanhSachGheAction, layDanhSachLichChieuAction } from '../../redux/actions/QuanLyDatVeAction';
import { CHUYEN_TAB_ACTIVE, DAT_VE } from '../../redux/constants';
import _ from 'lodash';
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';
import { Tabs } from 'antd';
import { layThongTinDatVeAction } from '../../redux/actions/QuanLyNguoiDungAction';
import moment from 'moment';
import { TOKEN, USER_LOGIN } from '../../util/settings/config';





function Checkout(props) {

    const { userLogin } = useSelector(state => state.UserReducer)
    const { thongTinPhim } = useSelector(state => state.QuanLyDatVeReducer.chiTietPhongVe)
    const { danhSachGhe } = useSelector(state => state.QuanLyDatVeReducer)
    const { danhSachGheDangChon } = useSelector(state => state.QuanLyDatVeReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(layDanhSachLichChieuAction(props.match.params.id))
        dispatch(layDanhSachGheAction())
    }, [])

    console.log('danhSachGhe',danhSachGhe)

    const renderGhe = () => {
        return danhSachGhe?.map((ghe, index) => {
            let classGheVip = ghe.loaiGhe === 'VIP' ? 'seatVip' : '';
            let classGheDaDat = ghe.daDat === true ? 'seatOccupied' : '';

            let classGheDangDat = '';
            let indexGheDD = danhSachGheDangChon?.findIndex(gheDD => gheDD.maGhe === ghe.maGhe);
            if (indexGheDD != -1) {
                classGheDangDat = 'seatSelected'
            }

            let classGheUserDat = '';
            if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
                classGheUserDat = 'seatUserOccupied'
            }

            return <Fragment key={index}>
                <Button disabled={ghe.daDat} type='link' className={`seat p-0 ${classGheVip}`}
                    onClick={() => {
                        dispatch({
                            type: DAT_VE,
                            gheDuocChon: ghe
                        })
                    }}
                >
                    {ghe.daDat ? classGheUserDat != '' ? <UserOutlined /> : 'x' : ghe.stt}
                </Button>
                {(index + 1) % 16 === 0 ? <br /> : ''}
            </Fragment>
        })
    }

    const renderSoGhe = () => {
        return _.sortBy(danhSachGheDangChon, ['stt']).map((gheDD, index) => {
            return (<b key={index} className='mr-1'>{gheDD?.stt}</b>).props.children
        }).join(', ')
    }

    const tongTien = () => {
        return danhSachGheDangChon.reduce((tongTien, ghe, index) => {
            return tongTien += ghe.giaVe;
        }, 0).toLocaleString()
    }

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
                        <h3 className='text-xl'>{thongTinPhim?.tenPhim}</h3>
                        <p>{thongTinPhim?.tenCumRap}</p>
                        <p>Suất <b>{thongTinPhim?.gioChieu}</b> Ngày <b>{thongTinPhim?.ngayChieu}</b></p>
                        <p><b>{thongTinPhim?.tenRap}</b> Ghế <b>{renderSoGhe()}</b></p>
                    </Card>
                    <Card className='m-2'>
                        <p>Tổng đơn hàng</p>
                        <h3 className='text-red-400 text-xl'>{tongTien()} đ</h3>
                    </Card>
                    <Card className='m-2'>
                        <p>{userLogin.email}</p>
                        <p>{userLogin.soDT}</p>
                    </Card>
                    <div className='m-2'>
                        <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 w-full"
                            onClick={() => {
                                const thongTinDatVe = new ThongTinDatVe();
                                thongTinDatVe.maLichChieu = props.match.params.id;
                                thongTinDatVe.danhSachVe = danhSachGheDangChon;
                                // dispatch(datVeAction(thongTinDatVe))
                            }}
                        >Đặt vé</button>
                    </div>
                </div>
            </div>
        </div>
    )
}




const { TabPane } = Tabs;

export default function ChonGhe(props) {

    const { tabActive } = useSelector(state => state.QuanLyDatVeReducer)
    const { userLogin } = useSelector(state => state.UserReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch({
                type: CHUYEN_TAB_ACTIVE,
                number: '1'
            })
        }
    }, [])

    const content = (
        <div style={{ width: 200 }}>
            <Button type="text" href="/users/profile" className='w-full text-left'>Trang Cá Nhân</Button>
            {(userLogin.maLoaiNguoiDung === 'QuanTri') ? <Button type="text" className='w-full text-left' href="/admin/users">Trang Quản Trị</Button> : ''}
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
                    <Avatar size={40} style={{ fontSize: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} icon={userLogin.name.substr(0, 1)} />
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
            <TabPane tab='01 CHỌN GHẾ & THANH TOÁN' key='1' >
                <Checkout {...props} />
            </TabPane>
            <TabPane tab='02 KẾT QUẢ ĐẶT VÉ' key='2' >
                <KetQuaDatVe {...props} />
            </TabPane>
        </Tabs>
    </div>

}



export function KetQuaDatVe(props) {
    const { thongTinNguoiDung } = useSelector(state => state.UserReducer);
    const dispatch = useDispatch()

    useEffect(() => {
        const action = layThongTinDatVeAction();
        dispatch(action)
    }, [])

    const renderTicketItem = () => {
        return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
            const seats = _.first(ticket.danhSachGhe);
            return <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                    <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={ticket.hinhAnh} />
                    <div className="flex-grow">
                        <h2 className="text-gray-900 title-font font-medium">{ticket.tenPhim}</h2>
                        <p className="text-gray-500">Giờ chiếu: {moment(ticket.ngayDat).format('hh:mm A')} - Ngày chiếu: {moment(ticket.ngayDat).format('DD-MM-YYYY')}</p>
                        <p>Địa điểm: {seats.tenHeThongRap}</p>
                        <p>{seats.tenCumRap} - Ghế: {ticket.danhSachGhe.map((ghe, index) => { return <span key={index} className='mr-1'>{ghe.tenGhe}</span> })}</p>
                    </div>
                </div>
            </div>
        })
    }
    return <div className='grid grid-cols-12'>
        <div className='col-span-12 mx-20'>

            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Lịch Sử Đặt Vé</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Xin cám ơn bạn đã ủng hộ dịch vụ của chúng tôi, chúc bạn có những trải nghiệm tuyệt vời</p>
                    </div>
                    <div className="flex flex-wrap -m-2">
                        {renderTicketItem()}
                    </div>
                </div>
            </section>
        </div>
    </div>
}