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
import { format, toDate } from 'date-fns';
import getDate from 'date-fns/getDate'
import getMonth from 'date-fns/getMonth'
import getYear from 'date-fns/getYear'

// import * as FileSaver from 'file-saver'
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx/xlsx.mjs';


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
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [m_th, setM_th] = useState("")
    const [th_course, setTh_course] = useState([])
    const today = new Date()
    const m = today.getMonth() + 1
    const y = today.getFullYear()
    const d = today.getDate()
    const current_date = y + '-' + m + '-' + d

    const [change_m, setChange_m] = useState(m)
    const [change_course, setChange_course] = useState(1)
    const [dynamic_course, setDynamic_course] = useState('');
    const [room_exam, setRoom_exam] = useState('2101');
    const [from_Date, setFrom_Date] = useState()
    const [to_Date, setTo_Date] = useState()
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
    const j_month = [
        {
            id: '1',
            month_n: 'มกราคม'
        },
        {
            id: '2',
            month_n: 'กุมภาพันธ์'
        },
        {
            id: '3',
            month_n: 'มีนาคม'
        },
        {
            id: '4',
            month_n: 'เมษายน'
        },
        {
            id: '5',
            month_n: 'พฤษภาคม'
        },
        {
            id: '6',
            month_n: 'มิถุนายน'
        },
        {
            id: '7',
            month_n: 'กรกฎาคม'
        },
        {
            id: '8',
            month_n: 'สิงหาคม'
        },
        {
            id: '9',
            month_n: 'กันยายน'
        },
        {
            id: '10',
            month_n: 'ตุลาคม'
        },
        {
            id: '11',
            month_n: 'พฤศจิกายน'
        },
        {
            id: '12',
            month_n: 'ธันวาคม'
        },
    ]

    //Function fetch date 
    const [selectedDate, setSelectedDate] = useState('');
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };
    const result_day_month = () => {
        const result_day = getDate(new Date(selectedDate))
        const result_month = getMonth(new Date(selectedDate)) + 1
        const result_y = getYear(new Date(selectedDate))
        let test = ''
        {
            j_month.map((val) => {
                return <>
                    {result_month == val.id
                        ? test = val.month_n
                        : 'Error'
                    }
                </>
            })
        }
        return `${result_day} ${test} ${result_y}`
    }


    const [selectedPersons, setSelectedPersons] = useState([]);

    const handleCheckboxChange = (event) => {
        const { checked, value } = event.target;
        const selectedPerson = display_user.find((items) => items.reg_id === value);

        if (checked) {
            setSelectedPersons((prev) => [...prev, selectedPerson]);
        } else {
            setSelectedPersons((prev) => prev.filter((items) => items.reg_id !== value));
            //Delete array object ถ้าเลขประจำตัวในArray กับที่ติ๊กในเช็คบ็อคไม่ตรงกันให้ลบทิ้ง 
        }
    };



    var count = 1
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

        doc.text(`           หลักฐานการลงชื่อเข้าร่วมการทดสอบมาตรฐานฝีมือแรงงานแห่งชาติ 
        ${dynamic_course}  ณ ห้องปฏิบัติการคอมพิวเตอร์ ${room_exam}
        วันที่ ${result_day_month()} `, width / 2, 10, { align: 'center' })

        const data = selectedPersons.map((val) => [

            count++,
            val.ชื่อนามสกุล,
            "",
            "13.00 น.",
            "",
            "17.00 น.",
            "หมายเหตุ"

        ])
        const contents = {
            startY: 30,
            headStyles: { fillColor: [255, 255, 255], lineWidth: 0.1, font: 'MyFont', fontSize: 12 },
            head: [
                [
                    "ลำดับ",
                    "ชื่อ-สกุล",
                    "ลงชื่อ",
                    "เวลามา",
                    "ลงชื่อ",
                    "เวลากลับ",
                    "หมายเหตุ"
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
        //For month
        { change_m == '1' ? setM_th("มกราคม") : null }
        { change_m == '2' ? setM_th("กุมภาพันธ์") : null }
        { change_m == '3' ? setM_th("มีนาคม") : null }
        { change_m == '4' ? setM_th("เมษายน") : null }
        { change_m == '5' ? setM_th("พฤษภาคม") : null }
        { change_m == '6' ? setM_th("มิถุนายน") : null }
        { change_m == '7' ? setM_th("กรกฎาคม") : null }
        { change_m == '8' ? setM_th("สิงหาคม") : null }
        { change_m == '9' ? setM_th("กันยายน") : null }
        { change_m == '10' ? setM_th("ตุลาคม") : null }
        { change_m == '11' ? setM_th("พฤศจิกายน") : null }
        { change_m == '12' ? setM_th("ธันวาคม") : null }

        //For course
        {
            change_course == '1'
                ? setDynamic_course('สาขาพนักงานการใช้คอมพิวเตอร์(ประมวลผลคำ)')
                : setDynamic_course('สาขาพนักงานการใช้คอมพิวเตอร์(ตารางทำการ)')
        }

        //Check permission

        //Check permission
        if (!permission) {
            console.log("Please login again")
            alert("กรุณาทำการเข้าสู่ระบบ")
            window.location = '/'
        }

        //Display user
        axios.get(`https://cloud-server-2.vercel.app/display_all_user/${change_course}/?fromDate=${from_Date}&toDate=${to_Date}&page=${page}&pageSize=${pageSize}`).then((res) => {
            setDisplay_user(res.data.data)
            setTotalPages(res.data.totalPages);
            console.log(res)
        })
            .catch((error) => {
                console.error(error);
            });
    }, [change_m, change_course, page, pageSize, m_th, from_Date, to_Date])

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const [show_course, setShow_course] = useState([])
    useEffect(() => {
        axios.get('https://cloud-server-2.vercel.app/course_name').then((res) => {
            setShow_course(res.data)

        })
    }, [])


    const exportToExcel = () => {
        var wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(selectedPersons);

        XLSX.utils.book_append_sheet(wb, ws, "MySheet1")

        XLSX.writeFile(wb, 'MyExcel.xlsx')
    }


    const headers_2 = ['ลำดับ', 'ชื่อ', 'สกุล', 'ลงชื่อ', 'เวลามา', 'ลงชื่อ', 'เวลากลับ', 'หมายเหตุ'];

    const exportToExcel_2 = () => {
        const worksheet = XLSX.utils.json_to_sheet(selectedPersons);
        worksheet['!cols'] = [] // กำหนดคอลัมน์เป็นว่างทั้งหมด


        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // แปลง workbook เป็นสตริงที่มีรูปแบบไบนารี
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        // บันทึกไฟล์
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        const fileName = `${dynamic_course} ${from_Date} ${to_Date}.xlsx`;

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, fileName);
        } else {
            const link = document.createElement('a');
            document.body.appendChild(link);
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            document.body.removeChild(link);
        }
    };

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

                                    <button onClick={exportPDF} className="d-none d-sm-inline-block btn btn-sm btn-danger shadow-sm">
                                        <svg style={{ marginRight: "10px" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer-fill" viewBox="0 0 16 16">
                                            <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z" />
                                            <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                                        </svg>
                                        ออกรายงาน (PDF)
                                    </button>

                                    <button onClick={exportToExcel_2} className="mx-3 d-none d-sm-inline-block btn btn-sm btn-success shadow-sm">
                                        <svg style={{ marginRight: "10px" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer-fill" viewBox="0 0 16 16">
                                            <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z" />
                                            <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                                        </svg>
                                        ออกรายงาน (Excel)
                                    </button>
                                </div>

                                <div className="card-body">
                                    <h3 style={{ textAlign: 'center', fontWeight: "bold", color: "black" }}>ข้อมูลผู้สมัครสอบ</h3>
                                    <div className="table-responsive">
                                        <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                                            <div className="row">
                                                <div className="col-sm-12 col-md-6">
                                                    <div className="dataTables_length px-3" id="dataTable_length">
                                                        <label className='mr-3'>เลือกจากวันที่ (รอบสมัคร)
                                                            {/* <select onChange={(e) => setChange_m(e.target.value)} name="dataTable_length" aria-controls="dataTable" className="custom-select custom-select-sm form-control form-control-sm">

                                                                {j_month.map((items) => {
                                                                    return <>
                                                                        {m == items.id
                                                                            ? <option key={items.id} value={items.id} selected>{items.month_n}</option>
                                                                            : <option key={items.id} value={items.id}>{items.month_n}</option>
                                                                        }
                                                                    </>
                                                                })}
                                                            </select> */}
                                                            <input type="date" className="form-control form-control-sm" placeholder
                                                                aria-controls="dataTable" onChange={(e) => setFrom_Date(e.target.value)} />
                                                                
                                                        </label>

                                                        <label className='mr-3'>ถึงวันที่ (รอบสมัคร)
                                                            {/* <select onChange={(e) => setChange_m(e.target.value)} name="dataTable_length" aria-controls="dataTable" className="custom-select custom-select-sm form-control form-control-sm">

                                                                {j_month.map((items) => {
                                                                    return <>
                                                                        {m == items.id
                                                                            ? <option key={items.id} value={items.id} selected>{items.month_n}</option>
                                                                            : <option key={items.id} value={items.id}>{items.month_n}</option>
                                                                        }
                                                                    </>
                                                                })}
                                                            </select> */}
                                                            <input  type="date" className="form-control form-control-sm" placeholder
                                                                aria-controls="dataTable" onChange={(e) => setTo_Date(e.target.value)} />
                                                                
                                                        </label>

                                                        <label>ประเภทหลักสูตร
                                                            <select onChange={(e) => setChange_course(e.target.value)} name="dataTable_length" aria-controls="dataTable" className="px-5 custom-select custom-select-sm form-control form-control-sm">
                                                                <option value="1">สาขาพนักงานการใช้คอมพิวเตอร์(ประมวลผลคำ)</option>
                                                                <option value="2">สาขาพนักงานการใช้คอมพิวเตอร์(ตารางทำการ)</option>
                                                            </select>
                                                        </label>

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
                                                </div>


                                                <div className="col-sm-12 col-md-6">
                                                    {/* Real-time search */}
                                                    <div id="dataTable_filter" className="dataTables_filter" style={{ display: 'flex', justifyContent: "end" }}>
                                                        <label>เลือก: วันที่สอบ
                                                            <input onClick={result_day_month} type="date" className="form-control form-control-sm" placeholder value={selectedDate}
                                                                aria-controls="dataTable" onChange={handleDateChange} />
                                                        </label>
                                                        <label style={{ marginLeft: "16px" }}>เลือก: ห้องสอบ
                                                            <select
                                                                name="dataTable_length"
                                                                aria-controls="dataTable"
                                                                className="custom-select custom-select-sm form-control form-control-sm"
                                                                onChange={(e) => setRoom_exam(e.target.value)}
                                                            >
                                                                {/* <option value={5}>5</option> */}
                                                                <option value={2101}>2101</option>
                                                                <option value={20}>2208</option>
                                                            </select>{" "}
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
                                                                    <th className="sorting_asc" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{ width: '100px' }}>-</th>
                                                                    <th className="sorting_asc" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{ width: '100px' }}>ลำดับที่</th>
                                                                    <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{ width: '150px' }}>หลักสูตร</th>
                                                                    {/* <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{ width: '150px' }}>ประเภทผู้สมัครทดสอบ</th> */}
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
                                                                                <td>
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        id={items.reg_id}
                                                                                        value={items.reg_id}
                                                                                        onChange={handleCheckboxChange}
                                                                                    />
                                                                                </td>
                                                                                <td className="sorting_1">{count++}</td>
                                                                                {/* <td>{show_course.map((res) => {
                                                                                    return <>
                                                                                        {
                                                                                            res.id == items.course
                                                                                                ? <>
                                                                                                    <p>{res.name_th}</p>
                                                                                                </>
                                                                                                : null
                                                                                        }
                                                                                    </>
                                                                                })}</td> */}
                                                                                {/* <td>{items.course_name_th}</td> */}
                                                                                <td>{dynamic_course}</td>
                                                                                {/* <td>{items.candidate}</td> */}
                                                                                <td>{items.prefix} {items.ชื่อนามสกุล}</td>
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