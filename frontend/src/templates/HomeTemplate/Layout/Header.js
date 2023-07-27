import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom'
import { Button, Avatar, Popover, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { TOKEN, USER_LOGIN } from '../../../util/settings/config';

export default function Header(props) {
    const handleChange = (value) => {
        i18n.changeLanguage(value)
    };

    const { t, i18n } = useTranslation();

    let userLogin = {}
    if (localStorage.getItem(USER_LOGIN)) {
        userLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
    }
    console.log('userLogin', userLogin.role)

    const content = (
        <div style={{ width: 200 }}>
            <Button type="text" href="/users/profile" className='w-full text-left'>Trang Cá Nhân</Button>
            {(userLogin.role === 'QuanTri') ? <Button type="text" className='w-full text-left' href="/admin/users">Trang Quản Trị</Button> : ''}
            <Button type="text" href="/home" className='w-full text-left' onClick={() => {
                localStorage.removeItem(USER_LOGIN)
                localStorage.removeItem(TOKEN)
                window.location.reload()
            }}>Đăng Xuất</Button>
        </div>
    );

    const renderLogin = () => {
        if (_.isEmpty(userLogin)) {
            return <Fragment>
                <Button type="text" href="/register" className="text-white">{t('signup')}</Button>
                <Button type="primary" href="/login" className="font-semibold bg-violet-400">{t('signin')}</Button>
            </Fragment>
        } else {
            return <Popover placement="bottomRight" title={userLogin.name} content={content} trigger="click">
                <Button className='rounded-full bg-slate-300 p-0 d-flex justify-center items-center w-full h-full' style={{ width: 40, height: 40 }}>
                    {userLogin.avatar?
                    <div style={{minWidth:'40px', minHeight:40, backgroundSize: 'cover', borderRadius: '50%', backgroundImage: `url(${userLogin.avatar})`}} />
                    : <Avatar size={40} style={{ fontSize: '28px', lineHeight: '32px' }} icon={userLogin?.name.substr(0, 1)} />
                    }
                    </Button>
            </Popover>
        }

    }

    return (
        <div>
            <header className="p-4 bg-gray-800 text-gray-100 fixed w-full bg-opacity-60 z-20">
                <div className="container flex justify-between h-16 mx-auto">
                    <NavLink rel="noopener noreferrer" to="/" aria-label="Back to homepage" className="flex items-center p-2">
                        <div className='d-flex' >
                            <img src='/img/logo.png' alt='logo' style={{ width: '50px', height: '100%' }} />
                            <img src='/img/name.png' alt='logo' style={{ width: '100px', height: '100%' }} />
                        </div>
                    </NavLink>
                    <ul className="items-stretch hidden space-x-3 lg:flex ml-5">
                        <li className="flex">
                            <NavLink to="/home" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent" activeClassName="border-b-2 text-violet-400 border-violet-600">Trang Chủ</NavLink>
                        </li>
                        <li className="flex">
                            <NavLink to="/news" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent" activeClassName="border-b-2 text-violet-400 border-violet-600">Tin Tức</NavLink>
                        </li>
                        <li className="flex">
                            <NavLink to="/contact" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent" activeClassName="border-b-2 text-violet-400 border-violet-600">Liên Hệ</NavLink>
                        </li>

                    </ul>

                    <div className="items-center flex-shrink-0 hidden lg:flex">
                        <Input placeholder="Tìm kiếm" className='rounded-full mr-5' prefix={<SearchOutlined />} />
                        {/* <Select
                            defaultValue="en"
                            style={{
                                width: 60,
                                marginRight: 12
                            }}
                            onChange={handleChange}
                            options={[
                                {
                                    value: 'en',
                                    label: 'En',
                                },
                                {
                                    value: 'cn',
                                    label: 'Cn',
                                },
                                {
                                    value: 'vi',
                                    label: 'Vi',
                                }
                            ]}
                        /> */}

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
