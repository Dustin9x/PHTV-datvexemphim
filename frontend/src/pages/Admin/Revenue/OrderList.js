import React from "react";
import { useEffect } from "react";
import { Alert, DatePicker, Table } from "antd";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import "./revenueMovie.css";
import { useDispatch, useSelector } from "react-redux";
import { layDoanhThuAction } from "../../../redux/actions/QuanLyDonHangAction";
import dayjs from "dayjs";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function OrderList() {
  const dispatch = useDispatch()
  const { arrDoanhThu } = useSelector(state => state.OrderDetailReducer)

  console.log('arrDoanhThu', arrDoanhThu)

  const year = dayjs().year()
  useEffect(() => {
    dispatch(layDoanhThuAction(year))
  }, [dispatch, year]);


  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "maOrder",
      key: "maOrder",
      sorter: (a, b) => a.maOrder - b.maOrder,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Ngày lên đơn",
      dataIndex: "created_at",
      key: "created_at",
      sorter: (a, b) => a.created_at.localeCompare(b.created_at),
      sortDirections: ["descend", "ascend"],
      render: (text,order)=> {
        return <div>{dayjs(order.created_at).format('DD-MM-YYYY')}</div>
      }
    },
    {
      title: "Phim",
      dataIndex: "phim",
      key: "phim",
      sorter: (a, b) => a.phim.length - b.phim.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Rạp",
      dataIndex: "rapChieu",
      key: "rapChieu",
      sorter: (a, b) => a.rapChieu.length - b.rapChieu.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Ngày chiếu",
      dataIndex: "ngayChieu",
      key: "ngayChieu",
      render: (text,order)=> {
        return <div>{dayjs(order.ngayChieu).format('DD-MM-YYYY')}</div>
      }
    },
    {
      title: "Giờ chiếu",
      dataIndex: "gioChieu",
      key: "gioChieu",
      render: (text,order)=> {
        return <div>{(order.gioChieu).substr(0,5)}</div>
      }
    },
    {
      title: "Người mua",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Doanh Thu",
      dataIndex: "tongTien",
      key: "tongTien",
      sorter: (a, b) => a.tongTien - b.tongTien,
      sortDirections: ["descend", "ascend"],
      render: (text, order) => {
        return <div>{order.tongTien.toLocaleString()}</div>
      }
    },
  ];

  const onChange = (value) => {
    let year = (dayjs(value).format('YYYY'))
    dispatch(layDoanhThuAction(year))
  };

  return (
    <>
      <div className="">
        <DatePicker defaultValue={dayjs()} onChange={onChange} picker="year" />
      </div>
      <div className="revenueTable">
        <h1 className="titleRevenueTable text-xl">DANH SÁCH ĐƠN HÀNG THEO NĂM </h1>
        {arrDoanhThu.length === 0 || arrDoanhThu === undefined ? <Alert message="Chưa có dữ liệu" type="warning" /> : ''}
      </div>
      <div>
        <Table columns={columns} dataSource={arrDoanhThu} f />
      </div>
    </>
  );
}
