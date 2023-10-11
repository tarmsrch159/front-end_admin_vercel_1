import React from 'react'
import { useState, useEffect, useRef } from "react"
import axios from 'axios'
import { font } from "../assets/Fonts/THSarabun-normal"
import { fontBold } from '../assets/Fonts/THSarabun Bold-bold'
import signatureImage from '../assets/img/signature.png'


//Components
import Sidebar from '../components/Sidebar'
import Navbar_admin from '../components/Navbar_admin'
import Footer_admin from '../components/Footer_admin'
import Test_pdf_file from '../Pages/Test_pdf_file'

import { NavLink, Link } from 'react-router-dom'

//About export a report
import { useReactToPrint } from "react-to-print"
import { Page, Text, Image, Document, StyleSheet } from "@react-pdf/renderer"
import { PDFDownloadLink } from '@react-pdf/renderer'
import jsPDF from 'jspdf'
import { autoTable } from 'jspdf-autotable'


function Content_admin() {

    const componentPDF = useRef()
    const [display_user, setDisplay_user] = useState([])
    const [rt_text, setRT_text] = useState("")
    const [show_permission, setShow_permission] = useState(null)
    const [post, setPost] = useState([])
    const [fake_data, setFake_data] = useState([])
    const [hide_idcard, setHide_idcard] = useState("")
    const permission = localStorage.getItem('permission')
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [m_th, setM_th] = useState("")
    const today = new Date()
    const m = today.getMonth() + 1
    const y = today.getFullYear()
    const d = today.getDate()
    const current_date = y + '-' + m + '-' + d
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





    //Export to pdf and set as Thai language
    const exportPDF = () => {
        const doc = new jsPDF()
        var offsetY = 4.797777777777778; //var offsetY is for spacing
        var lineHeight = 12; //var lineHeight is for Spacing
        const imgWidth = 50;
        const imgHeight = 30;
        const x = 100;
        const tableHeight = doc.autoTable.previous.finalY + lineHeight * 1.5 + offsetY;
        const y_position = tableHeight
        const text_x = 16
        const text_y = doc.autoTable.previous.finalY + 3 * 1.5 + offsetY;
        const text_y_2 = doc.autoTable.previous.finalY + 7.5 * 1.5 + offsetY;



        //add the bold font
        doc.addFileToVFS("MyFont.ttf", fontBold)
        doc.addFont("MyFont.ttf", "MyFont", "normal")
        doc.setFont("MyFont")
        //add the font
        doc.addFileToVFS("Font.ttf", font)
        doc.addFont("Font.ttf", "Font", "normal")
        doc.setFont("Font")


        let width = doc.internal.pageSize.getWidth()

        doc.text(`           ใบสรุปการทดสอบมาตรฐานฝีมือแรงงานแห่งชาติ 
        วันที่ ${d} ${m_th} ${y} ณ ห้องปฏิบัติการคอมพิวเตอร์ 2101`, width / 2, 15, { align: 'center' })

        const data = display_user.map((val) => [
            val.reg_id,
            val.course_name_th,
            val.candidate,
            val.prefix,
            val.name,
            val.lastname,
        ])
        const contents = {
            startY: 30,
            headStyles: { fillColor: [255, 255, 255], lineWidth: 0.1, font: 'MyFont', fontSize: 12 },
            head: [
                [
                    "รหัสสมัครสอบ",
                    "หลักสูตร",
                    "ประเภทผู้สมัครทดสอบ",
                    "คำนำหน้า",
                    "ชื่อ",
                    "นามสกุล"
                ]
            ],
            body: data,
            styles: { font: 'Font', halign: 'center', textColor: [0, 0, 0] },
            bodyStyles: { lineWidth: 0.1 }
        }

        doc.autoTable(contents)
        // doc.addImage(signatureImage, 'png', x, y_position, imgWidth, imgHeight)
        // doc.setFontSize(12)
        // doc.text('เกณฑ์การตัดสินผ่านการทดสอบ ต้องให้คะแนนรวม ไม่ต่ำกว่า 70 คะแนน', text_x, text_y)
        // doc.text('ลงชื่อ ผู้ทดสอบมาตรฐานฝีมือแรงงาน', text_x, text_y_2)
        doc.save("รายชื่อผู้สมัครสอบ.pdf")
    }





    //Logout and Clear a localStorage
    const handleLogout = () => {
        localStorage.clear()

        window.location = '/'
    }


    useEffect(() => {
        { m == '1' ? setM_th("มกราคม") : null }
        { m == '2' ? setM_th("กุมภาพันธ์") : null }
        { m == '3' ? setM_th("มีนาคม") : null }
        { m == '4' ? setM_th("เมษายน") : null }
        { m == '5' ? setM_th("พฤษภาคม") : null }
        { m == '6' ? setM_th("มิถุนายน") : null }
        { m == '6' ? setM_th("มิถุนายน") : null }
        { m == '7' ? setM_th("กรกฎาคม") : null }
        { m == '8' ? setM_th("สิงหาคม") : null }
        { m == '9' ? setM_th("กันยายน") : null }
        { m == '10' ? setM_th("ตุลาคม") : null }
        { m == '11' ? setM_th("พฤศจิกายน") : null }
        { m == '12' ? setM_th("ธันวาคม") : null }
        //Check permission

        //Check permission
        if (!permission) {
            console.log("Please login again")
            alert("กรุณาทำการเข้าสู่ระบบ")
            window.location = '/'
        }

        //Display user
        axios.get(`https://server-2-s3v5.onrender.com/display_all_user?page=${page}&pageSize=${pageSize}`).then((res) => {
            setDisplay_user(res.data.data)
            console.log(res.data.data)
            setTotalPages(res.data.totalPages);

        })
            .catch((error) => {
                console.error(error);
            });
    }, [page, pageSize, m_th])

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        axios.get('https://server-2-s3v5.onrender.com/course_name').then((res) => {
            console.log(res)
        })
    },[])

    return (
        <>
            {/* Page Wrapper */}
            <div id="wrapper">

                {/* Sidebar-admin */}
                < Sidebar />

                {/* Content Wrapper */}
                <div id="content-wrapper" className="d-flex flex-column">

                    <Navbar_admin prop={permission} />

                    {/* Main Content */}
                    <div id="content">
                        <div className="container-fluid" >

                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    {/* <h3 className="m-0 font-weight-bold text-primary">ข้อมูลผู้เข้าร่วมการสอบ</h3> */}
                                    {/* ออก Report */}
                                    <button onClick={exportPDF} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                                        <svg style={{ marginRight: "10px" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer-fill" viewBox="0 0 16 16">
                                            <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z" />
                                            <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                                        </svg>
                                        ออกรายงาน
                                    </button>
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
                                            </div>
                                            <div className="row">
                                                {/* There's no data */}
                                                {display_user.length < 1 &&
                                                    <div style={{ display: "flex", justifyContent: 'center', alignContent: 'center' }}>
                                                        <button type="button" class="btn btn-danger">No Data</button>
                                                    </div>
                                                }
                                            </div>
                                            <div className="row">
                                                {display_user.length > 0 &&
                                                    <div className="col-sm-12 table-responsive">
                                                        <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing={0} role="grid" aria-describedby="dataTable_info" style={{ width: '100%' }}>
                                                            <thead>
                                                                <tr role="row" style={{ textAlign: "center" }}>
                                                                    <th className="sorting_asc" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{ width: '100px' }}>รหัสสอบ</th>
                                                                    <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{ width: '150px' }}>หลักสูตร</th>
                                                                    <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{ width: '150px' }}>ประเภทผู้สมัครทดสอบ</th>
                                                                    <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{ width: '100px' }}>ชื่อ-นามสกุล</th>
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
                                                                                <td>{items.course_name}</td>
                                                                                <td>{items.candidate}</td>
                                                                                <td>{items.prefix} {items.name} {items.lastname}</td>
                                                                                {/* <td>{items.permission === "รอชำระเงิน"
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
                                                                                                <span class="text">
                                                                                                    ผู้สมัคร
                                                                                                </span>
                                                                                            </a>
                                                                                        </>
                                                                                    )}</td> */}

                                                                            </tr>
                                                                        </>
                                                                    )
                                                                })}


                                                            </tbody>
                                                        </table>
                                                    </div>

                                                }

                                            </div>
                                            <div className="row">
                                                <div className="col-sm-12 col-md-5">
                                                    {/* <div className="dataTables_info" id="dataTable_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries</div> */}
                                                </div>
                                                <div className="col-sm-7"><div className="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">
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

export default Content_admin