import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Select, DatePicker, InputNumber, TimePicker, Table, Tag } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import moment from 'moment';
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { layDanhSachCumRapAction, layDanhSachHeThongRapAction } from '../../../redux/actions/QuanLyRapAction';
import { capNhatLichChieuAction, layChiTietLichChieuAction, layDanhSachLichChieuAction, layLichChieuTheoPhimAction, taoLichChieuAction, xoaLichChieuAction } from '../../../redux/actions/QuanLyDatVeAction';
import { QuanLyDatVeReducer } from './../../../redux/reducers/QuanLyDatVeReducer';
dayjs.extend(customParseFormat);

export default function ShowTime(props) {
    let { heThongRapChieu } = useSelector(state => state.RapReducer);
    let { cumRap } = useSelector(state => state.RapReducer);
    let { lichChieuChiTiet } = useSelector(state => state.QuanLyDatVeReducer);
    // let { cumRapChieu } = cumRap.filter(item => item.tenRap == heThongRapChieu.tenHeThongRap)
    let { id } = props.match.params;
    const dateFormat = 'DD-MM-YYYY';
    const timeFormat = 'HH:mm';
    const dispatch = useDispatch();
    let lichEdit = {};
    if (localStorage.getItem('lichChieuEdit')) {
        lichEdit = JSON.parse(localStorage.getItem('lichChieuEdit'));
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: props.match.params.id,
            maRap: lichEdit ? lichEdit?.maRap : '',
            ngayChieu: lichEdit ? lichEdit?.ngayChieu : '00-00-00',
            gioChieu: lichEdit?.gioChieu,
            giaVeThuong: lichEdit?.giaVeThuong,
            giaVeVip: lichEdit?.giaVeVip,
        },
        onSubmit: (values) => {
            let formData = new FormData();
            for (let key in values) {
                formData.append(key, values[key]);
            }
            console.table('formData123',[...formData])
            if (!localStorage.getItem('lichChieuEdit')) {
                dispatch(taoLichChieuAction(formData));
                dispatch(layLichChieuTheoPhimAction(id));
            } else {
                dispatch(capNhatLichChieuAction(lichEdit.maLichChieu, formData))
                dispatch(layLichChieuTheoPhimAction(id));
            }
            localStorage.removeItem("lichChieuEdit");

        }
    })


    const [state, setState] = useState({
        heThongRapChieu: [],
        cumRapChieu: [],
        lichChieuChiTiet: []
    })

    useEffect(() => {
        dispatch(layDanhSachHeThongRapAction())
        dispatch(layDanhSachCumRapAction())
        dispatch(layLichChieuTheoPhimAction(id))
    }, []);


    let film = {};
    if (localStorage.getItem('filmParams')) {
        film = JSON.parse(localStorage.getItem('filmParams'));
    }


    const handleChangeCumRap = (value) => {
        formik.setFieldValue('maRap', value)
    }


    const onOk = (values) => {
        let ngayChieu = dayjs(values).format('YYYY-MM-DD');
        formik.setFieldValue('ngayChieu', ngayChieu);
    }

    const onChangeDate = (values) => {
        let ngayChieu = dayjs(values).format('YYYY-MM-DD');
        formik.setFieldValue('ngayChieu', ngayChieu);
    }
    let defaultDate = dayjs(formik.values.ngayChieu).format(dateFormat)

    const onOkHour = (values) => {
        let gioChieu = dayjs(values).format(timeFormat);
        formik.setFieldValue('gioChieu', gioChieu);
    }

    const onChangeHour = (values) => {
        let gioChieu = dayjs(values).format(timeFormat);
        formik.setFieldValue('gioChieu', gioChieu);
    }

    let defaultTime = (localStorage.getItem('lichChieuEdit')) ? formik.values.gioChieu : '00:00'

    const handleChangeInputNumber = (name) => {
        return (value) => {
            formik.setFieldValue(name, value);
        }
    }

    const convertSelectHTR = () => {
        // state.heThongRapChieu?.map((htr, index) => ({ label: htr.tenHeThongRap, value: htr.tenHeThongRap }))
        return heThongRapChieu?.map((htr, index) => {
            return { label: htr.tenHeThongRap, value: htr.maHeThongRap }
        })
    }



    const data = lichChieuChiTiet;
    console.log('data',data)

    const columns = [
        {
            title: 'Mã Lịch Chiếu',
            dataIndex: 'maLichChieu',
            key: 'maLichChieu',
        },
        {
            title: 'Rạp Chiếu',
            dataIndex: 'rapchieu.tenRap',
            key: 'rapchieu.tenRap',
            render: (text, movie) => {
                return cumRap.filter(item => item.maRap === movie.maRap).map((item, index) => {
                    return <p>{item.tenRap}</p>
                })
            }
        },
        {
            title: 'Ngày Chiếu',
            dataIndex: 'ngayChieu',
            key: 'ngayChieu',
            sorter: (a, b) => moment(a.ngayChieu).unix() - moment(b.ngayChieu).unix(),
            render: (text, movie) => {
                // if (dayjs(movie.ngayChieu)> dayjs((new Date).getDate()-1)) {
                    if (dayjs().isBefore(dayjs(movie.ngayChieu))) {
                    return <Tag color='green'>{dayjs(movie.ngayChieu).format(dateFormat)}</Tag>
                } else {
                    return <Tag color='red'>{dayjs(movie.ngayChieu).format(dateFormat)}</Tag>
                }
            }
        },
        {
            title: 'Giờ Chiếu',
            dataIndex: 'gioChieu',
            key: 'gioChieu',
            render: (text, movie) => {
                return <Tag color='green'>{movie.gioChieu.substr(0, 5)}</Tag>
            }

        },
        {
            title: 'Giá Vé Thường',
            dataIndex: 'giaVeThuong',
            key: 'giaVeThuong',
        },
        {
            title: 'Giá Vé VIP',
            dataIndex: 'giaVeVip',
            key: 'giaVeVip',
        },
        {
            title: 'Quản Lý',
            width: '10%',
            render: (text, movie) => {
                return <Fragment>
                    <Button key={1} type="link" icon={<EditOutlined />} onClick={() => {
                        dispatch(layDanhSachLichChieuAction(movie.maLichChieu))
                        localStorage.setItem('lichChieuEdit', JSON.stringify(movie))
                    }}></Button>
                    <Button key={2} type="link" danger icon={<DeleteOutlined />} onClick={() => {
                        if (window.confirm('Bạn có chắc chắn muốn xóa lịch chiếu phim này?')) {
                              dispatch(xoaLichChieuAction(movie.maLichChieu))
                              dispatch(layDanhSachLichChieuAction(movie.maLichChieu))
                        }
                    }}></Button>
                </Fragment>
            }
        },
    ]

    return (
        <div className="container">
            <div className='row'>
                <div className='col-3'>
                    <h3 className="text-2xl">Tạo lịch chiếu cho Phim: {film.tenPhim}</h3>
                    <img src={film.hinhAnh} alt='...' width={200} height={100} />
                </div>
                <div className='col-9'>
                    <Form
                        name="basic"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 16 }}
                        onSubmitCapture={formik.handleSubmit}
                    >
                        <Form.Item label="Hệ thống rạp">
                            <Select options={convertSelectHTR()} placeholder="Chọn hệ thống rạp" />
                        </Form.Item>
                        <Form.Item label="Cụm rạp">
                            <Select options={cumRap?.map((cumRap, index) => ({ label: cumRap.tenRap, value: cumRap.maRap }))} value={formik.values.maRap} onChange={handleChangeCumRap} placeholder="Chọn cụm rạp" />
                        </Form.Item>
                        <Form.Item label="Ngày chiếu">
                            <DatePicker format={dateFormat} value={lichEdit ? (dayjs(defaultDate, dateFormat)) : ''} onChange={onChangeDate} onOk={onOk} />
                        </Form.Item>

                        <Form.Item label="Giờ chiếu">
                            {localStorage.getItem('lichChieuEdit') 
                            ? <TimePicker value={dayjs(defaultTime, timeFormat)} format={timeFormat} onChange={onChangeHour} onOk={onOkHour} /> 
                            : <TimePicker format={timeFormat} onChange={onChangeHour} onOk={onOkHour} />
                            }


                        </Form.Item>

                        <Form.Item label="Giá vé thường">
                            <InputNumber onChange={handleChangeInputNumber('giaVeThuong')} value={formik.values.giaVeThuong} />
                        </Form.Item>
                        <Form.Item label="Giá vé VIP">
                            <InputNumber onChange={handleChangeInputNumber('giaVeVip')} value={formik.values.giaVeVip} />
                        </Form.Item>



                        <Form.Item label="Chức năng">
                            <Button htmlType="submit">{(localStorage.getItem('lichChieuEdit')) ? 'Cập Nhật' : 'Tạo Lịch Chiếu'}</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>

            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    )
}