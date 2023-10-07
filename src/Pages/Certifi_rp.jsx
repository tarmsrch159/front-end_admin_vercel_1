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
import taweesak_signature from '../assets/img/taweesak_signature.png'
import logo_certi from '../assets/img/logo_certi.png'
import profile_1in from '../assets/img/profile_1in.png'
import wutthiphong_signature from '../assets/img/wutthiphong_signature.png'
import Sattarpoom_signature from '../assets/img/Sattarpoom_signature.png'
import Baramee_signature from '../assets/img/Baramee_signature.png'

function Certifi_rp() {

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
    const [single_certi, setSingle_certi] = useState([]);
    const today = new Date()
    const year_thai = today.getFullYear() + 543
    const year_en = today.getFullYear()


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


    const Export_pdf = () => {
        const doc = new jsPDF()

        doc.addFileToVFS("Font.ttf", font)
        doc.addFont("Font.ttf", "Font", "normal")
        doc.setFont("Font")

        doc.addFileToVFS("MyFont.ttf", fontBold)
        doc.addFont("MyFont.ttf", "MyFont", "normal")
        doc.setFont("MyFont")

        let width = doc.internal.pageSize.getWidth()
        doc.text(`ข้อมูลเกียรติบัตรผู้ที่ผ่านการสอบ วันที่ 8 มีนาคม 2566 ณ ห้องปฏิบัติการคอมพิวเตอร์ 2101`, width / 2, 15, { align: 'center' })

        const data = display_user.map((val) => [
            val.reg_id,
            val.prefix,
            val.name,
            val.lastname,
            val.kn_score,
            val.profi_score,
            val.sum_score,
            val.sum_score,
            val.change_reg_day,
            val.pass_fail,
        ])

        const headers = [
            { header: 'รหัสสมัครสอบ', width: 20 },
            { header: 'คำนำหน้า', width: 10 },
            { header: 'ชื่อ', width: 20 },
            { header: 'นามสกุล', width: 20 },
            { header: 'คะแนนภาคความรู้ 30 คะแนน', width: 17 },
            { header: 'คะแนนภาค ความสามารถ 70 คะแนน', width: 19 },
            { header: 'รวมคะแนน', width: 20 },
            { header: 'เลขที่ บท.สพ. Xxxx/2566', width: 20 },
            { header: 'รอบที่สมัคร', width: 20 },
            { header: 'เกณฑ์กรมพัฒนาฯ 70%', width: 20 },
        ]


        const contents = {
            startY: 25,
            headStyles: { fillColor: [255, 255, 255], lineWidth: 0.1, font: 'MyFont', fontSize: 12 },
            theme: 'grid',
            tableWidth: 'auto',
            head: [headers.map(header => header.header)],
            columnStyles: headers.reduce(
                (styles, header, index) => ({
                    ...styles,
                    [index]: { cellWidth: header.width },
                }),
                {}
            ),
            body: data,
            styles: { font: 'Font', halign: 'center', textColor: [0, 0, 0] },
            bodyStyles: { lineWidth: 0.1, }
        }

        doc.autoTable(contents)
        doc.save("ข้อมูลเกียรติบัตรผู้ที่ผ่านการสอบ.pdf")
    }

    console.log(single_certi)
    const Export_certificate = async (reg_id) => {
        const certifi = async () => {
            const certifi_get = await axios.get('https://project-node-js-98ba.onrender.com/get_single_certi/' + reg_id)
            setSingle_certi(await certifi_get.data[0])
        }
        await certifi()
    }

    const get_single_reg = () => {
        const print_certi = async () => {
            const doc = await new jsPDF()
            const imgWidth = 35;
            const imgHeight = 35;
            const pageWidth = doc.internal.pageSize.getWidth()
            const pageHeight = doc.internal.pageSize.getHeight()
            const x = (pageWidth - imgWidth) / 2;
            const y_position = (pageHeight - imgHeight) / 2
            const x_text = pageWidth / 2

            //Add Font th-sarabun
            doc.addFileToVFS("Font.ttf", font)
            doc.addFont("Font.ttf", "Font", "normal")

            doc.addFileToVFS("MyFont.ttf", fontBold)
            doc.addFont("MyFont.ttf", "MyFont", "normal")



            //Page1
            doc.addImage(logo_certi, 'png', x, 15, imgWidth, imgHeight)
            doc.setFont("MyFont")
            const fontSize1 = 20
            doc.setFontSize(fontSize1)
            doc.text('หนังสือรับรองว่าเป็นผู้ผ่านการทดสอบมาตรฐานฝีมือแรงงานแห่งชาติ', x_text, 58, { align: "center" })

            doc.setFont("Font")
            const fontSize2 = 18
            doc.setFontSize(fontSize2)
            doc.text('National Skill Standard Assessment Certificate', x_text, 65, { align: "center" })


            const x_1 = 82;
            let y_1 = 75;
            const text = [
                { content: 'เลขที่ ', fontSize: 16, Font: 'MyFont' },
                { content: `(No.) บท.สพ ${single_certi.book_id}/${year_thai} `, fontSize: 16, Font: 'Font' },
            ];
            // Initialize the current X position
            let currentX = x_1;
            for (const segment of text) {
                const { content, fontSize, Font } = segment;
                if (Font) {
                    doc.setFont(Font);
                }
                // Set the font size for this segment
                if (fontSize) {
                    doc.setFontSize(fontSize);
                }
                const textWidth = doc.getTextWidth(content);
                // Add the segment to the PDF
                doc.text(content, currentX, y_1);
                currentX += textWidth

            }


            doc.setFont("MyFont")
            const fontSize3 = 16
            doc.setFontSize(fontSize3)
            doc.text('หนังสือรับรองฉบับนี้ให้ไว้เพื่อแสดงว่า', x_text, 82, { align: "center" })

            doc.setFont("Font")
            const fontSize4 = 16
            doc.setFontSize(fontSize4)
            doc.text('This is to certify that', x_text, 87, { align: "center" })

            doc.setFont("MyFont")
            const fontSize5 = 20
            doc.setFontSize(fontSize5)
            doc.text(`${single_certi.prefix} ${single_certi.name} ${single_certi.lastname}`, x_text, 97, { align: "center" })

            doc.setFont("Font")
            const fontSize6 = 16
            doc.setFontSize(fontSize6)
            doc.text(`${single_certi.name_en} ${single_certi.lastname_en}`, x_text, 104, { align: "center" })

            doc.setFont("MyFont")
            const fontSize7 = 16
            doc.setFontSize(fontSize7)
            doc.text(`ได้ผ่านการทดสอบมาตรฐานฝีมือแรงงานแห่งชาติ`, x_text, 115, { align: "center" })

            doc.setFont("Font")
            const fontSize8 = 16
            doc.setFontSize(fontSize8)
            doc.text(`has passed the National Skill Standard Test`, x_text, 120, { align: "center" })

            doc.setFont("MyFont")
            const fontSize9 = 16
            doc.setFontSize(fontSize9)
            doc.text(`ตามพระราชบัญญัติส่งเสริมการพัฒนาฝีมือแรงงาน พ.ศ. 2545`, x_text, 128, { align: "center" })

            doc.setFont("Font")
            const fontSize10 = 16
            doc.setFontSize(fontSize10)
            doc.text(`according to the Skill Development Promotion Act, B.E. 2545`, x_text, 133, { align: "center" })

            doc.setFont("MyFont")
            const fontSize11 = 16
            doc.setFontSize(fontSize11)
            doc.text(`ในสาขาอาชีพ ${single_certi.branch} ${single_certi.course_name_th}`, 15, 140, { align: "left" })

            doc.setFont("Font")
            const fontSize12 = 16
            doc.setFontSize(fontSize12)
            doc.text(`On Electric, ${single_certi.course_name_en}`, 15, 146, { align: "left" })

            doc.setFont("MyFont")
            const fontSize13 = 16
            doc.setFontSize(fontSize13)
            doc.text(`จากศูนย์ทดสอบมาตรฐานฝีมือแรงงาน โดย คณะบริหารธุรกิจและเทคโนโลยีสารสนเทศ มทร.สุวรรณภูมิ ศูนย์สุพรรณบุรี`, 15, 153, { align: "left" })

            doc.setFont("Font")
            const fontSize14 = 16
            doc.setFontSize(fontSize14)
            doc.text(`from Department of Skill Development by Faculty of Business Administration and Information `, 15, 159, { align: "left" })

            doc.setFont("Font")
            doc.setFontSize(fontSize14)
            doc.text(`Technology, RMUTSB Skill Standard Testing Center `, 15, 165, { align: "left" })

            doc.setFont("MyFont")
            const fontSize15 = 16
            doc.setFontSize(fontSize15)
            doc.text([`ซึ่งได้รับอนุญาตจากอธิบดีกรมพัฒนาฝีมือแรงงาน กระทรวงแรงงาน ในฐานะนายทะเบียน` ],
                15, 172, { align: "left"})

            doc.setFont("Font")
            const fontSize16 = 16
            doc.setFontSize(fontSize16)
            doc.text(`authorized by Director General of the Department of Skill Development, Ministry of labour, as a registrar`,
                15, 178, { align: "left" })

            doc.setFont("MyFont")
            const fontSize17 = 16
            doc.setFontSize(fontSize17)
            doc.text(`ตามใบอนุญาตเลขที่       สพ.๐๐๐๑.๑/๒๕๖๖   ลงวันที่   31 มกราคม พ.ศ. ${year_thai}`,
                15, 184, { align: "left" })

            doc.setFont("Font")
            const fontSize18 = 16
            doc.setFontSize(fontSize18)
            doc.text(`under license number  สพ.0001.1/2566      dated    31 January B.E. ${year_thai} (${year_en})`,
                15, 190, { align: "left" })

            doc.setFont("MyFont")
            const fontSize19 = 16
            doc.setFontSize(fontSize19)
            doc.text(`ให้ไว้ ณ วันที่   9 มีนาคม พ.ศ. 2566`,
                x_text, 198, { align: "center" })

            doc.setFont("Font")
            const fontSize20 = 16
            doc.setFontSize(fontSize20)
            doc.text(`given on   9 March B.E.2566 (${year_en})`,
                x_text, 204, { align: "center" })

            doc.addImage(taweesak_signature, 'png', 110, 215, 20, 15)

            doc.setFont("MyFont")
            const fontSize21 = 16
            doc.setFontSize(fontSize21)
            doc.text(`(นายทวีศักดิ์  คงตุก)`,
                120, 235, { align: "center" })

            doc.setFont("Font")
            const fontSize22 = 16
            doc.setFontSize(fontSize22)
            doc.text(`Thaweesak khongtuk`,
                120, 241, { align: "center" })

            doc.setFont("MyFont")
            const fontSize23 = 16
            doc.setFontSize(fontSize23)
            doc.text(`ผู้ดำเนินการทดสอบมาตรฐานฝีมือแรงงาน`,
                120, 247.5, { align: "center" })

            doc.setFont("Font")
            const fontSize24 = 16
            doc.setFontSize(fontSize24)
            doc.text(`Skill Standard Testing Provider`,
                120, 253, { align: "center" })


            doc.addImage(`https://project-node-js-98ba.onrender.com/images/${single_certi.profile_img}`, 'JPEG', 41, 232, 25, 30)
            doc.addImage(`https://project-node-js-98ba.onrender.com/${single_certi.profile_img}`, 'PNG', 41, 232, 25, 30)

            doc.setFont("Font")
            const fontSize25 = 16
            doc.setFontSize(fontSize25)
            doc.text(`...........................................`,
                53, 265, { align: "center" })

            doc.setFont("Font")
            const fontSize26 = 16
            doc.setFontSize(fontSize26)
            doc.text(`ผู้ผ่านการทดสอบมาตรฐานฝีมือแรงงาน`,
                53, 270, { align: "center" })

            doc.setFont("Font")
            const fontSize27 = 16
            doc.setFontSize(fontSize27)
            doc.text(`Examiner`,
                53, 275, { align: "center" })




            //Page2
            doc.addPage()
            doc.setFont("MyFont")
            const fontSize28 = 16
            doc.setFontSize(fontSize28)
            doc.text(`คะแนนการทดสอบ`,50, 20, { align: "center" })

            doc.setFont("Font")
            const fontSize29 = 16
            doc.setFontSize(fontSize29)
            doc.text(`(Total Score)`,50, 26, { align: "center" })

            doc.setFont("MyFont")
            const fontSize30 = 16
            doc.setFontSize(fontSize30)
            doc.text(`${single_certi.sum_score}%`,50, 37, { align: "center" })

            doc.setFont("Font")
            const fontSize31 = 16
            doc.setFontSize(fontSize31)
            doc.text(`.................................`,50, 38, { align: "center" })

            doc.setFont("MyFont")
            const fontSize32 = 16
            doc.setFontSize(fontSize32)
            doc.text('ภาคความรู้', x_text, 20, { align: "center" })

            doc.setFont("Font")
            const fontSize33 = 16
            doc.setFontSize(fontSize33)
            doc.text('(Theoretical)', x_text, 26, { align: "center" })

            doc.setFont("MyFont")
            const fontSize34 = 16
            doc.setFontSize(fontSize34)
            doc.text(`${single_certi.kn_score}%`, x_text, 37, { align: "center" })

            doc.setFont("Font")
            const fontSize35 = 16
            doc.setFontSize(fontSize35)
            doc.text('.................................', x_text, 38, { align: "center" })

            doc.setFont("MyFont")
            const fontSize36 = 16
            doc.setFontSize(fontSize36)
            doc.text('ภาคความสามารถ', 155, 20, { align: "center" })

            doc.setFont("Font")
            const fontSize37 = 16
            doc.setFontSize(fontSize37)
            doc.text('(Practical)', 155, 26, { align: "center" })

            doc.setFont("MyFont")
            const fontSize38 = 16
            doc.setFontSize(fontSize38)
            doc.text(`${single_certi.profi_score}%`, 155, 37, { align: "center" })

            doc.setFont("Font")
            const fontSize39 = 16
            doc.setFontSize(fontSize39)
            doc.text('.................................', 155, 38, { align: "center" })

            doc.setFont("MyFont")
            const fontSize40 = 16
            doc.setFontSize(fontSize40)
            doc.text(`ชื่อผู้ทดสอบมาตรฐานฝีมือแรงงาน`,50, 60, { align: "center" })

            doc.setFont("Font")
            const fontSize41 = 16
            doc.setFontSize(fontSize41)
            doc.text(`(Examiner)`,50, 67, { align: "center" })
            


            //เลขที่ขึ้นทะเบียน
            doc.setFont("MyFont")
            const fontSize42 = 16
            doc.setFontSize(fontSize42)
            doc.text(`เลขที่ขึ้นทะเบียน`,131, 60, { align: "center" })

            doc.setFont("Font")
            const fontSize43 = 16
            doc.setFontSize(fontSize43)
            doc.text(`(Examiner No.)`,131, 67, { align: "center" })

            doc.setFont("Font")
            doc.setFontSize(16)
            doc.text(`มฝร-1-4-22-008-0012-59`,132, 80, { align: "center" })

            doc.setFont("Font")
            doc.setFontSize(16)
            doc.text(`.................................................`,131, 80.8, { align: "center" })

            doc.setFont("Font")
            doc.setFontSize(16)
            doc.text(`มฝร-1-4-22-008-0013-59`,132, 95, { align: "center" })

            doc.setFont("Font")
            doc.setFontSize(16)
            doc.text(`.................................................`,131, 95.8, { align: "center" })

            doc.setFont("Font")
            doc.setFontSize(16)
            doc.text(`มฝร-1-4-22-008-0014-59`,132, 110, { align: "center" })

            doc.setFont("Font")
            doc.setFontSize(16)
            doc.text(`.................................................`,131, 110.8, { align: "center" })


            //ลง Signature
            doc.setFont("MyFont")
            const fontSize44 = 16
            doc.setFontSize(fontSize44)
            doc.text(`ลงชื่อ`,175, 60, { align: "center" })

            doc.setFont("Font")
            const fontSize45 = 16
            doc.setFontSize(fontSize45)
            doc.text(`(Signature)`,175, 67, { align: "center" })

            doc.addImage(wutthiphong_signature, 170, 72, 10, 10)

            doc.setFont("Font")
            doc.setFontSize(16)
            doc.text(`...............`,175, 80.8, { align: "center" })

            doc.addImage(Sattarpoom_signature, 170, 87, 10, 10)

            doc.setFont("Font")
            doc.setFontSize(16)
            doc.text(`...............`,175, 95.8, { align: "center" })

            doc.addImage(Baramee_signature, 166, 102, 20, 10)

            doc.setFont("Font")
            doc.setFontSize(16)
            doc.text(`...............`,175, 110.8, { align: "center" })


            const x_2 = 25;
            let y_2 = 80;
            const text_1 = [
                { content: '1.      ', fontSize: 16, Font: 'Font' },
                { content: `นายวุฒิพงษ์  เขื่อนดิน`, fontSize: 16, Font: 'Font' },
            
            ];
            // Initialize the current X position
            let currentX_2 = x_2;
            for (const segment of text_1) {
                const { content, fontSize, Font } = segment;
                if (Font) {
                    doc.setFont(Font);
                }
                // Set the font size for this segment
                if (fontSize) {
                    doc.setFontSize(fontSize);
                }
                const textWidth = doc.getTextWidth(content);
                // Add the segment to the PDF
                doc.text(content, currentX_2, y_2,);
                currentX_2 += textWidth
            }

            doc.setFont("Font")
            const fontSize46 = 16
            doc.setFontSize(fontSize46)
            doc.text(`..........................................................................`,64, 80.8, { align: "center" })

            
            doc.setFont("Font")
            doc.setFontSize(16)
            doc.text(`Mr. Wutthiphong Khuandin`,58, 88, { align: "center" })

            doc.setFont("Font")
            const fontSize47 = 16
            doc.setFontSize(fontSize47)
            doc.text(`..........................................................................`,64, 88.8, { align: "center" })

            const x_3 = 25;
            let y_3 = 95;
            const text_2 = [
                { content: '2.      ', fontSize: 16, Font: 'Font' },
                { content: `นายสัตถาภูมิ  ไทยพานิช`, fontSize: 16, Font: 'Font' },
            
            ];
            // Initialize the current X position
            let currentX_3 = x_3;
            for (const segment of text_2) {
                const { content, fontSize, Font } = segment;
                if (Font) {
                    doc.setFont(Font);
                }
                // Set the font size for this segment
                if (fontSize) {
                    doc.setFontSize(fontSize);
                }
                const textWidth = doc.getTextWidth(content);
                // Add the segment to the PDF
                doc.text(content, currentX_3, y_3,);
                currentX_3 += textWidth
            }

            doc.setFont("Font")
            const fontSize48 = 16
            doc.setFontSize(fontSize48)
            doc.text(`..........................................................................`,64, 95.8, { align: "center" })

            doc.setFont("Font")
            doc.setFontSize(16)
            doc.text(`Mr.Sattarpoom Thaiparnit`,57, 103, { align: "center" })

            doc.setFont("Font")
            const fontSize49 = 16
            doc.setFontSize(fontSize49)
            doc.text(`..........................................................................`,64, 103.8, { align: "center" })

            const x_4 = 25;
            let y_4 = 110;
            const text_3 = [
                { content: '3.      ', fontSize: 16, Font: 'Font' },
                { content: `นายบารมี  โอสธีรกุล  เขื่อนดิน`, fontSize: 16, Font: 'Font' },
            
            ];
            // Initialize the current X position
            let currentX_4 = x_4;
            for (const segment of text_3) {
                const { content, fontSize, Font } = segment;
                if (Font) {
                    doc.setFont(Font);
                }
                // Set the font size for this segment
                if (fontSize) {
                    doc.setFontSize(fontSize);
                }
                const textWidth = doc.getTextWidth(content);
                // Add the segment to the PDF
                doc.text(content, currentX_4, y_4,);
                currentX_4 += textWidth
            }

            doc.setFont("Font")
            const fontSize50 = 16
            doc.setFontSize(fontSize50)
            doc.text(`..........................................................................`,64, 110.8, { align: "center" })

            doc.setFont("Font")
            const fontSize51 = 16
            doc.setFontSize(fontSize51)
            doc.text(`Mr.Baramee  Osateerakul`,57, 118, { align: "center" })

            doc.setFont("Font")
            const fontSize52 = 16
            doc.setFontSize(fontSize52)
            doc.text(`..........................................................................`,64, 118.8, { align: "center" })

            doc.save(await "ข้อมูลเกียรติบัตรผู้ที่ผ่านการสอบ.pdf")

        }
        print_certi()
    }

    const permission = localStorage.getItem('permission')
    useEffect(() => {
        { change_m === '1' ? setM_th("มกราคม") : null }
        { change_m === '2' ? setM_th("กุมภาพันธ์") : null }
        { change_m === '3' ? setM_th("มีนาคม") : null }
        { change_m === '4' ? setM_th("เมษายน") : null }
        { change_m === '5' ? setM_th("พฤษภาคม") : null }
        { change_m === '6' ? setM_th("มิถุนายน") : null }
        { change_m === '7' ? setM_th("กรกฎาคม") : null }
        { change_m === '8' ? setM_th("สิงหาคม") : null }
        { change_m === '9' ? setM_th("กันยายน") : null }
        { change_m === '10' ? setM_th("ตุลาคม") : null }
        { change_m === '11' ? setM_th("พฤศจิกายน") : null }
        { change_m === '12' ? setM_th("ธันวาคม") : null }
        //Check permission
        if (!permission) {
            console.log("Please login again")
            alert("กรุณาทำการเข้าสู่ระบบ")
            window.location = '/'
        }

        //Display user
        const get_users = async () => {
            const get_data_as = await axios.get(`https://project-node-js-98ba.onrender.com/certifi_rp/${change_m}/${change_course}?page=${page}&pageSize=${pageSize}`)
            setDisplay_user(await get_data_as.data.data)
            setTotalPages(get_data_as.data.totalPages)
        }
        get_users()



        console.log(single_certi)
    }, [change_m, data_status, change_course, page, pageSize, single_certi])

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    console.log(display_user)

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
                                    <h3 style={{ textAlign: 'center', fontWeight: "bold", color: "black" }}>รายงานข้อมูลเกียรติบัตรผู้ที่ผ่านการสอบ ประจำเดือน {m_th === '' ? 'มกราคม' : m_th}</h3>

                                    <div className="table-responsive">
                                        <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                                            <div className="row">
                                                <div className="col-sm-12 col-md-6">
                                                    <div className="dataTables_length" id="dataTable_length">
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

                                                    <div className="row">
                                                        <div className="col-sm-12 table-responsive">
                                                            <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing={0} role="grid" aria-describedby="dataTable_info" style={{ width: '100%' }}>
                                                                <thead>
                                                                    <tr role="row" style={{ textAlign: "center" }}>
                                                                        <th className="sorting_asc" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{ width: '73.2px' }}>ลำดับ</th>
                                                                        <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{ width: '800px' }}>หลักสูตร</th>
                                                                        <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{ width: '800px' }}>ชื่อ-นามสกุล</th>
                                                                        <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Start date: activate to sort column ascending" style={{ width: '200px' }}>คะแนนภาคความรู้</th>
                                                                        <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Start date: activate to sort column ascending" style={{ width: '200px' }}>คะแนนภาคความสามารถ</th>
                                                                        <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Start date: activate to sort column ascending" style={{ width: '200px' }}>คะแนนทดสอบรวม</th>
                                                                        <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Start date: activate to sort column ascending" style={{ width: '200px' }}>ผลการทดสอบ</th>
                                                                        <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Salary: activate to sort column ascending" style={{ width: '800px' }}>เลขที่
                                                                            บท.สพ. Xxxx/2566</th>
                                                                        <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Salary: activate to sort column ascending" style={{ width: '200px' }}>รอบที่สมัคร</th>
                                                                        <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Salary: activate to sort column ascending" style={{ width: '800px' }}>เกณฑ์กรมพัฒนาฯ 70%</th>
                                                                        <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Salary: activate to sort column ascending" style={{ width: '800px' }}>ออกวุฒิบัตร</th>
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
                                                                                    <td>{items.course_name_th}</td>
                                                                                    <td>{items.name} {items.lastname}</td>
                                                                                    <td>{items.kn_score}</td>
                                                                                    <td>{items.profi_score}</td>
                                                                                    <td>{items.sum_score}</td>
                                                                                    <td style={{ color: 'green', textDecoration: 'underline' }}>{items.pass_fail}</td>
                                                                                    <td>{items.book_id}</td>
                                                                                    <td>{toThaiDateString(items.change_reg_day)}</td>
                                                                                    <td style={{ color: 'green', textDecoration: 'underline' }}> รับวุฒิบัตร
                                                                                    </td>
                                                                                    <td>{/* Button trigger modal */}
                                                                                        <button
                                                                                            type="button"
                                                                                            className="btn btn-primary"
                                                                                            data-bs-toggle="modal"
                                                                                            data-bs-target="#exampleModal"
                                                                                            onClick={() => Export_certificate(items.reg_id)}
                                                                                        >
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer-fill" viewBox="0 0 16 16">
                                                                                                <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z" />
                                                                                                <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                                                                                            </svg>
                                                                                        </button>
                                                                                        {/* Modal */}
                                                                                        <div
                                                                                            className="modal fade"
                                                                                            id="exampleModal"
                                                                                            tabIndex={-1}
                                                                                            aria-labelledby="exampleModalLabel"
                                                                                            aria-hidden="true"
                                                                                        >
                                                                                            <div className="modal-dialog">
                                                                                                <div className="modal-content">
                                                                                                    <div className="modal-header">
                                                                                                        <h1 className="modal-title fs-5" id="exampleModalLabel">

                                                                                                        </h1>
                                                                                                        <button
                                                                                                            type="button"
                                                                                                            className="btn-close"
                                                                                                            data-bs-dismiss="modal"
                                                                                                            aria-label="Close"
                                                                                                        />
                                                                                                    </div>
                                                                                                    <div className="modal-body">
                                                                                                        <h5>ต้องการออกรายงานเกียรติบัตรใช่หรือไม่</h5>
                                                                                                    </div>
                                                                                                    <div className="modal-footer">
                                                                                                        <button
                                                                                                            type="button"
                                                                                                            className="btn btn-secondary"
                                                                                                            data-bs-dismiss="modal"
                                                                                                        >
                                                                                                            ยกเลิก
                                                                                                        </button>
                                                                                                        <button type="button" onClick={get_single_reg} className="btn btn-primary" data-bs-dismiss="modal">
                                                                                                            ยืนยัน
                                                                                                        </button>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
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

export default Certifi_rp