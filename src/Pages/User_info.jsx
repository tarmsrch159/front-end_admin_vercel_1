import React from 'react'
import { useState, useEffect, useRef } from "react"
import axios from 'axios'


//Components
import Sidebar from '../components/Sidebar'
import Navbar_admin from '../components/Navbar_admin'
import Footer_admin from '../components/Footer_admin'

import { NavLink, Link } from 'react-router-dom'

//React-to-print
import { useReactToPrint } from "react-to-print"
import jsPDF from "jspdf"
import "jspdf-autotable";


function User_info() {

  const [display_user, setDisplay_user] = useState([])
  const [rt_text, setRT_text] = useState("")
  const [show_permission, setShow_permission] = useState(null)
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const toThaiDateString = (date) => {
    const change_date = new Date(date)
    let monthNames = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
      "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม.",
      "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];

    let year = change_date.getFullYear() + 543
    let month = monthNames[change_date.getMonth()]
    let numOfDay = change_date.getDate();

    return `${numOfDay} ${month} ${year}`
  }



  //Logout and Clear a localStorage
  const handleLogout = () => {
    localStorage.clear()
    window.location = '/'
  }


  const delete_user = (reg_id) => {
    axios.delete(`https://cloud-server-2-again.vercel.app/delete_member/${reg_id}`).then(() => {
    
      if (confirm("ต้องการจะลบข้อมูลใช่หรือไม่") == true) {
        setDisplay_user(
          display_user.filter((val) => {
            return val.reg_id != reg_id
          })
        )
      } else {
        return false
      }

    })
  }

  const cancel_permission = async (reg_id) => {
    if (confirm('คุณต้องการจะยกเลิกสิทธิ์ของผู้สมัครใช่หรือไม่ ?')) {
      await axios.put('https://cloud-server-2-again.vercel.app/cancel_permission/' + reg_id).then(
        alert('ยกเลิกสิทธิ์ของผู้สมัครเรียบร้อย')
      )
      location.reload()
    } else {
      alert('เกิดข้อผิดพลาด')
      return
    }


  }

  const For_user_dont_pay = () => {
    window.location = '/waiting_for_payment'
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
    axios.get(`https://cloud-server-2-again.vercel.app/display_all_user_edit?page=${page}&pageSize=${pageSize}`).then((res) => {
      setDisplay_user(res.data.data)

      setTotalPages(res.data.totalPages);

    })
      .catch((error) => {
        console.error(error);
      });

  }, [page, pageSize])

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const [show_course, setShow_course] = useState([])
  useEffect(() => {
    axios.get('https://cloud-server-2-again.vercel.app/course_name').then((res) => {
      setShow_course(res.data)
    })
  }, [])
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


            <div className="container-fluid" >
              {/* Page Heading */}
              {/* <h1 className="h3 mb-2 text-gray-800">ข้อมูลผู้สมัคร</h1>
              <p className="mb-4">DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, please visit the <a target="_blank" href="https://datatables.net">official DataTables documentation</a>.</p> */}
              {/* DataTales Example */}
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h3 className="m-0 font-weight-bold text-primary"></h3>
                </div>
                <div className="card-body">
                  <h3 style={{ textAlign: 'center', fontWeight: "bold", color: "black" }}>ข้อมูลผู้สมัครสอบ</h3>
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
                                {/* <option value={5}>5</option> */}
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
                      </div>


                      <div className="row">
                        <div className="col-sm-12">
                          {/* There's no data */}
                          {display_user.length < 1 &&
                            <div style={{ display: "flex", justifyContent: 'center', alignContent: 'center' }}>
                              <button type="button" className="btn btn-danger px-3">No Data</button>
                            </div>
                          }

                          {display_user.length > 0 &&
                            <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing={0} role="grid" aria-describedby="dataTable_info" style={{ width: '100%' }}>
                              <thead>
                                <tr role="row" style={{ textAlign: "center" }}>
                                  <th className="sorting_asc" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{ width: '100px' }}>รหัสสอบ</th>
                                  <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{ width: '200px' }}>หลักสูตร</th>
                                  <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{ width: '150px' }}>ประเภทผู้สมัครทดสอบ</th>
                                  <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{ width: '150px' }}>ชื่อ-นามสกุล</th>
                                  {/* <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Salary: activate to sort column ascending" style={{ width: '100px' }}>สิทธิ์การเข้าถึง</th> */}
                                  <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Salary: activate to sort column ascending" style={{ width: '100px' }}>การจัดการ</th>
                                </tr>
                              </thead>

                              <tbody style={{ textAlign: "center" }}>

                                {/* Search filter */}
                                {display_user.filter((items) => {
                                  if (rt_text === "") {
                                    return items
                                  } else if (items.reg_id.toLowerCase().includes(rt_text.toLocaleLowerCase())) {
                                    return items
                                  } else if (items.name.toLowerCase().includes(rt_text.toLocaleLowerCase())) {
                                    return items
                                  }
                                }).map((items) => {
                                  return (
                                    <>
                                      <tr key={items.reg_id} role="row" className="odd">
                                        <td className="sorting_1">{items.reg_id}</td>
                                        {/* <td>{show_course.map((res) => {
                                          return <>
                                            {
                                              res.id == items.course
                                                ? <p>{res.name_th}</p>
                                                : null
                                            }
                                          </>
                                        })}</td> */}
                                        <td>{items.course_name_th}</td>
                                        <td>{items.candidate}</td>
                                        <td>{items.prefix} {items.name} {items.lastname}</td>
                                        {/* <td>{items.gender}</td> */}
                                        {/* <td style={{ display: 'flex', justifyContent: 'center', }}>
                                          {items.permission === "รอชำระเงิน"
                                          ? (
                                            <>
                                              <a href="#" class="btn btn-warning px-1">
                                                <span class="text">รอชำระเงิน</span>
                                              </a>
                                            </>
                                          )
                                          : (
                                            <>
                                              <a href="#" class="btn btn-success px-2">
                                                <span class="text">ผู้สมัคร</span>
                                              </a>
                                            </>
                                          )}</td> */}
                                        {/* <td>
                                          {items.permission === 'ผู้สมัคร'
                                            ? <button onClick={() => cancel_permission(items.reg_id)} className="btn btn-danger ml-2">
                                              <span className="text">
                                                ยกเลิก
                                              </span>
                                            </button>
                                            : <Link to={{ pathname: `/waiting_for_payment` }}>
                                              <button className="btn btn-warning">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-dollar" viewBox="0 0 16 16">
                                                  <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
                                                </svg>
                                              </button>
                                            </Link>
                                          }

                                        </td> */}

                                        <td style={{ display: 'flex', justifyContent: "center" }}>
                                          <Link to={{ pathname: `/edit_user_info/${items.reg_id}` }}>
                                            <button className="btn btn-primary">
                                              <span className="text">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                </svg>
                                              </span>
                                            </button>
                                          </Link>

                                          <button className="ml-2 btn btn-danger" onClick={() => delete_user(items.reg_id)}>
                                            <span className="text">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                              </svg>
                                            </span>
                                          </button>
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
                        <div className="col-sm-12 col-md-5">
                          {/* <div className="dataTables_info" id="dataTable_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries</div> */}
                        </div>
                        <div className="col-sm-12 col-md-7"><div className="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">
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

export default User_info