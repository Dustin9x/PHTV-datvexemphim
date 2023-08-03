import { Fragment, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { HomeOutlined, SmileOutlined, HistoryOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Button, Avatar, Popover } from 'antd';
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { TOKEN, USER_LOGIN } from "../util/settings/config";
import { history } from "../App";
import { layThongTinNguoiDungAction } from "../redux/actions/QuanLyNguoiDungAction";
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
  getItem('Thông Tin Cá Nhân', '1', <NavLink className='text-decoration-none' to="/users/profile"><SmileOutlined /></NavLink>),
  getItem('Lịch Sử Mua Vé', '2', <NavLink className='text-decoration-none' to="/users/ordershistory"><HistoryOutlined /></NavLink>),
];

export const ProfileTemplate = (props) => { //path, exact, Component
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { Component, ...restProps } = props;
  const selectedKeys = ['/users/profile', '/users/ordershistory']
  const selectedKey = (selectedKeys.indexOf(props.path) + 1).toString();
  const { profile } = useSelector(state => state.UserReducer)
  let userLogin = {}
  if (localStorage.getItem(USER_LOGIN)) {
    userLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
  }
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(layThongTinNguoiDungAction(userLogin.id))
  }, [dispatch, userLogin.id])


  if (!localStorage.getItem(USER_LOGIN)) {
    alert('Bạn không có quyền truy cập trang này!')
    history.push('/')
  }

  const content = (
    <div style={{ width: 200 }}>
      {(profile.role === 'Super') ? <Button type="text" className='w-full text-left' href="/admin/moviemng">Super Admin</Button> : ''}
      {(profile.role === 'QuanTri') ? <Button type="text" className='w-full text-left' href="/mod/moviemng">Trang Quản Trị</Button> : ''}
      <Button type="text" href="/users/profile" className='w-full text-left'>Trang Cá Nhân</Button>
      <Button type="text" href="/home" className='w-full text-left' onClick={() => {
        localStorage.removeItem(USER_LOGIN)
        localStorage.removeItem(TOKEN)
        window.location.reload()
      }}>Đăng Xuất</Button>
    </div>
  );

  const operations = <Fragment>
    {_.isEmpty(profile) ? <Fragment>
      <Button type="text" href="/register" className="text-white">Sign Up</Button>
      <Button type="primary" href="/login" className="font-semibold bg-violet-400">Sign In</Button>
    </Fragment> :
      <div className="d-flex">
        <Button type="link" href="/"><HomeOutlined style={{ fontSize: '24px' }} /></Button>
        <Popover placement="bottomRight" title={profile.name} content={content} trigger="click">
          <Button className='rounded-full bg-slate-300 p-0 d-flex justify-center items-center w-full h-full' style={{ width: 40, height: 40 }}>
            {profile.avatar !== null ?
              <div style={{ minWidth: '40px', minHeight: 40, width:40, height:40, backgroundSize: 'cover', borderRadius: '50%', backgroundImage: `url(${profile?.avatar})` }} />
              : <Avatar size={40} style={{ fontSize: '28px', lineHeight: '32px' }} icon={profile?.name.substr(0,1)} />
            }
          </Button>
        </Popover>
      </div>}
  </Fragment>


  return <Route {...restProps} render={(propsRoute) => { //props.location, props.history, props.match
    return <Fragment>
      <Layout style={{ minHeight: '100vh' }} >
        <Sider width={300} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical text-white text-2xl text-center my-10" >Trang Cá Nhân</div>
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
          <Content
            style={{
              margin: '16px',
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
            >
              <Component {...propsRoute} />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Fragment>
  }} />
}