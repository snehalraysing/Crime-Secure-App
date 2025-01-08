import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthProvider.jsx'
import StationHeadService from '../../Services/StationHeadService.jsx'
import "../../styles/OfficerList.css"
import Navbar from './StationheadNavbar.jsx'

const OfficerList = () => {
    const { auth } = useContext(AuthContext)
    const [officers, setOfficers] = useState([])
    const [deleteStatus, setDeleteStatus] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        console.log("useEffect Invoked....")
        StationHeadService.getAllOfficers(auth.accessToken).then((response) => {
            console.log("Response Received From getAllOfficers() API..", response.data)
            setOfficers(response.data)
        }).catch((error) => {
            console.log("Error from API", error)
        })
    }, [deleteStatus])

    const deleteOfficer = (id) => {
        StationHeadService.deleteOfficer(id, auth.accessToken).then((response) => {
            console.log("Response Received From deleteOfficer() API..", response.data)
            setDeleteStatus(!deleteStatus)
            alert("Officer Removed Successfully.")
            navigate("/officerlist")
        }).catch((error) => {
            console.log("Error From Delete API", error);
            if (error.response && error.response.status === 500 ) {
                alert("This officer is assigned to an incident and cannot be removed.");
            } else {
                alert("An error occurred while removing the officer. Please try again.");
            }
        })
    }

    return (
        <div>
            {console.log("App Rendered...")}
            <Navbar />
            <div className="Officerlist">
                <h2 className='font-extrabold text-gray-800 mb-2 text-center'>Officer List</h2>
                <div className="container">
                    <table className="responsive-table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>DOB</th>
                                <th>Phone No.</th>
                                <th>Address</th>
                                <th>Aadhaar No.</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {officers.map((officer, index) => (
                                <tr key={officer.id}>
                                    <td>{index + 1}</td>
                                    <td>{officer.officerName}</td>
                                    <td>{officer.officerDob}</td>
                                    <td>{officer.officerPhoneNumber}</td>
                                    <td>{officer.officerAddress}</td>
                                    <td>{officer.officerAadhaarNumber}</td>
                                    <td>{officer.officerEmail}</td>
                                    <td>
                                        <button className="col_btn" onClick={() => deleteOfficer(officer.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default OfficerList



































// import React, { useContext, useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import AuthContext from '../../context/AuthProvider.jsx'
// import StationHeadService from '../../Services/StationHeadService.jsx'
// import "../../styles/OfficerList.css"
// import Navbar from './StationheadNavbar.jsx'

// const OfficerList = () => {
//     const {auth} = useContext(AuthContext)

//     const [officers, setOfficers] = useState([])
//     const[deleteStatus, setDeleteStatus] = useState(false)

//     const navigate = useNavigate()

//     useEffect(()=>{
//         console.log("useEffect invoked.....")
//         console.log(auth.accessToken)
//         StationHeadService.getAllOfficers(auth.accessToken).then((response)=>{
//             console.log("Response from getAllOfficers API..", response.data)
//             setOfficers(response.data)
//         }).catch((error)=>{console.log("Error from API", error)})
//     },[deleteStatus])

//     const deleteOfficer = (id) =>{
//         console.log("Officer ID received in Delete Handler: " + id);
//         StationHeadService.deleteOfficer(id,auth.accessToken).then((response)=>{
//             console.log("response from delete Api ", response.data)
//             setDeleteStatus(!deleteStatus)
//             navigate("/officerlist")
//         }).catch((error)=>{
//             console.log("Error From Delete API ", error)
//         })
//     }
//   return (
//     <div>
//         <Navbar/>
//         <div className="Officerlist">
//             <h2 className='font-extrabold text-gray-800 mb-2 text-center'>Officer List</h2>
//             <div className="container">
//                 <ul className="responsive-table">
//                     <li className="table-header">
//                         <div className="head_col-1">Id</div>
//                         <div className="head_col-2">Name</div>
//                         <div className="head_col-3">DOB</div>
//                         <div className="head_col-4">PhoneNo.</div>
//                         <div className="head_col-5">Address</div>
//                         <div className="head_col-6">AadhaarNo.</div>
//                         <div className="head_col-8">Email</div>
//                         {/* <div className="head_col-7">PancardNo.</div> */}
//                         <div className="head_col-9">Action</div>
//                     </li>
//                     {officers.map((officer, index) => (
//                         <li className="table-row">
//                             <div className="col col-1" data-label="officer id">
//                                 {index+1}
//                             </div>
//                             <div className="col col-2" data-label="officerName">
//                                 {officer.officerName}
//                             </div>
//                             <div className="col col-3" data-label="officerDob">
//                                 {officer.officerDob}
//                             </div>
//                             <div className="col col-4" data-label="officerPhoneNumber">
//                                 {officer.officerPhoneNumber}
//                             </div>
//                             <div className="col col-5" data-label="officerAddress">
//                                 {officer.officerAddress}
//                             </div>
//                             <div className="col col-6" data-label="officerAadhaarNumber">
//                                 {officer.officerAadhaarNumber}
//                             </div>
//                             <div className="col col-8" data-label="officerEmail">
//                                 {officer.officerEmail}
//                             </div>
//                             {/* <div className="col col-7" data-label="officerPancard">
//                                 {officer.officerPancard}
//                             </div> */}
//                                 <div className='col-9'>
//                             <button className="col_btn " onClick={() => deleteOfficer(officer.id)} data-label="Payment Status">
//                                     Delete
//                             </button>
//                                 </div>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default OfficerList