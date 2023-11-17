import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo_admin from '../assets/img/logo.rus.png'

function Sidebar() {
    const [style, setStyle] = useState('navbar-nav bg-gradient-warning sidebar sidebar-warning accordion')

    const ChangeStyle = () => {
        if (style == 'navbar-nav bg-gradient-warning sidebar sidebar-warning accordion') {
            setStyle('navbar-nav bg-gradient-warning sidebar sidebar-warning accordion toggled')
        } else {
            setStyle('navbar-nav bg-gradient-warning sidebar sidebar-warning accordion')
        }

    }


    const [ActiveLink, setActiveLink] = useState("nav-item active")
    return (
        <>
            {/* Sidebar */}
            <ul className={style} id="accordionSidebar">
                {/* Sidebar - Brand */}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <NavLink to='/dashboard'>
                        <div className="sidebar-brand-icon">
                            <img src={logo_admin} alt="" width={50} height={50} />
                        </div>
                    </NavLink>
                    <NavLink to='/dashboard'>
                        <div className="sidebar-brand-text mx-1" style={{ fontSize: '10px' }}>ศูนย์สอบกรมพัฒนาฝีมือแรงงาน <br />ศูนย์สุพรรณบุรี</div>

                    </NavLink>
                </a>
                {/* Divider */}
                <hr className="sidebar-divider my-0" />




                {/* Nav Item - Dashboard */}

                <NavLink to='/dashboard' className={({ isActive }) => isActive ? ActiveLink : "nav-item"} style={{ textDecoration: "none" }}>
                    <li >
                        <a className="nav-link">
                            <i className="fas fa-fw fa-tachometer-alt" />
                            <span>ข้อมูลผู้สมัคร</span>
                        </a>
                    </li>
                </NavLink>



                <NavLink to='/user_info' className={({ isActive }) => isActive ? ActiveLink : "nav-item"} style={{ textDecoration: "none" }}>
                    <li >
                        <a className="nav-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg>
                            <span className='px-1'>จัดการข้อมูลผู้สมัคร</span>
                        </a>
                    </li>
                </NavLink>

                <NavLink to='/user_score/' className={({ isActive }) => isActive ? ActiveLink : "nav-item"} style={{ textDecoration: "none" }}>
                    <li >
                        <a className="nav-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg>
                            <span className='px-1'>จัดการคะแนนของผู้สมัครสอบ</span>
                        </a>
                    </li>
                </NavLink>




                <NavLink to='/certifi_rp' className={({ isActive }) => isActive ? ActiveLink : "nav-item"} style={{ textDecoration: "none" }}>
                    <li >
                        <a className="nav-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-medical" viewBox="0 0 16 16">
                                <path d="M7.5 5.5a.5.5 0 0 0-1 0v.634l-.549-.317a.5.5 0 1 0-.5.866L6 7l-.549.317a.5.5 0 1 0 .5.866l.549-.317V8.5a.5.5 0 1 0 1 0v-.634l.549.317a.5.5 0 1 0 .5-.866L8 7l.549-.317a.5.5 0 1 0-.5-.866l-.549.317V5.5zm-2 4.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 2a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z" />
                                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                            </svg>
                            <span className='px-1'>รายงานข้อมูลเกียรติบัตรผู้ที่ผ่านการสอบ</span>
                        </a>
                    </li>
                </NavLink>



                <NavLink to='/waiting_for_payment' className={({ isActive }) => isActive ? ActiveLink : "nav-item"} style={{ textDecoration: "none" }}>
                    <li >
                        <a className="nav-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                            </svg>
                            <span className='px-1'>ข้อมูลสำหรับผู้ที่ยังไม่ได้ชำระเงิน</span>
                        </a>
                    </li>
                </NavLink>

                <hr className="sidebar-divider d-none d-md-block" />

                <NavLink to='https://frontend-user-test-deploy-fp9p.vercel.app/' className={({ isActive }) => isActive ? ActiveLink : "nav-item"} style={{ textDecoration: "none" }}>
                    <li >
                        <a className="nav-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                            </svg>
                            <span className='px-1'>หน้าสำหรับ User</span>
                        </a>
                    </li>
                </NavLink>

                <NavLink to='/add_admin' className={({ isActive }) => isActive ? ActiveLink : "nav-item"} style={{ textDecoration: "none" }}>
                    <li >
                        <a className="nav-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                            </svg>
                            <span className='px-1'>เพิ่มข้อมูล Admin</span>
                        </a>
                    </li>
                </NavLink>
                
                <hr className="sidebar-divider d-none d-md-block" />
                {/* Sidebar Toggler (Sidebar) */}
                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle" onClick={ChangeStyle} />
                </div>
            </ul>
            {/* End of Sidebar */}
        </>
    )
}

export default Sidebar