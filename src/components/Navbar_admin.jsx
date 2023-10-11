import React from 'react'
import { useState } from 'react'

function Navbar_admin(permission) {

    //get permission prop from parent component
    const get_permission = localStorage.getItem("permission")
    const get_name = localStorage.getItem("name")
    const get_lastname = localStorage.getItem("lastname")

    const [style, setStyle] = useState('navbar-nav bg-gradient-primary sidebar sidebar-dark accordion')

    const ChangeStyle = () => {
        if (style == 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion') {
            setStyle('navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled')
        } else {
            setStyle('navbar-nav bg-gradient-primary sidebar sidebar-dark accordion')
        }
    }



    // console.log(get_lastname)
    // console.log(get_name)
    // console.log(get_permission)
    return (
        <>
            {/* Topbar */}
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                {/* Sidebar Toggle (Topbar) */}
                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3" onClick={ChangeStyle}>
                    <i className="fa fa-bars" />
                </button>
                <ul className="navbar-nav ml-auto">
                    {/* Nav Item - Search Dropdown (Visible Only XS) */}
                    <li className="nav-item dropdown no-arrow d-sm-none">
                        <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-search fa-fw" />
                        </a>
                        {/* Dropdown - Messages */}
                        <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                            <form className="form-inline mr-auto w-100 navbar-search">
                                <div className="input-group">
                                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button">
                                            <i className="fas fa-search fa-sm" />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </li>
                    <div className="topbar-divider d-none d-sm-block" />
                    {/* Nav Item - User Information */}
                    {/* <li className="nav-item dropdown no-arrow">
                        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{get_name}</span>
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{get_lastname}</span>
                            <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                            <a className="dropdown-item" href="#">
                                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                                สิทธิ์การเข้าถึง: {get_permission}
                            </a>
                            <a className="dropdown-item" href="#">
                                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                                บัญชี
                            </a>
                            
                        
                            <div className="dropdown-divider" />
                            <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                                ออกจากระบบ
                            </a>
                        </div>
                    </li> */}
                    <div className="dropdown">
                        <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <span className="mr-2 d-none d-lg-inline small">{get_name}</span>
                            <span className="mr-2 d-none d-lg-inline small">{get_lastname}</span>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li>
                                <a className="dropdown-item" href="#">
                                    สิทธิ์การเข้าถึง: {get_permission}
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                                    ออกจากระบบ
                                </a>
                            </li>
                        </ul>
                    </div>

                </ul>
            </nav>
            {/* End of Topbar */}
        </>
    )
}

export default Navbar_admin