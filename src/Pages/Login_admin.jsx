import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import logo from '../assets/img/logo.rus.png'
function Login_admin() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [username_alert, setUsername_alert] = useState(false)
    const [pwd_alert, setPwd_alert] = useState(false)

    const [admin_alert, setAdmin_alert] = useState("")
    const [error, setError] = useState(null)

    const user_data = {
        username: username,
        password: password
    }

    const submit = async (e) => {
        try {
            e.preventDefault()
            if (!username) {
                setUsername_alert(true)
            } else {
                setUsername_alert(false)
            }
            if (!password) {
                setPwd_alert(true)
            } else {
                setPwd_alert(false)
            }
            const res = await axios.post("https://cloud-server-2.vercel.app/admin_login",
                JSON.stringify(user_data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            ).then((res) => {
                if (res.data.Status == "OK") {
                    console.log("Correct")
                    //Select attribute from table on database
                    console.log(res.data.result[0].name)
                    localStorage.setItem("name", res.data.result[0].name)
                    localStorage.setItem("lastname", res.data.result[0].lastname)
                    localStorage.setItem("permission", res.data.result[0].permission)
                    window.location = '/dashboard'
                } else {
                    alert(res.data.Error)
                    console.log(res.data.Error)
                    setAdmin_alert(res.data.error)
                    setError(true)
                }
            })
            res
        } catch (err) {
            console.log(err.response.data)
        }

    }

    useEffect(() => {
        localStorage.clear()
    }, [])


    return (
        <>
            <div className="container">
                {/* Outer Row */}
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                {/* Nested Row within Card Body */}
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900">ยินดีต้อนรับ</h1>
                                                <h5 className='mb-5'>สำหรับเจ้าหน้าที่ศูนย์สอบ</h5>
                                            </div>
                                            <form className="user">
                                                <div className="form-group">
                                                    <input type="text" style={{ color: 'black' }} className="form-control form-control-user" placeholder="กรุณาใส่ Username"
                                                        onChange={(e) => setUsername(e.target.value)} />
                                                </div>
                                                {username_alert
                                                    ? <p style={{ color: "red" }}>กรุณาใส่ Username ให้ถูกต้อง</p>
                                                    : null
                                                }
                                                <div className="form-group">
                                                    <input type="password" style={{ color: 'black' }} className="form-control form-control-user" placeholder="กรุณาใส่ Password"
                                                        onChange={(e) => setPassword(e.target.value)} />
                                                </div>
                                                {pwd_alert
                                                    ? <p style={{ color: "red" }}>กรุณาใส่ Password ให้ถูกต้อง</p>
                                                    : null
                                                }
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox small">
                                                        <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                    </div>
                                                </div>
                                                <button className="btn btn-primary btn-user btn-block" onClick={submit}> เข้าสู่ระบบ </button>
                                                

                                                <hr />

                                            </form>
                                            <div className="text-center">
                                                {/* <a className="small" href="forgot-password.html">Forgot Password?</a> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login_admin