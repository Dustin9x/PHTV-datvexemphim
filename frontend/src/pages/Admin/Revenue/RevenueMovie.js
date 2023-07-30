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

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function RevenueMovie() {
  const dispatch = useDispatch()
  const { arrDoanhThu } = useSelector(state => state.OrderDetailReducer)

console.log('arrDoanhThu',arrDoanhThu)
  var resMap = new Map();
  var arrChart = [];
  arrDoanhThu?.map((item) => {
    if (!resMap.has(item.phim))
      resMap.set(item.phim, item.tongTien);
    else
      resMap.set(item.phim, (item.tongTien + resMap.get(item.phim)));
  })
  resMap.forEach((value, key) => {
    arrChart.push({
      phim: key,
      tongTien: value
    })
  })

  const year = dayjs().year()
  useEffect(() => {
    dispatch(layDoanhThuAction(year))
  }, [dispatch,year]);



  const datachart = {
    labels: arrChart.map(value => value.phim),
    datasets: [
      {
        label: "VND",
        data: arrChart.map(value => value.tongTien),
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
      title: "Phim",
      dataIndex: "phim",
      key: "phim",
      sorter: (a, b) => a.phim.length - b.phim.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Doanh Thu",
      dataIndex: "tongTien",
      key: "tongTien",
      sorter: (a, b) => a.tongTien.length - b.tongTien.length,
      sortDirections: ["descend", "ascend"],
      render: (text,order) => {
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
          <h1 className="titleRevenueTable text-xl"> BIỂU ĐỒ DOANH THU THEO PHIM</h1>
          <div className="chartt" >
        {arrChart.length === 0 || arrChart === undefined ? <Alert message="Chưa có dữ liệu" type="warning" /> : ''}
            
            <Bar data={datachart} style={{height:'100%',maxHeight:'300px'}}></Bar>
          </div>
        </div>
      </div>
      <hr />
      <div className="revenueTable">
        <h1 className="titleRevenueTable text-xl">BẢNG DOANH THU THEO PHIM </h1>
        <div>
          {" "}
          <div></div>
        </div>
      </div>
      <div>
        {" "}
        <Table columns={columns} dataSource={arrChart} f />
      </div>
    </>
  );
}
