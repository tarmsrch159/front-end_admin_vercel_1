import React from 'react'
import { useState, useEffect } from "react"
import axios from 'axios'

import Sidebar from '../components/Sidebar'
import Navbar_admin from '../components/Navbar_admin'
import Footer_admin from '../components/Footer_admin'


import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
function Edit_score() {

    //Access to params's user
    const { id } = useParams()
    const [single_user, setSingle_user] = useState([])
    const [display_user, setDisplay_user] = useState([])
    const [course, setCourse] = useState("")
    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [reg_id, setReg_id] = useState("")


    let [kn_score, setKn_score] = useState(0)
    let [profi_score, setProfi_score] = useState(0)
    let [total_score, setTotal_score] = useState(0)
    const [pass_fail, setPass_fail] = useState("")


    const change_knscore = (e) => {
        setKn_score(+e.target.value)
    }

    const change_profiscore = (e) => {
        setProfi_score(+e.target.value)
    }


    //State for Update informations
    const [up_idcard, setUp_idcard] = useState("")



    //Logout and Clear a localStorage
    const handleLogout = () => {
        localStorage.clear()
        window.location = '/'
    }



    //Get permission from localStorage
    const permission = localStorage.getItem('permission')


    //Update Function
    var insert_score = async () => {
        if (confirm("ต้องการกรอกคะแนนใช่หรือไม่")) {
            axios.put("https://cloud-server-2-again.vercel.app/sum_score", {
                reg_id: reg_id,
                kn_score: kn_score,
                profi_score: profi_score,
                total_score: total_score,
                pass_fail: pass_fail
            }).then((res) => {
                if (res.data.status === "กรุณากรอกคะแนนให้ถูกต้อง") {
                    alert("กรุณากรอกคะแนนให้ถูกต้อง")
                }else if(res.data.status === "true"){
                    alert("เพิ่มคะแนนเรียบร้อย")
                    window.location = '/user_score'
                } 
                else {
                    alert("กรุณาลองใหม่อีกครั้ง")
                    return false
                }
            })
        }
    }

    useEffect(() => {
        axios.get(`https://cloud-server-2-again.vercel.app/edit_user_info/${id}`).then((res) => {
            setSingle_user(res.data)
            setReg_id(res.data[0].reg_id)
            setName(res.data[0].name)
            setLastname(res.data[0].lastname)
            setCourse(res.data[0].course)
            
        })
        if (!permission) {
            console.log("Please login again")
            alert("กรุณาทำการเข้าสู่ระบบ")
            window.location = '/'
        }

        setTotal_score(kn_score + profi_score)
        if (total_score >= 70) {
            setPass_fail("ผ่าน")
        } else {
            setPass_fail("ไม่ผ่าน")
        }
    }, [kn_score, profi_score, total_score, pass_fail])

    const [show_course, setShow_course] = useState([])
    useEffect(() => {
        axios.get('https://cloud-server-2-again.vercel.app/course_name').then((res) => {
            setShow_course(res.data)
        })
    }, [])

    const handleKn_score = (e) => {
        const result_3 = +e.target.value.replace(/\D/g, '')

        setKn_score(result_3)
    }

    const handleProfi_score = (e) => {
        const result_4 = +e.target.value.replace(/\D/g, '')

        setProfi_score(result_4)
    }

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
                        <Navbar_admin />
                        <div className="container-fluid">
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="card-title" style={{ color: "black", display: 'flex', justifyContent: 'center' }}>ข้อมูลผู้สมัครสอบ</h3>

                                    <form className="forms-sample">
                                        {single_user.map((val) => {
                                            return (
                                                <>
                                                    <div key={val.reg_id}>
                                                        <div className="row">
                                                            <div className="col-5 form-group">
                                                                <label htmlFor="exampleInputUsername1" style={{ color: 'black' }}>รหัสสอบ</label>
                                                                <input className="form-control" type="text" value={val.reg_id} aria-label="input example"
                                                                ></input>
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-5 form-group">
                                                                <label htmlFor="exampleInputUsername1" style={{ color: 'black' }}>หลักสูตร</label>
                                                                {show_course.map((res) => {
                                                                    return <>
                                                                        {
                                                                            res.id == val.course
                                                                                ? <input className="form-control" type="text" value={res.name_th} aria-label="input example"
                                                                                ></input>
                                                                                : null
                                                                        }
                                                                    </>
                                                                })}

                                                            </div>
                                                        </div>



                                                        <div className='row'>
                                                            <div className="col-5 form-group">
                                                                <label htmlFor="exampleInputUsername1" style={{ color: 'black' }}>ชื่อ</label>
                                                                <input type="text" className="form-control" id="exampleInputUsername1" value={val.name} />
                                                            </div>

                                                            <div className="col-5 form-group">
                                                                <label htmlFor="exampleInputUsername1" style={{ color: 'black' }}>นามสกุล</label>
                                                                <input type="text" className="form-control" id="exampleInputUsername1" value={val.lastname} />
                                                            </div>
                                                        </div>

                                                        <hr />
                                                        <h2 style={{ color: "black", textAlign: "center", marginBottom: '50px', marginTop: "30px" }}>จัดการข้อมูลคะแนน</h2>
                                                        <div className='row'>
                                                            <div className="col-5 form-group">
                                                                <label htmlFor="exampleInputUsername1" style={{ color: 'black', fontSize: '18px', }}>คะแนนภาคความรู้ 30 คะแนน</label>
                                                                <input maxLength={3} type="text" className="form-control" id="exampleInputUsername1" placeholder={val.kn_score}
                                                                     onChange={change_knscore} />
                                                            </div>

                                                            <div className="col-5 form-group">
                                                                <label htmlFor="exampleInputUsername1" style={{ color: 'black', fontSize: '18px', }}>
                                                                    คะแนนภาคความสามารถ 70 คะแนน</label>
                                                                <input maxLength={3} type="text" className="form-control" id="exampleInputUsername1"
                                                                     placeholder={val.profi_score} onChange={change_profiscore}  />
                                                            </div>
                                                        </div>
                                                    </div>


                                                </>
                                            )
                                        })}



                                    </form>
                                    <div className='mt-5'>
                                        <button type="submit" className="btn btn-primary me-2" onClick={insert_score} >ยืนยัน</button>
                                        <Link to={'/user_score'}>
                                            <button className="btn btn-light ml-3">กลับหน้าหลัก</button>
                                        </Link>
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

export default Edit_score