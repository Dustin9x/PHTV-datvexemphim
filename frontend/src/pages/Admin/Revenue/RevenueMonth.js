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
import { Bar } from "react-chartjs-2";
import "./revenueMovie.css";
import { useDispatch, useSelector } from "react-redux";
import { layDoanhThuAction } from "../../../redux/actions/QuanLyDonHangAction";
import dayjs from "dayjs";
import { groupBy, sumBy } from "lodash";
import { TOKEN, USER_LOGIN } from "../../../util/settings/config";
import { history } from "../../../App";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);



export default function RevenueMonth() {
  let userLogin = {}
if (localStorage.getItem(USER_LOGIN)) {
    userLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
}

if (!localStorage.getItem(TOKEN)) {
    history.replace('/')
}

if (userLogin.role !== 'Super') {
    alert('Bạn không có quyền truy cập trang này!');
    history.replace('/')
}
  const dispatch = useDispatch()
  const { arrDoanhThu } = useSelector(state => state.OrderDetailReducer)

  
  const groups = groupBy(arrDoanhThu, (entry) => {
    return dayjs(entry.created_at).format('MM');
  });

  const months = Object.entries(groups).map((entry) => {
    const [key, values] = entry;

    return {
      thang: Number(key),
      tongTien: sumBy(values, 'tongTien'),
    };
  });


  const year = dayjs().year()
  useEffect(() => {
    dispatch(layDoanhThuAction(year))
  }, [dispatch, year]);

  const datachart = {
    labels: months.sort((a, b) => a.thang - b.thang).map(value => value.thang),
    datasets: [
      {
        label: "VND",
        data: months.sort((a, b) => a.thang - b.thang).map(value => value.tongTien),
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
      sorter: (a, b) => a.thang - b.thang,
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
        <div>
          <h1 className="titleRevenueTable text-xl"> BIỂU ĐỒ DOANH THU THEO PHIM </h1>
            {months.length === 0 || months === undefined ? <Alert message="Chưa có dữ liệu" type="warning" /> : ''}
          <div className="chartt" >
            <Bar data={datachart} style={{ height: '100%', maxHeight: '300px' }}></Bar>
          </div>
        </div>
      </div>
      <hr />
      <div className="revenueTable">
        <h1 className="titleRevenueTable text-xl">BẢNG DOANH THU THEO THÁNG </h1>
      </div>
      <div>
        <Table columns={columns} dataSource={months} f />
      </div>
    </>
  );
}
