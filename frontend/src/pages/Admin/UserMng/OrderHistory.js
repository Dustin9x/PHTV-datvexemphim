import React, { useEffect } from 'react'
import { KetQuaDatVe } from '../../Checkout/Checkout'
import { useDispatch, useSelector } from 'react-redux'
import { layDonHangTheoUserAction } from '../../../redux/actions/QuanLyDonHangAction'
import { USER_LOGIN } from '../../../util/settings/config'

export default function OrderHistory() {
    // const { donHang } = useSelector(state => state.QuanLyDatVeReducer)
    const dispatch = useDispatch()

    let userLogin = {}
  if (localStorage.getItem(USER_LOGIN)) {
    userLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
  }

    useEffect(() => {
        const action = layDonHangTheoUserAction(userLogin.id);
        dispatch(action)
    }, [])
  return (
    <div>
      <KetQuaDatVe/>
    </div>
  )
}
