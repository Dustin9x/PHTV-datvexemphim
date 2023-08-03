import React, { useEffect } from 'react'
import { KetQuaDatVe } from '../../Checkout/Checkout'
import { useDispatch, useSelector } from 'react-redux'
import { layDonHangTheoUserAction } from '../../../redux/actions/QuanLyDonHangAction'
import { USER_LOGIN } from '../../../util/settings/config'

export default function UserOrder(props) {
  const dispatch = useDispatch()

  let { id } = props.match.params
  let user = {};
  if (localStorage.getItem('userParams')) {
    user = JSON.parse(localStorage.getItem('userParams'));
  }

  useEffect(() => {
    const action = layDonHangTheoUserAction(id);
    dispatch(action)
  }, [])
  return (
    <div>
      <p>Lịch Sử Đặt Vé Của: </p>
      <h1>User: {user.name}</h1>
      <h1>Email: {user.email} </h1>
      <div className='container'>
        <KetQuaDatVe />

      </div>
    </div>
  )
}
