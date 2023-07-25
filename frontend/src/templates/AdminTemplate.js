import { Fragment, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { HomeOutlined, UserOutlined, BankOutlined, VideoCameraOutlined, FormOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Button } from 'antd';
import { Avatar, Popover } from 'antd';
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { TOKEN, USER_LOGIN } from "../util/settings/config";
import { history } from "../App";
import { dangNhapAction } from "../redux/actions/QuanLyNguoiDungAction";
const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Quản Lý Phim', 'sub1', <VideoCameraOutlined />, [
    getItem('Danh Sách Phim', '1', <NavLink className='text-decoration-none' to="/admin/moviemng"><VideoCameraOutlined /></NavLink>),
    getItem('Danh Sách Carousel', '2', <NavLink className='text-decoration-none' to="/admin/carouselmng"><VideoCameraOutlined /></NavLink>),
  ]),
  getItem('Rạp Chiếu', '3', <NavLink className='text-decoration-none' to="/admin/theatrechildmng"><BankOutlined /></NavLink>),
  getItem('Quản Lý Bài Viết', '4', <NavLink className='text-decoration-none' to="/admin/newsmng"><FormOutlined /></NavLink>),
  getItem('Quản Lý Người Dùng', '5', <NavLink className='text-decoration-none' to="/admin/users"><UserOutlined /></NavLink>),
]



export const AdminTemplate = (props) => { //path, exact, Component
  const dispatch = useDispatch();
  const { Component, ...restProps } = props;
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer }, } = theme.useToken();

  const selectedKeys = ['/admin/moviemng', '/admin/carouselmng', '/admin/theatremng', '/admin/theatrechildmng', '/admin/newsmng', '/admin/users',]
  const selectedKey = (selectedKeys.indexOf(props.path) + 1).toString();
  const { userLogin } = useSelector(state => state.UserReducer)

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(dangNhapAction())
  })

  if (!localStorage.getItem(TOKEN)) {
    // alert('Bạn không có quyền truy cập trang này!')
    history.replace('/')
  }

  if (userLogin.role !== 'QuanTri') {
    // alert('Bạn không có quyền truy cập trang này!');
    history.replace('/')
  }

  const content = (
    <div style={{ width: 200 }}>
      <Button type="text" href="/users/profile" className='w-full text-left'>Trang Cá Nhân</Button>
      {(userLogin.role === 'QuanTri') ? <Button type="text" className='w-full text-left' href="/admin/moviemng">Trang Quản Trị</Button> : ''}
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
            <Avatar size={40} style={{ fontSize: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} icon={userLogin.name.substr(0, 1)} />
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
          <Content style={{ margin: '16px 16px' }} >
            <div style={{ padding: 24, minHeight: 360, background: colorBgContainer, }} >
              <Component {...propsRoute} />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Fragment>
  }} />
}