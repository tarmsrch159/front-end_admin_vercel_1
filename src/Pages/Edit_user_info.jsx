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


function Edit_user_info() {

    //Access to params's user
    const { id } = useParams()
    const navigate = useNavigate()
    const [single_user, setSingle_user] = useState([])
    const [display_user, setDisplay_user] = useState([])

    //State for Update informations
    const [up_idcard, setUp_idcard] = useState("")

    //For get_provinces and amphures
    const [province_id, setProvince_id] = useState("")
    const [member_p_id, setMember_p_id] = useState("")
    const [amphure_id, setAmphure_id] = useState("")
    const [district_id, setDistrict_id] = useState("")
    const [show_provinces, setShow_provinces] = useState([])
    const [show_amphures, setShow_amphures] = useState([])
    const [show_district, setShow_district] = useState([])
    const [dyna_province, setDyna_province] = useState('')

    //personal info
    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [name_EN, setName_EN] = useState('')
    const [lastname_EN, setLastname_EN] = useState('')
    const [gender, setGender] = useState("")
    const [dp_province, setDp_province] = useState("")
    const [dp_amphure, setDp_amphure] = useState("")
    const [dp_district, setdp_district] = useState("")
    const [birthday, setBirthday] = useState(new Date());
    const [course, setCourse] = useState('')
    const [candidate, setCandidate] = useState("")
    const [prefix, setPrefix] = useState("")
    const [nationality, setNationality] = useState("")
    const [tel, setTel] = useState("")
    const [address, setAddress] = useState("")
    const [educational, setEducational] = useState("")
    const [branch, setBranch] = useState("")
    const [email, setEmail] = useState("")

    //Logout and Clear a localStorage
    const handleLogout = () => {
        localStorage.clear()
        window.location = '/'
    }

    const [course_id_api, setCourse_id_api] = useState([])

    //Get permission from localStorage
    const permission = localStorage.getItem('permission')


    //Update Function
    const Updata_user_info = (reg_id) => {
        axios.put("https://cloud-server-2.vercel.app/update_user_info/", {
            reg_id: reg_id,
            name: name,
            lastname: lastname,
            name_EN: name_EN,
            lastname_EN: lastname_EN,
            gender: gender,
            province_id: province_id,
            amphure_id: amphure_id,
            district_id: district_id,
            birthday: birthday,
            course: course,
            candidate: candidate,
            prefix: prefix,
            nationality: nationality,
            tel: tel,
            address: address,
            educational: educational,
            branch: branch,
            email: email,
        })
            .then((res) => {
                console.log('Data updated successfully', res.data);
                alert('อัพเดตข้อมูลเรียบร้อย')
                window.location = '/user_info'
            })
            .catch((error) => {
                // Handle error (e.g., show an error message)
                console.error('Error updating data', error);
                alert('กรุณาลองใหม่ในภายหลัง')
            });
    }

    useEffect(() => {
        axios.get(`https://cloud-server-2.vercel.app/edit_user_info/${id}`).then((res) => {
            setSingle_user(res.data)
            setName(res.data[0].name)
            setLastname(res.data[0].lastname)
            setName_EN(res.data[0].name_en)
            setLastname_EN(res.data[0].lastname_en)
            setGender(res.data[0].gender)
            setBirthday(res.data[0].Thaibirthday)
            setCourse(res.data[0].course)
            setCandidate(res.data[0].candidate)
            setPrefix(res.data[0].prefix)
            setNationality(res.data[0].nationality)
            setTel(res.data[0].tel)
            setAddress(res.data[0].address)
            setEducational(res.data[0].educational)
            setBranch(res.data[0].branch)
            setEmail(res.data[0].email)
            setProvince_id(res.data[0].province)
            setAmphure_id(res.data[0].amphure)
            setDistrict_id(res.data[0].district)

        })
        if (!permission) {
            console.log("Please login again")
            alert("กรุณาทำการเข้าสู่ระบบ")
            window.location = '/'
        }
    }, [])

    useEffect(() => {
        const get_provinces = async () => {
            const resprovinces = await fetch("https://cloud-server-2.vercel.app/get_provinces")
            const respro = await resprovinces.json();
            setShow_provinces(await respro)
        }
        get_provinces()
    }, [])

    // useEffect(() => {
    //     const get_amphures = async () => {
    //         const resAmphures = await fetch(`https://cloud-server-2.vercel.app/regular_amphures/`)
    //         const resAmp = await resAmphures.json();
    //         setShow_amphures(await resAmp)
    //     }
    //     get_amphures()

    // }, [province_id])

    // useEffect(() => {
    //     const get_district = async () => {
    //         const resDistrict = await fetch(`https://cloud-server-2.vercel.app/regular_districts/`)
    //         const resDis = await resDistrict.json();
    //         setShow_district(await resDis)
    //     }

    //     get_district()
    // }, [amphure_id])

    useEffect(() => {
        const get_amphures = async () => {
            const resAmphures = await fetch(`https://cloud-server-2.vercel.app/get_amphures/${province_id}`)
            const resAmp = await resAmphures.json();
            setShow_amphures(await resAmp)
        }
        get_amphures()

    }, [province_id])

    useEffect(() => {
        const get_district = async () => {
            const resDistrict = await fetch(`https://cloud-server-2.vercel.app/get_districts/${amphure_id}`)
            const resDis = await resDistrict.json();
            setShow_district(await resDis)
        }

        get_district()
    }, [amphure_id])

    useEffect(() => {
        const course_id = async () => {
            const resCourse_id = await fetch(`https://cloud-server-2.vercel.app/course_name`)
            const resCourse = await resCourse_id.json();
            setCourse_id_api(await resCourse)
        }

        course_id()
    }, [])

    const  handleName_en = (e) => {
        const result_1 = e.target.value.replace(/[^a-z]/gi, '')
        
        setName_EN(result_1)
      }
    
    
    const  handleLastname_en = (e) => {
        const result_2 = e.target.value.replace(/[^a-z]/gi, '')
    
        setLastname_EN(result_2)
    }

    const handleTel = (e) => {
        const result_3 = e.target.value.replace(/\D/g, '')

        setTel(result_3)
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
                                    <h2 className="card-title" style={{ color: "blue", display: 'flex', justifyContent: 'center' }}>จัดการข้อมูลส่วนบุคคล</h2>

                                    {single_user.map((val) => {
                                        return (
                                            <>
                                                <form className="forms-sample">

                                                    <div key={val.id}>
                                                        {/* <div className="form-group mt-3">
                                                            <div className="row">
                                                                <div className="col-3">
                                                                    
                                                                </div>
                                                                <div className="col-9" style={{ display: 'flex', justifyContent: 'end' }}>
                                                                    <div className="" style={{ display: 'flex', flexDirection: 'column' }}>
                                                                        <h5 style={{ fontWeight: 'bold', marginRight: "10px", }} >รูปประจำตัว</h5>

                                                                        <img
                                                                            src={`https://cloud-server-2.vercel.app/images/${val.profile_img}`}
                                                                            className="img-thumbnail"
                                                                            alt="Hollywood Sign on The Hill"
                                                                            width={100}
                                                                            height={100}
                                                                        />
                                                                        <input class="form-control form-control-sm mt-3" id="formFileSm" type="file" />
                                                                    </div>

                                                                </div>
                                                            </div>

                                                        </div> */}

                                                        <div className="form-group">
                                                            <div className="row">
                                                                <div className="col-3">
                                                                    <label htmlFor="exampleInputUsername1">เลขบัตรประจำตัวประชาชน</label>
                                                                    <input className="form-control-plaintext" type="text" placeholder="x-xxxx-xxxxx-xx-x" aria-label="readonly input example" readOnly></input>
                                                                </div>

                                                            </div>

                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputUsername1">หลักสูตร</label>
                                                            <select class="form-select" aria-label="Default select example" onChange={(e) => setCourse(e.target.value)}>
                                                                {course_id_api.map((items) => {
                                                                    return <>
                                                                        
                                                                        {val.course == items.id
                                                                            ? <>
                                                                                <option key={items.id} value={items.id} selected>{items.name_th}</option>
                                                                                

                                                                            </>
                                                                            : <option key={items.id} value={items.id}>{items.name_th}</option>}

                                                                    </>


                                                                })}
                                                            </select>
                                                        </div>


                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputUsername1">ประเภทผู้สมัครสอบ (ทดสอบ)</label>
                                                            <select className="form-select" aria-label="Default select example" onChange={(e) => setCandidate(e.target.value)}>
                                                                <option select value={val.candidate}>{val.candidate}</option>
                                                                <option value="ผู้รับการฝึกจาก กพร.">ผู้รับการฝึกจาก กพร.</option>
                                                                <option value="จากสถานศึกษา">จากสถานศึกษา</option>
                                                                <option value="จากภาครัฐ">จากภาครัฐ</option>
                                                                <option value="จากภาคเอกชน">จากภาคเอกชน</option>
                                                                <option value="บุคคลทั่วไป">บุคคลทั่วไป</option>
                                                            </select>
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputUsername1">คำนำหน้า</label>
                                                            <select className="form-select" aria-label="Default select example" onChange={(e) => setPrefix(e.target.value)}>
                                                                <option select value={val.prefix}>{val.prefix}</option>
                                                                <option value="นาย">นาย</option>
                                                                <option value="นาง">นาง</option>
                                                                <option value="นางสาว">นางสาว</option>
                                                            </select>
                                                        </div>


                                                        <div className='row'>
                                                            <div className="col form-group">
                                                                <label htmlFor="exampleInputUsername1">ชื่อ</label>
                                                                <input type="text" className="form-control" id="exampleInputUsername1" placeholder={val.name} onChange={(e) => setName(e.target.value)} />
                                                            </div>

                                                            <div className="col form-group">
                                                                <label htmlFor="exampleInputUsername1">นามสกุล</label>
                                                                <input type="text" className="form-control" id="exampleInputUsername1" placeholder={val.lastname} onChange={(e) => setLastname(e.target.value)} />
                                                            </div>
                                                        </div>

                                                        <div className='row'>
                                                            <div className="col form-group">
                                                                <label htmlFor="exampleInputUsername1">ชื่อ ภาษาอังกฤษ</label>
                                                                <input type="text" className="form-control" id="exampleInputUsername1" placeholder={val.name_en} value={name_EN} onChange={handleName_en} />
                                                            </div>

                                                            <div className="col form-group">
                                                                <label htmlFor="exampleInputUsername1">นามสกุล ภาษาอังกฤษ</label>
                                                                <input type="text" className="form-control" id="exampleInputUsername1" placeholder={val.lastname_en} value={lastname_EN} onChange={handleLastname_en} />
                                                            </div>
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputUsername1">เพศ</label>
                                                            <select class="form-select" aria-label="Default select example" onChange={(e) => setGender(e.target.value)}>
                                                                <option selected value={val.gender}>{val.gender}</option>
                                                                <option value="ชาย">ชาย</option>
                                                                <option value="หญิง">หญิง</option>
                                                            </select>
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputUsername1">สัญชาติ</label>
                                                            <input type="text" className="form-control" id="exampleInputUsername2" placeholder={val.nationality} onChange={(e) => setNationality(e.target.value)} />
                                                        </div>

                                                        <div className="form-group">
                                                            <div className="row">
                                                                <label htmlFor="exampleInputUsername1">วัน เดือน ปี เกิด</label>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-5">
                                                                    <input type="date" onChange={(e) => setBirthday(e.target.value)} />
                                                                </div>
                                                                <div className="col-7">
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputUsername1">โทรศัพท์</label>
                                                            <input type="text" maxLength={10} className="form-control" id="exampleInputUsername2" placeholder={val.tel} value={tel} onChange={handleTel} />
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputUsername1">E-mail</label>
                                                            <input type="text" className="form-control" id="exampleInputUsername2" placeholder={val.email} onChange={(e) => setEmail(e.target.value)} />
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="floatingTextarea2">ที่อยู่ตามทะเบียนบ้าน/ที่อยู่ตามบัตรประชาชน</label>
                                                            <textarea className="form-control" placeholder={val.address} onChange={(e) => setAddress(e.target.value)} id="floatingTextarea2" style={{ height: '100px' }} defaultValue={""}
                                                            />
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="floatingTextarea2">จังหวัด</label>
                                                            <select class="form-select" aria-label="Default select example" onChange={(e) => setProvince_id(e.target.value)}>
                                                                {show_provinces.map((items) => {
                                                                    return (
                                                                        <>
                                                                            {val.province == items.id
                                                                                ? <option key={items.id} value={items.id} selected>{items.name_th}</option>
                                                                                : <option key={items.id} value={items.id}>{items.name_th}</option>}

                                                                        </>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="floatingTextarea2">อำเภอ</label>
                                                            <select class="form-select" aria-label="Default select example" onChange={(e) => setAmphure_id(e.target.value)}>
                                                                {show_amphures.map((items) => {
                                                                    return (
                                                                        <option key={items.id} value={items.id}>{items.name_th}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="floatingTextarea2">ตำบล</label>
                                                            <select class="form-select" aria-label="Default select example">
                                                                {show_district.map((items) => {
                                                                    return (
                                                                        <option key={items.id} value={items.id}>{items.name_th}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputUsername1">วุฒิการศึกษาสูงสุด</label>
                                                            <select class="form-select" aria-label="Default select example" onChange={(e) => setEducational(e.target.value)}>
                                                                <option select>กรุณาเลือกวุฒิการศึกษาสูงสุด</option>
                                                                <option value="ประถมศึกษา">ประถมศึกษา</option>
                                                                <option value="มัธยมต้น">มัธยมต้น</option>
                                                                <option value="มัธยมปลาย">มัธยมปลาย</option>
                                                                <option value="อนุปริญญา"> อนุปริญญา</option>
                                                                <option value="ปวช.">ปวช.</option>
                                                                <option value="ปวส./ปวท.">ปวส./ปวท.</option>
                                                                <option value="ปริญญาตรีขึ้นไป">ปริญญาตรีขึ้นไป</option>
                                                                <option value="ไม่จบการศึกษา">ไม่จบการศึกษา</option>
                                                            </select>
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputUsername1">สาขา</label>
                                                            <input type="text" className="form-control" id="exampleInputUsername2" placeholder={val.branch} onChange={(e) => setBranch(e.target.value)} />
                                                        </div>

                                                    </div>

                                                </form>
                                                <button type="submit" className="btn btn-primary me-2" onClick={() => Updata_user_info(val.reg_id)}>อัปเดตข้อมูล</button>
                                                

                                            </>
                                        )

                                    })}
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
                            <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Edit_user_info
