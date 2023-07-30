import React, { useState } from "react";
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
import { Bar } from "react-chartjs-2";
import axios from "axios";
import "./revenueMovie.css";
import { useDispatch, useSelector } from "react-redux";
import { layDoanhThuAction } from "../../../redux/actions/QuanLyDonHangAction";
import dayjs from "dayjs";
import { groupBy, sumBy } from "lodash";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function RevenueMonth() {
  const dispatch = useDispatch()
  const { arrDoanhThu } = useSelector(state => state.OrderDetailReducer)

  
  const groups = groupBy(arrDoanhThu, (entry) => {
    return dayjs(entry.created_at).format('MM');
  });

  const months = Object.entries(groups).map((entry) => {
    const [key, values] = entry;

    return {
      thang: key,
      tongTien: sumBy(values, 'tongTien'),
    };
  });

  const year = dayjs().year()
  useEffect(() => {
    dispatch(layDoanhThuAction(year))
  }, [dispatch, year]);

  console.log('months', months)

  const datachart = {
    labels: months.map(value => value.thang),
    datasets: [
      {
        label: "VND",
        data: months.map(value => value.tongTien),
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        },
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
        borderRadius: 5
      },
    ],
  };
  const columns = [
    {
      title: "Tháng",
      dataIndex: "thang",
      key: "thang",
      sorter: (a, b) => a.thang.length - b.thang.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Doanh Thu",
      dataIndex: "tongTien",
      key: "tongTien",
      sorter: (a, b) => a.tongTien.length - b.tongTien.length,
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
        <div>
          <h1 className="titleRevenueTable text-xl"> BIỂU ĐỒ DOANH THU THEO PHIM </h1>
          <div className="chartt" >
            {months.length === 0 || months === undefined ? <Alert message="Chưa có dữ liệu" type="warning" /> : ''}
            <Bar data={datachart} style={{ height: '100%', maxHeight: '300px' }}></Bar>
          </div>
        </div>
      </div>
      <hr />
      <div className="revenueTable">
        <h1 className="titleRevenueTable text-xl">BẢNG DOANH THU THEO THÁNG </h1>
        <div>
          {" "}
          <div></div>
        </div>
      </div>
      <div>
        {" "}
        <Table columns={columns} dataSource={months} f />
      </div>
    </>
  );
}
