import React from 'react'
import { useState, useEffect } from "react"
import axios from 'axios'

//Components
import Sidebar from '../components/Sidebar'
import Navbar_admin from '../components/Navbar_admin'
import Footer_admin from '../components/Footer_admin'

import { NavLink, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'


function Add_admin() {

    //Access to params's user
    const { id } = useParams()
    const navigate = useNavigate()
    const [single_user, setSingle_user] = useState([])
    const [display_user, setDisplay_user] = useState([])
    const [birthday, setBirthday] = useState(new Date());
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [tel, setTel] = useState('')
    const [username, setUsername] = useState('')
    const [pwd, setPwd] = useState('')
    const [confirm_pwd, setConfirm_Pwd] = useState('')
    const [error, setError] = useState(null)

    //State for Update informations
    const [up_idcard, setUp_idcard] = useState("")

    //For get_provinces and amphures
    const [province_id, setProvince_id] = useState("")
    const [amphure_id, setAmphure_id] = useState("")
    const [district_id, setDistrict_id] = useState("")
    const [show_provinces, setShow_provinces] = useState([])
    const [show_amphures, setShow_amphures] = useState([])
    const [show_district, setShow_district] = useState([])


    //Logout and Clear a localStorage
    const handleLogout = () => {
        localStorage.clear()
        window.location = '/'
    }



    //Get permission from localStorage
    const permission = localStorage.getItem('permission')


    //Update Function
    const Updata_user_info = (reg_id) => {

        if (pwd !== confirm_pwd) {
            alert('รหัสผ่านไม่ตรงกัน กรุณากรอกใหม่อีกครั้ง')

        } else if (confirm_pwd === '') {
            alert('กรุณากรอกข้อมูลให้ครบ')
            return
        } else {
            axios.post("https://server-2-s3v5.onrender.com/add_admin/", {
                name: name,
                lastname: lastname,
                tel: tel,
                username: username,
                pwd: pwd,
                permission: 'admin'
            }).then((res) => {
                console.log(res.data)
                if (res.data.STATUS === 'เพิ่มข้อมูลเสร็จสิ้น') {
                    alert(res.data.STATUS)
                    window.location = '/add_admin'
                } else if (res.data.STATUS === 'ชื่อผู้ใช้มีผู้ใช้งานแล้ว') {
                    alert(res.data.STATUS)
                    window.location = '/add_admin'
                }
                else {
                    console.log(res.data)
                    alert(res.data)
                    return false
                }
            })

        }

    }

    useEffect(() => {
        axios.get(`https://server-2-s3v5.onrender.com/edit_user_info/${id}`).then((res) => {
            setSingle_user(res.data)
        })
        if (!permission) {
            console.log("Please login again")
            alert("กรุณาทำการเข้าสู่ระบบ")
            window.location = '/'
        }
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
                        <Navbar_admin />
                        <div className="container-fluid">
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="card-title" style={{ color: "blue", display: 'flex', justifyContent: 'center' }}>สมัครสมาชิกผู้ดูแล</h2>

                                    <form className="forms-sample">
                                        <div>
                                            <div className='row'>
                                                <div className="col form-group">
                                                    <label htmlFor="exampleInputUsername1">ชื่อ</label>
                                                    <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="exampleInputUsername1" required />
                                                </div>

                                                <div className="col form-group">
                                                    <label htmlFor="exampleInputUsername1">นามสกุล</label>
                                                    <input onChange={(e) => setLastname(e.target.value)} type="text" className="form-control" id="exampleInputUsername1" required />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-5 form-group">
                                                    <label htmlFor="exampleInputUsername1">เบอร์โทรศัพท์</label>
                                                    <input onChange={(e) => setTel(e.target.value)} type="text" className="form-control" id="exampleInputUsername2" required />
                                                </div>
                                                <div className="col-7">

                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className="col form-group">
                                                    <label htmlFor="exampleInputUsername1">ชื่อผู้ใช้งาน</label>
                                                    <input onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" id="exampleInputUsername1" required />
                                                </div>

                                                <div className="col form-group">
                                                    <label htmlFor="exampleInputUsername1">รหัสผ่าน</label>
                                                    <input onChange={(e) => setPwd(e.target.value)} type="password" className="form-control" id="exampleInputUsername1" required />
                                                </div>

                                                <div className="col form-group">
                                                    <label htmlFor="exampleInputUsername1">ยืนยันรหัสผ่าน</label>
                                                    <input onChange={(e) => setConfirm_Pwd(e.target.value)} type="password" className="form-control" id="exampleInputUsername1" required />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <button type="submit" className="btn btn-primary me-2" onClick={Updata_user_info}>เพิ่มข้อมูล</button>


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

export default Add_admin