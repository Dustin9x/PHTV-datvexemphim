import React, { useEffect } from 'react';
import { Avatar, Button, Typography, } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { USER_LOGIN } from '../../util/settings/config';
const Profile = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.UserReducer);
  let userLogin = {}
  if (localStorage.getItem(USER_LOGIN)) {
    userLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
  }

  useEffect(() => {
    dispatch(layThongTinNguoiDungAction(userLogin.id))
  }, [])

  console.log('profile', profile)

  return (
    <div >
      <h3 className='mb-5'>Thông tin người dùng: {profile.name}</h3>
      <div className='row mx-10'>
        <div className='col-4'>
          {/* {profile.avatar ? <img style={{width:200, height:200, objectFit: 'cover', borderRadius: '50%'}} src={profile.avatar} alt={profile.avatar} /> : <Avatar size={200} style={{ fontSize: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} icon={userLogin.name.substr(0, 1)} />} */}
          {profile?.avatar == null || profile?.avatar == ""
            ? <Avatar size={200} style={{ fontSize: '200px', lineHeight: '170px' }} icon={profile.name?.substr(0, 1)} />
            : <div style={{ minWidth: '40px', minHeight: 40, width: 200, height: 200, backgroundSize: 'cover', borderRadius: '50%', backgroundImage: `url(${profile?.avatar})` }} />
          }
        </div>
        <div className='col-8'>
          <div className='col-6'>
            <Typography>
              <pre>Tên Đăng Nhập: {profile.name}</pre>
            </Typography>
          </div>
          <div className='col-6'>
            <Typography>
              <pre>Email: {profile.email}</pre>
            </Typography>
          </div>
          <div className='col-6'>
            <Typography>
              {/* <pre>Email: {profile.soDt}</pre> */}
            </Typography>
          </div>
          <div className='col-6'>
            <Typography>
              {/* <pre>Họ Tên: {profile.hoTen}</pre> */}
            </Typography>
          </div>
          <div className='col-6'>
            <Typography>
              <pre>Loại Tài Khoản: {profile.role}</pre>
            </Typography>
          </div>
          <div className='col-6'>
            <Button href={`/users/edit/${profile.id}`} className='btn-primary bg-primary mt-3 px-5' type='primary' onClick={() => {
              localStorage.setItem('userParams', JSON.stringify(profile));
            }}>Thay đổi thông tin</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;