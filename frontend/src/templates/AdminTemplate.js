import { Fragment, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { HomeOutlined, UserOutlined, BankOutlined, VideoCameraOutlined, FormOutlined, QuestionOutlined, LineChartOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Button } from 'antd';
import { Avatar, Popover } from 'antd';
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { TOKEN, USER_LOGIN } from "../util/settings/config";
import { history } from "../App";
import { dangNhapAction, layDanhSachNguoiDungAction, layThongTinNguoiDungAction } from "../redux/actions/QuanLyNguoiDungAction";
const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}


export const AdminTemplate = (props) => { //path, exact, Component
  const dispatch = useDispatch();
  const { Component, ...restProps } = props;
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer }, } = theme.useToken();

  const selectedKeys = ['/admin/moviemng', '/admin/carouselmng', '/admin/theatremng', '/admin/theatrechildmng', '/admin/newsmng', '/admin/users',]
  const selectedKey = (selectedKeys.indexOf(props.path) + 1).toString();
  // const { userLogin } = useSelector(state => state.UserReducer)
  const { arrUser } = useSelector(state => state.UserReducer)

  
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(layDanhSachNguoiDungAction())
  },[dispatch])

  let userLogin = {}
  if (localStorage.getItem(USER_LOGIN)) {
    userLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
  }

  if (!localStorage.getItem(TOKEN)) {
    // alert('Bạn không có quyền truy cập trang này!')
    history.replace('/')
  }
  
  if (userLogin.role !== 'Super' && userLogin.role !== 'QuanTri') {
    alert('Bạn không có quyền truy cập trang này!');
    history.replace('/')
  }

  let usLogin = arrUser?.find(obj => obj.id === userLogin.id)

  const items = (userLogin.role === 'Super') ? [
    getItem('Quản Lý Phim', 'sub1', <VideoCameraOutlined />, [
      getItem('Danh Sách Phim', '1', <NavLink className='text-decoration-none' to="/admin/moviemng"><VideoCameraOutlined /></NavLink>),
      getItem('Danh Sách Carousel', '2', <NavLink className='text-decoration-none' to="/admin/carouselmng"><VideoCameraOutlined /></NavLink>),
    ]),
    getItem('Rạp Chiếu', '3', <NavLink className='text-decoration-none' to="/admin/theatrechildmng"><BankOutlined /></NavLink>),
    getItem('Quản Lý Bài Viết', '4', <NavLink className='text-decoration-none' to="/admin/newsmng"><FormOutlined /></NavLink>),
    getItem('Quản Lý Người Dùng', 'sub2', <UserOutlined />, [
      getItem('Quản Trị Viên', '5', <NavLink className='text-decoration-none' to="/admin/adminusers"><UserOutlined /></NavLink>),
      getItem('Khách Hàng', '6', <NavLink className='text-decoration-none' to="/admin/freeusers"><UserOutlined /></NavLink>),
    ]),
    getItem('Theo Dõi Doanh Thu', 'sub3', <LineChartOutlined />, [
      getItem('Danh Sách Đơn Hàng', '7', <NavLink className='text-decoration-none' to="/admin/orderlist"><LineChartOutlined /></NavLink>),
      getItem('Doanh Thu Theo Tháng', '8', <NavLink className='text-decoration-none' to="/admin/revenuemonth"><LineChartOutlined /></NavLink>),
      getItem('Doanh Thu Theo Phim', '9', <NavLink className='text-decoration-none' to="/admin/revenuemovie"><LineChartOutlined /></NavLink>),
    ]),
    getItem('Quản Lý Feedback', '10', <NavLink className='text-decoration-none' to="/admin/feedbackmng"><QuestionOutlined /></NavLink>),
  ] : [
    getItem('Quản Lý Phim', 'sub1', <VideoCameraOutlined />, [
      getItem('Danh Sách Phim', '1', <NavLink className='text-decoration-none' to="/admin/moviemng"><VideoCameraOutlined /></NavLink>),
      getItem('Danh Sách Carousel', '2', <NavLink className='text-decoration-none' to="/admin/carouselmng"><VideoCameraOutlined /></NavLink>),
    ]),
    getItem('Rạp Chiếu', '3', <NavLink className='text-decoration-none' to="/admin/theatrechildmng"><BankOutlined /></NavLink>),
    getItem('Quản Lý Bài Viết', '4', <NavLink className='text-decoration-none' to="/admin/newsmng"><FormOutlined /></NavLink>),
    getItem('Quản Lý Feedback', '5', <NavLink className='text-decoration-none' to="/admin/feedbackmng"><QuestionOutlined /></NavLink>),
  ]

  const content = (
    <div style={{ width: 200 }}>
      {(userLogin.role === 'Super') ? <Button type="text" className='w-full text-left' href="/admin/moviemng">Super Admin</Button> : ''}
      {(userLogin.role === 'QuanTri') ? <Button type="text" className='w-full text-left' href="/admin/moviemng">Trang Quản Trị</Button> : ''}
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
    </Fragment> :
      <div className="d-flex">
        <Button type="link" href="/"><HomeOutlined style={{ fontSize: '24px' }} /></Button>
        <Popover placement="bottomRight" title={userLogin.taiKhoan} content={content} trigger="click">
          <Button className='rounded-full bg-slate-300 p-0 d-flex justify-center items-center w-full h-full' style={{ width: 40, height: 40 }}>
          {usLogin?.avatar !== null || usLogin?.avatar !== "" ?
              <div style={{ minWidth: '40px', minHeight: 40, width:40, height:40, backgroundSize: 'cover', borderRadius: '50%', backgroundImage: `url(${usLogin?.avatar})` }} />
              : <Avatar size={40} style={{ fontSize: '28px', lineHeight: '32px' }} icon={usLogin?.name.substr(0,1)} />
            }
          </Button>
        </Popover>
      </div>}
  </Fragment>

  return <Route {...restProps} render={(propsRoute, index) => {
    return <Fragment key={index}>
      <Layout style={{ minHeight: '100vh', }}>
        <Sider collapsible width={300} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical text-white text-2xl text-center my-10" >Quản Trị</div>
          <Menu theme="dark" defaultSelectedKeys={selectedKey} mode="inline" items={items} />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'center',
              paddingRight: '30px'
            }}
          >
            <div>{operations}</div>
          </Header>
          <Content style={{ margin: '16px' }} >
            <div style={{ padding: 24, minHeight: 360, background: colorBgContainer, }} >
              <Component {...propsRoute} />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Fragment>
  }} />
}