import React from 'react'
import { useState, useEffect } from "react"
import axios from 'axios'


//Components
import Sidebar from '../components/Sidebar'
import Navbar_admin from '../components/Navbar_admin'
import Footer_admin from '../components/Footer_admin'

import { NavLink, Link } from 'react-router-dom'

function Waiting_for_payment() {

    const [waiting_payment, setWaiting_payment] = useState([])
    const [rt_text, setRT_text] = useState("")
    const [show_permission, setShow_permission] = useState(null)
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);



    //Logout and Clear a localStorage
    const handleLogout = () => {
        localStorage.clear()
        window.location = '/'
    }




    const confirm_permission = (val_id) => {
        console.log(val_id)
        if (confirm("ต้องการจะยืนยันสิทธิ์แก่ผู้สมัครคนนี้หรือไม่")) {
            axios.put("https://server-2-s3v5.onrender.com/update_permission", {
                reg_id: val_id,
                permission: "ผู้สมัคร"
            })
            window.location = '/user_info'
        } else {
            return false
        }
    }


    function back_home() {
        window.location = '/user_info'
    }




    const permission = localStorage.getItem('permission')
    useEffect(() => {

        //Check permission
        if (!permission) {
            console.log("Please login again")
            alert("กรุณาทำการเข้าสู่ระบบ")
            window.location = '/'
        }

        //Display user
        axios.get(`https://server-2-s3v5.onrender.com/do_not_pay?page=${page}&pageSize=${pageSize}`).then((res) => {
            setWaiting_payment(res.data.data)
            setTotalPages(res.data.totalPages);
        })
            .catch((error) => {
                console.error(error);
            });
    }, [page, pageSize])

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    function click_receipt(receipt) {
        window.open(receipt)
    }

    console.log(waiting_payment)
    return (
        <>
            {/* Page Wrapper */}
            <div id="wrapper">


                {/* Sidebar-admin */}
                < Sidebar />

                {/* Content Wrapper */}
                <div id="content-wrapper" className="d-flex flex-column">



                    {/* Main Content */}
                    <div id="content">
                        <Navbar_admin prop={permission} />


                        <div className="container-fluid">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">

                                </div>
                                <div className="card-body">
                                    <h3 style={{ textAlign: 'center', fontWeight: "bold", color: "black" }}>ข้อมูลสำหรับผู้ที่ยังไม่ได้ชำระเงิน</h3>
                                    <div className="table-responsive">
                                        <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                                            <div className="row">
                                                <div className="col-sm-12 col-md-6">
                                                    <div className="dataTables_length" id="dataTable_length">
                                                        <label>
                                                            แสดงข้อมูลผู้ใช้{" "}
                                                            <select
                                                                name="dataTable_length"
                                                                aria-controls="dataTable"
                                                                className="custom-select custom-select-sm form-control form-control-sm"
                                                                onChange={(e) => setPageSize(e.target.value)}
                                                            >
                                                                <option value={5}>5</option>
                                                                <option value={10}>10</option>
                                                                <option value={20}>20</option>
                                                                <option value={30}>30</option>
                                                            </select>{" "}

                                                        </label>
                                                    </div>
                                                </div>


                                                <div className="col-sm-12 col-md-6">

                                                    {/* Real-time search */}
                                                    <div id="dataTable_filter" className="dataTables_filter" style={{ display: 'flex', justifyContent: "end" }}>
                                                        <label>ค้นหา: เลขบัตรปชชและชื่อ
                                                            <input type="search" className="form-control form-control-sm" placeholder
                                                                aria-controls="dataTable" onChange={(e) => setRT_text(e.target.value)} />
                                                        </label>
                                                    </div>

                                                </div>
                                                <div className="row">
                                                    {/* There's no data */}
                                                    {waiting_payment.length < 1 &&
                                                        <div style={{ display: "flex", justifyContent: 'center', alignContent: 'center' }}>
                                                            <button type="button" class="btn btn-danger">No Data</button>
                                                        </div>
                                                    }
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-sm-12">


                                                    {waiting_payment.length > 0 &&
                                                        <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing={0} role="grid" aria-describedby="dataTable_info" style={{ width: '100%' }}>
                                                            <thead>
                                                                <tr role="row">
                                                                    <th className="sorting_asc" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" >รหัสสอบ</th>
                                                                    <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" >หลักสูตร</th>
                                                                    <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending">ชื่อ-นามสกุล</th>
                                                                    <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Salary: activate to sort column ascending" >สิทธิ์การเข้าถึง</th>
                                                                    <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Salary: activate to sort column ascending" style={{ width: '130px' }} >ใบเสร็จ</th>
                                                                    <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Salary: activate to sort column ascending">ยืนยันสิทธิ์</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>

                                                                {/* Search filter */}
                                                                {waiting_payment.filter((items) => {
                                                                    if (rt_text === "") {
                                                                        return items
                                                                    } else if (items.id_card.toLowerCase().includes(rt_text.toLocaleLowerCase())) {
                                                                        return items
                                                                    } else if (items.name.toLowerCase().includes(rt_text.toLocaleLowerCase())) {
                                                                        return items
                                                                    }
                                                                }).map((items) => {
                                                                    return (
                                                                        <>
                                                                            <tr key={items.id} role="row" className="odd">
                                                                                <td className="sorting_1">{items.reg_id}</td>
                                                                                <td>{items.course_name_th}</td>
                                                                                <td>{items.prefix} {items.name} {items.lastname}</td>
                                                                                <td className='d-flex justify-content-center align-items-center'>{items.permission === "รอชำระเงิน"
                                                                                    ? (
                                                                                        <>
                                                                                            <a href="#" class="btn btn-warning">
                                                                                                <span class="text">รอชำระเงิน</span>
                                                                                            </a>
                                                                                        </>
                                                                                    )
                                                                                    : (
                                                                                        <>
                                                                                            <a href="#" class="btn btn-success">
                                                                                                <span class="text">ผู้สมัคร</span>
                                                                                            </a>
                                                                                        </>
                                                                                    )}</td>
                                                                                <td>
                                                                                    {items.receipt != ""
                                                                                        ?
                                                                                        <>
                                                                                            {/* <div className="">
                                                                                                <div className="">
                                                                                                    <div
                                                                                                        className="bg-image hover-overlay ripple"
                                                                                                        data-ripple-color="light"
                                                                                                    >
                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="30" fill="currentColor" class="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
                                                                                                            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z" />
                                                                                                        </svg>
                                                                                                        <a
                                                                                                            href="#!"
                                                                                                            data-mdb-toggle="modal"
                                                                                                            data-mdb-target="#exampleModal1"
                                                                                                        >
                                                                                                            <div
                                                                                                                className="mask"
                                                                                                                style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                                                                                                            />
                                                                                                        </a>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div
                                                                                                className="modal fade"
                                                                                                id="exampleModal1"
                                                                                                tabIndex={-1}
                                                                                                aria-labelledby="exampleModal1Label"
                                                                                                aria-hidden="true"
                                                                                            >
                                                                                                <div className="modal-dialog modal-lg">
                                                                                                    <div className="modal-content">
                                                                                                        <div className="ratio ratio-16x9">
                                                                                                            <img
                                                                                                                src={`http://localhost:3000/images/${items.receipt}`}
                                                                                                                width={100}
                                                                                                                height={100}
                                                                                                            />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div> */}
                                                                                            <div className='d-flex justify-content-center align-items-center'>
                                                                                                <button className='btn btn-outline-info' onClick={() => click_receipt(`https://server-2-s3v5.onrender.com/images/${ items.receipt }`)} >
                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-file-earmark-medical" viewBox="0 0 16 16">
                                                                                                        <path d="M7.5 5.5a.5.5 0 0 0-1 0v.634l-.549-.317a.5.5 0 1 0-.5.866L6 7l-.549.317a.5.5 0 1 0 .5.866l.549-.317V8.5a.5.5 0 1 0 1 0v-.634l.549.317a.5.5 0 1 0 .5-.866L8 7l.549-.317a.5.5 0 1 0-.5-.866l-.549.317V5.5zm-2 4.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 2a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z" />
                                                                                                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                                                                                                    </svg>
                                                                                                </button>
                                                                                            </div>

                                                                                        </>

                                                                                        : <div className='d-flex justify-content-center align-items-center'>
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-ban" viewBox="0 0 16 16">
                                                                                                <path d="M15 8a6.973 6.973 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8ZM2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Z" />
                                                                                            </svg>
                                                                                        </div>

                                                                                    }
                                                                                </td>
                                                                                <td style={{ display: 'flex', justifyContent: "center" }}>

                                                                                    {items.receipt != ''
                                                                                        ? <button onClick={() => confirm_permission(items.reg_id)} className="btn btn-primary">
                                                                                            <span className="text">คลิกยืนยันสิทธิ์</span>
                                                                                        </button>
                                                                                        : <button disabled className="btn btn-danger">
                                                                                            <i class="fas fa-xmark"></i>
                                                                                        </button>}

                                                                                </td>
                                                                            </tr>
                                                                        </>
                                                                    )
                                                                })}


                                                            </tbody>
                                                        </table>
                                                    }

                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-12 col-md-5"><div className="dataTables_info" id="dataTable_info" role="status" aria-live="polite"></div>
                                                </div>
                                                <div className="col-sm-12 col-md-7">
                                                    <div className="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">
                                                        <div className="pagination mb-3 mt-3">
                                                            <button type="button" class="btn btn-outline-primary mr-3" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                                                                <span aria-hidden="true">&laquo;</span>
                                                            </button>
                                                            {Array.from({ length: totalPages }, (_, i) => (
                                                                <>
                                                                    <li key={i + 1} onClick={() => handlePageChange(i + 1)} className={page === i + 1 ? "paginate_button page-item active px-1" : "paginate_button page-item px-1"}>
                                                                        <a href="#" aria-controls="dataTable" data-dt-idx={1} tabIndex={0} className="page-link">{i + 1}</a>
                                                                    </li>
                                                                </>

                                                            ))}

                                                            <button type="button" class="btn btn-outline-primary ml-3" onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
                                                                <span aria-hidden="true">&raquo;</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    {/* End of Main Content */}



                    < Footer_admin />
                </div>
                {/* End of Content Wrapper */}
            </div>
            {/* End of Page Wrapper */}





            {/* Logout Modal*/}
            <div className="modal fade" id="logoutModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* <h5 className="modal-title" id="exampleModalLabel">ต้องการที่จะออกหรือไม่</h5> */}
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <h4 className="modal-body" style={{ textAlign: 'center' }}>ต้องการที่จะออกหรือไม่</h4>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">ยกเลิก</button>
                            <button className="btn btn-primary" onClick={handleLogout}>ออกจากระบบ</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Waiting_for_payment