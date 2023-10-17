import axios from 'axios'
import { useState, useEffect } from 'react'

//Components
import Sidebar from '../components/Sidebar'
import Navbar_admin from '../components/Navbar_admin'
import Footer_admin from '../components/Footer_admin'

import BounceLoader from 'react-spinners/BounceLoader'
import { NavLink, Link } from 'react-router-dom'
import jsPDF from 'jspdf'
import { font } from '../assets/Fonts/THSarabun-normal'
import { fontBold } from '../assets/Fonts/THSarabun Bold-bold'
import signatureImage from '../assets/img/all_signature.png'

function User_score() {

    const [display_user, setDisplay_user] = useState([])
    const [rt_text, setRT_text] = useState("")
    const [show_permission, setShow_permission] = useState(null)
    const [change_m, setChange_m] = useState(1)
    const [data_status, setData_status] = useState()
    const [m_th, setM_th] = useState("")
    const [change_course, setChange_course] = useState(1)
    const [page, setPage] = useState(1);
    const [pageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [dynamic_course, setDynamic_course] = useState('');
    const [display_score, setDisplay_score] = useState("")

    const today = new Date()
    const m = today.getMonth() + 1
    const y = today.getFullYear()
    const d = today.getDate()
    const current_date = y + '-' + m + '-' + d
    // const [display_course, setDisplay_course] = useState([])

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

    const Export_pdf = () => {
        const doc = new jsPDF()
        var offsetY = 4.797777777777778; //var offsetY is for spacing
        var lineHeight = 12; //var lineHeight is for Spacing
        const imgWidth = 150;
        const imgHeight = 30;
        const x = 35;
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
        doc.text(`ข้อมูลคะแนนสอบประจำเดือน ${dynamic_course}
        วันที่ ${d} ${m_th} ${y} ณ ห้องปฏิบัติการคอมพิวเตอร์ 2101`, width / 2, 10, { align: 'center' })

        const data = display_user.map((val) => [
            val.reg_id,
            val.prefix,
            val.name,
            val.lastname,
            val.kn_score,
            val.profi_score,
            val.sum_score,
            val.pass_fail,
            display_score
        ])

        const contents = {
            startY: 25,
            headStyles: { fillColor: [255, 255, 255], lineWidth: 0.1, font: 'MyFont', fontSize: 12 },
            head: [
                [
                    "รหัสสมัครสอบ",
                    "คำนำหน้า",
                    "ชื่อ",
                    "นามสกุล",
                    "คะแนนภาคความรู้ 30 คะแนน",
                    "คะแนนภาคความสามารถ 70 คะแนน",
                    "รวมคะแนน",

                    "ผลทดสอบเกณฑ์ มหาวิทยาลัย 50%",
                    "ผลทดสอบเกณฑ์ กรมพัฒนาฝีมือแรงงาน 70%",
                ]
            ],
            body: data,
            styles: { font: 'Font', halign: 'center', textColor: [0, 0, 0] },
            bodyStyles: { lineWidth: 0.1 }
        }


        doc.autoTable(contents)
        doc.addImage(signatureImage, 'png', x, y_position, imgWidth, imgHeight)
        doc.setFontSize(12)
        doc.text('เกณฑ์การตัดสินผ่านการทดสอบ ต้องให้คะแนนรวม ไม่ต่ำกว่า 70 คะแนน', text_x, text_y)
        doc.text('ลงชื่อ ผู้ทดสอบมาตรฐานฝีมือแรงงาน', text_x, text_y_2)
        doc.save("ข้อมูลคะแนนสอบประจำเดือน.pdf")
    }



    //Logout and Clear a localStorage
    const handleLogout = () => {
        localStorage.clear()
        window.location = '/'
    }

    const For_user_dont_pay = () => {
        window.location = '/waiting_for_payment'
    }

    const permission = localStorage.getItem('permission')
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
        if (!permission) {
            console.log("Please login again")
            alert("กรุณาทำการเข้าสู่ระบบ")
            window.location = '/'
        }

        //Display user
        const get_users = async () => {
            const get_data_as = await axios.get(`https://server-2-s3v5.onrender.com/user_score/${change_m}/${change_course}?page=${page}&pageSize=${pageSize}`)
            setDisplay_user(await get_data_as.data.data)
            setTotalPages(get_data_as.data.totalPages)
        }
        get_users()

    }, [change_m, data_status, change_course, page, pageSize])


    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        display_user.map((val) => {
            if (val.sum_score < 70) {
                setDisplay_score("ไม่ผ่าน")
            } else {
                setDisplay_score("ผ่าน")
            }

        })
    }, [display_user])

    const [show_course, setShow_course] = useState([])
    useEffect(() => {
        axios.get('https://server-2-s3v5.onrender.com/course_name').then((res) => {
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
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <button onClick={Export_pdf} className="d-none d-sm-inline-block btn btn-sm btn-danger shadow-sm">
                                        <svg style={{ marginRight: "10px" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer-fill" viewBox="0 0 16 16">
                                            <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z" />
                                            <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                                        </svg>
                                        ออกรายงาน
                                    </button>
                                    <h3 className="m-0 font-weight-bold text-primary"></h3>
                                </div>
                                <div className="card-body">
                                    <h3 style={{ textAlign: 'center', fontWeight: "bold", color: "black" }}>จัดการข้อมูลคะแนนสอบประจำเดือนที่ {m_th === '' ? 'มกราคม' : m_th}</h3>
                                    <div className="table-responsive">
                                        <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                                            <div className="row">
                                                <div className="col-sm-12 col-md-6">
                                                    <div className="dataTables_length px-3" id="dataTable_length">
                                                        <label className='mr-3'>ข้อมูลประจำเดือน
                                                            <select onChange={(e) => setChange_m(e.target.value)} name="dataTable_length" aria-controls="dataTable" className="custom-select custom-select-sm form-control form-control-sm">
                                                                <option value="1">มกราคม</option>
                                                                <option value="2">กุมภาพันธ์</option>
                                                                <option value="3">มีนาคม</option>
                                                                <option value="4">เมษายน</option>
                                                                <option value="5">พฤษภาคม</option>
                                                                <option value="6">มิถุนายน</option>
                                                                <option value="7">กรกฎาคม</option>
                                                                <option value="8">สิงหาคม</option>
                                                                <option value="9">กันยายน</option>
                                                                <option value="10">ตุลาคม</option>
                                                                <option value="11">พฤศจิกายน</option>
                                                                <option value="12">ธันวาคม</option>
                                                            </select>

                                                        </label>

                                                        <label>ประเภทหลักสูตร
                                                            <select onChange={(e) => setChange_course(e.target.value)} name="dataTable_length" aria-controls="dataTable" className="px-5 custom-select custom-select-sm form-control form-control-sm">
                                                                <option value="1">สาขาพนักงานการใช้คอมพิวเตอร์(ประมวลผลคำ)</option>
                                                                <option value="2">สาขาพนักงานการใช้คอมพิวเตอร์(ตารางทำการ)</option>
                                                            </select>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="col-sm-12 col-md-6">
                                                    {/* Real-time search */}
                                                    <div id="dataTable_filter" className="dataTables_filter" style={{ display: 'flex', justifyContent: "end" }}>
                                                        <label>ค้นหา: รหัสสอบและชื่อ
                                                            <input type="search" className="form-control form-control-sm" placeholder
                                                                aria-controls="dataTable" onChange={(e) => setRT_text(e.target.value)} />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* There's no data */}
                                            {display_user.length < 1 &&
                                                <div style={{ display: "flex", justifyContent: 'center', alignContent: 'center' }}>
                                                    <button type="button" class="btn btn-danger px-3 mt-5">No Data</button>
                                                </div>
                                            }

                                            {/* show data if data showed */}
                                            {display_user.length > 0 &&
                                                <>

                                                    <div className="row"><div className="col-sm-12">
                                                        <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing={0} role="grid" aria-describedby="dataTable_info" style={{ width: '100%' }}>
                                                            <thead>
                                                                <tr role="row" style={{ textAlign: "center" }}>
                                                                    <th className="sorting_asc" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" >ลำดับ</th>
                                                                    <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending">หลักสูตร</th>
                                                                    <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" >ชื่อ-นามสกุล</th>
                                                                    <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Start date: activate to sort column ascending">คะแนนภาคความรู้</th>
                                                                    <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Start date: activate to sort column ascending" >คะแนนภาคความสามารถ</th>
                                                                    <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Start date: activate to sort column ascending">คะแนนทดสอบรวม</th>
                                                                    <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Start date: activate to sort column ascending" >ผลทดสอบเกณฑ์ มหาวิทยาลัย 50%</th>
                                                                    <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Salary: activate to sort column ascending">ผลทดสอบเกณฑ์ กรมพัฒนาฝีมือแรงงาน 70%</th>
                                                                    <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Salary: activate to sort column ascending">แก้ไข-ลบข้อมูล</th>
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
                                                                                <td>{show_course.map((res) => {
                                                                                    return <>
                                                                                        {
                                                                                            res.id == items.course
                                                                                                ? <p>{res.name_th}</p>
                                                                                                : null
                                                                                        }
                                                                                    </>
                                                                                })}</td>
                                                                                <td>{items.name} {items.lastname}</td>
                                                                                <td>{items.kn_score}</td>
                                                                                <td>{items.profi_score}</td>
                                                                                <td>{items.sum_score}</td>
                                                                                <td>{items.sum_score < 50
                                                                                    ? (
                                                                                        <>
                                                                                            <p href="#" style={{ color: 'red', textDecoration: 'underline' }}>
                                                                                                <span class="text">ไม่ผ่าน</span>
                                                                                            </p>
                                                                                        </>
                                                                                    )
                                                                                    : (
                                                                                        <>
                                                                                            <p href="#" style={{ color: 'green', textDecoration: 'underline' }}>
                                                                                                <span class="text">ผ่าน</span>
                                                                                            </p>
                                                                                        </>
                                                                                    )}</td>
                                                                                {display_score == 'ไม่ผ่าน'
                                                                                    ? <td style={{ color: 'red', textDecoration: 'underline' }}>{display_score}</td>
                                                                                    : <td style={{ color: 'green', textDecoration: 'underline' }}>{display_score}</td>}

                                                                                <td>
                                                                                    <Link to={{ pathname: `/edit_score/${items.reg_id}` }}>
                                                                                        <button className="btn btn-danger">
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                                                            </svg>
                                                                                        </button>
                                                                                    </Link>
                                                                                </td>
                                                                            </tr>
                                                                        </>
                                                                    )
                                                                })}


                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    </div>
                                                </>
                                            }

                                            <div className="row mt-5">
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

export default User_score