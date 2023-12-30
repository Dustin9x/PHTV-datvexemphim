import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom'
import { Button, Avatar, Popover, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { TOKEN, USER_LOGIN } from '../../../util/settings/config';
import { history } from '../../../App';
import { layKetQuaTimKiem } from '../../../redux/actions/QuanLyTinTucAction';
import { useDispatch, useSelector } from 'react-redux';

export default function Header(props) {
    const dispatch = useDispatch()
    const { arrUser } = useSelector(state => state.UserReducer)
    let userLogin = {}
    if (localStorage.getItem(USER_LOGIN)) {
        userLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
    }

    let usLogin = arrUser?.find(obj => obj.id === userLogin.id)

    const content = (
        <div style={{ width: 200 }}>
            {(userLogin.role === 'Super') ? <Button type="text" className='w-full text-left' href="/admin/moviemng">Super Admin</Button> : ''}
            {(userLogin.role === 'QuanTri') ? <Button type="text" className='w-full text-left' href="/admin/moviemng">Admin Page</Button> : ''}
            <Button type="text" href="/users/profile" className='w-full text-left'>Profile</Button>
            <Button type="text" href="/home" className='w-full text-left' onClick={() => {
                localStorage.removeItem(USER_LOGIN)
                localStorage.removeItem(TOKEN)
                window.location.reload()
            }}>Logout</Button>
        </div>
    );

    const renderLogin = () => {
        if (_.isEmpty(userLogin)) {
            return <Fragment>
                <Button type="link" href="/register" className="text-white">Sign Up</Button>
                <Button type="primary" href="/login" className="font-semibold rounded-full bg-red-400">Sign In</Button>
            </Fragment>
        } else {
            return <Popover placement="bottomRight" title={userLogin.name} content={content} trigger="click">
                <Button className='rounded-full bg-slate-300 p-0 d-flex justify-center items-center w-full h-full' style={{ width: 40, height: 40 }}>
                    {usLogin?.avatar == null || usLogin?.avatar == "" 
                        ? <Avatar size={40} style={{ fontSize: '28px', lineHeight: '32px' }} icon={usLogin?.name.substr(0, 1)} />
                        : <div style={{ minWidth: '40px', minHeight: 40, backgroundSize: 'cover', borderRadius: '50%', backgroundImage: `url(${usLogin?.avatar})` }} />
                    }
                </Button>
            </Popover>
        }

    }


    return (
        <div>
            <header className="p-4  text-gray-100 fixed w-full z-20" style={{backgroundColor: '#22577a'}}>
                <div className="container flex justify-between h-16 mx-auto">
                    <NavLink rel="noopener noreferrer" to="/" aria-label="Back to homepage" className="flex items-center p-2">
                        <div className='d-flex' >
                            <img src='/img/logo.png' alt='logo' style={{ width: '170px', height: '100%' }} />
                        </div>
                    </NavLink>
                    <ul className="items-stretch hidden space-x-3 lg:flex ml-20">
                        <li className="flex">
                            <NavLink to="/home" style={{ textDecoration: 'none' }} className="flex items-center font-medium -mb-0.5 border-b-2 px-4 border-transparent hover:text-red-400" activeClassName="border-b-2 text-red-400">Home</NavLink>
                        </li>
                        <li className="flex">
                            <NavLink to="/news" style={{ textDecoration: 'none' }} className="flex items-center font-medium -mb-0.5 border-b-2 px-4 border-transparent hover:text-red-400" activeClassName="border-b-2 text-red-400">News</NavLink>
                        </li>
                        <li className="flex">
                            <NavLink to="/contact" style={{ textDecoration: 'none' }} className="flex items-center font-medium -mb-0.5 border-b-2 px-4 border-transparent hover:text-red-400" activeClassName="border-b-2 text-red-400">Contact Us</NavLink>
                        </li>

                    </ul>

                    <div className="items-center flex-shrink-0 hidden lg:flex">
                        <Input allowClear placeholder="Search" id='search' className='rounded-full mr-3' prefix={<SearchOutlined />} onPressEnter={(e) => {
                            if (e.target.value.trim() !== '') {
                                dispatch(layKetQuaTimKiem(e.target.value));
                                history.push(`/search/?search=${e.target.value}`);
                                var url = new URL("http://localhost:3000/search/?search=hihi");
                                url.searchParams.set('search', e.target.value);
                            }
                        }} />
                        {renderLogin()}
                    </div>
                    <button className="p-4 lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-100">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </header>

        </div>
    )
}
