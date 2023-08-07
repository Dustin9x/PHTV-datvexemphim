import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Select, DatePicker, InputNumber, TimePicker, Table, Tag, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import moment from 'moment';
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { layDanhSachCumRapAction } from '../../../redux/actions/QuanLyRapAction';
import { capNhatLichChieuAction, layDanhSachLichChieuAction, layLichChieuTheoPhimAction, taoLichChieuAction, xoaLichChieuAction } from '../../../redux/actions/QuanLyDatVeAction';
dayjs.extend(customParseFormat);

export default function ShowTime(props) {
    const dispatch = useDispatch();
    let { cumRap } = useSelector(state => state.RapReducer);
    let { lichChieuTheoPhim } = useSelector(state => state.QuanLyDatVeReducer);
    let { id } = props.match.params;
    const dateFormat = 'DD-MM-YYYY';
    const timeFormat = 'HH:mm';
    let lichEdit = {};
    if (localStorage.getItem('lichChieuEdit')) {
        lichEdit = JSON.parse(localStorage.getItem('lichChieuEdit'));
    }
    let film = {};
    if (localStorage.getItem('filmParams')) {
        film = JSON.parse(localStorage.getItem('filmParams'));
    }

    const ngayKhoiChieu = film.ngayKhoiChieu

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
            if (values.giaVeThuong < values.giaVeVip) {
                let formData = new FormData();
                for (let key in values) {
                    formData.append(key, values[key]);
                }
                console.table('formData123', [...formData])
                if (!localStorage.getItem('lichChieuEdit')) {
                    dispatch(taoLichChieuAction(formData));
                    dispatch(layLichChieuTheoPhimAction(id));
                } else {
                    dispatch(capNhatLichChieuAction(lichEdit.maLichChieu, formData))
                    dispatch(layLichChieuTheoPhimAction(id));
                }
                localStorage.removeItem("lichChieuEdit");
            } else {
                alert('Giá vé VIP phải cao hơn giá vé thường')
            }
            

        }
    })

    useEffect(() => {
        dispatch(layDanhSachCumRapAction())
        dispatch(layLichChieuTheoPhimAction(id))
    }, [dispatch, id]);



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

    const data = lichChieuTheoPhim;

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
                    return <p key={index}>{item.tenRap}</p>
                })
            }
        },
        {
            title: 'Ngày Chiếu',
            dataIndex: 'ngayChieu',
            key: 'ngayChieu',
            sorter: (a, b) => moment(a.ngayChieu).unix() - moment(b.ngayChieu).unix(),
            render: (text, movie) => {
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
            render: (text, movie, index) => {
                return <Fragment>
                    <Button key={1} type="link" icon={<EditOutlined />} onClick={() => {
                        dispatch(layDanhSachLichChieuAction(movie.maLichChieu))
                        localStorage.setItem('lichChieuEdit', JSON.stringify(movie))
                    }}></Button>
                    <Button key={2} type="link" danger icon={<DeleteOutlined />} onClick={() => {
                        if (window.confirm('Bạn có chắc chắn muốn xóa lịch chiếu phim này?')) {
                            dispatch(xoaLichChieuAction(movie.maLichChieu))
                            dispatch(layLichChieuTheoPhimAction(id))
                        }
                    }}></Button>
                </Fragment>
            }
        },
    ]

    return (
        <div className="container">
            <div className='row'>
                <div className='col-4'>
                    <h3 className="text-xl">Tạo lịch chiếu cho:</h3>
                    <h3 className="text-2xl text-red-500">Phim: {film.tenPhim}</h3>
                    <h3 className="text-xl">Ngày khởi chiếu: {dayjs(film.ngayKhoiChieu).format('DD-MM-YYYY')}</h3>
                    <img src={film.hinhAnh} alt='...' style={{ width: 250, height: 200, objectFit: 'cover', borderRadius: '6px' }} />
                </div>
                <div className='col-8'>
                    <Form
                        name="basic"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 16 }}
                        onSubmitCapture={formik.handleSubmit}
                    >
                        <Form.Item label="Cụm rạp">
                            <Select options={cumRap?.map((cumRap, index) => ({key:index, label: (cumRap.tenRap)+' ('+(cumRap.tinh_thanh[0].tenTinh)+')', value: cumRap.maRap }))} value={formik.values.maRap} onChange={handleChangeCumRap} placeholder="Chọn cụm rạp" />
                        </Form.Item>
                        <Form.Item label="Ngày chiếu">
                            <Tooltip title="Lưu ý: Chỉ được chọn lịch chiếu trong vòng 40 ngày kể từ ngày khởi chiếu">
                            {localStorage.getItem('lichChieuEdit')
                                ? <DatePicker disabledDate={d => !d || d.isBefore(dayjs(ngayKhoiChieu)) || d.isAfter(dayjs(ngayKhoiChieu).add(40,'day')) || d.isBefore(dayjs().add(2,'day'))} value={dayjs(defaultDate, dateFormat)} format={dateFormat} onChange={onChangeDate} onOk={onOkHour} />
                                : <DatePicker disabledDate={d => !d || d.isBefore(dayjs(ngayKhoiChieu)) || d.isAfter(dayjs(ngayKhoiChieu).add(40,'day')) || d.isBefore(dayjs().add(2,'day'))} format={dateFormat} onChange={onChangeDate} onOk={onOk} />
                            }
                            </Tooltip>
                        </Form.Item>

                        <Form.Item label="Giờ chiếu">
                            {localStorage.getItem('lichChieuEdit')
                                ? <TimePicker value={dayjs(defaultTime, timeFormat)} format={timeFormat} onChange={onChangeHour} onOk={onOkHour} />
                                : <TimePicker format={timeFormat} onChange={onChangeHour} onOk={onOkHour} />
                            }


                        </Form.Item>

                        <Form.Item label="Giá vé thường">
                            <InputNumber min={0} onChange={handleChangeInputNumber('giaVeThuong')} value={formik.values.giaVeThuong} />
                        </Form.Item>
                        <Form.Item label="Giá vé VIP">
                            <InputNumber min={0} onChange={handleChangeInputNumber('giaVeVip')} value={formik.values.giaVeVip} />
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