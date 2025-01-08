import React, { useContext, useEffect, useState } from 'react'
import "../../styles/Complaints.css"
import CitizenService from '../../Services/CitizenService.jsx'
import AuthContext from '../../context/AuthProvider.jsx'
import { useNavigate } from 'react-router-dom'
import Navbar from './CitizenNavbar.jsx'

function Complaints() {
    const navigate = useNavigate()
    const [complaints, setComplaints] = useState([])
    const { auth } = useContext(AuthContext)

    useEffect(() => {
        console.log("useEffect() Invoked...")
        CitizenService.getAllIncidents(auth.id, auth.accessToken).then(response => {
            console.log("Response Received From getAllIncidents() API..", response.data)
            setComplaints(response.data)
        })
    }, [auth.id, auth.accessToken])

    const handleSubmit = (id) => {
        console.log("Inside View Details Handler...")
        navigate("/details/" + id)
    }

    return (
        <div className="Mycomplaint">
            {console.log("App Rendered..")}
            <Navbar />
            <h2 className='mt-20 font-extrabold text-gray-800 mb-2 text-center'>My Complaints</h2>
            <div className="container">
                <ul className="responsive-table">
                    <li className="table-header">
                        <div>Incident Id</div>
                        <div>Incident type</div>
                        <div>Officer Assigned</div>
                        <div>Incident Status</div>
                        <div>Details</div>
                    </li>
                    {complaints.map((complaint, index) => (
                        <li className="table-row" key={complaint.incidentId}>
                            <div>{index + 1}</div>
                            <div>{complaint.incidentType}</div>
                            <div>
                                {complaint.officers?.length > 0
                                    ? complaint.officers.map((officer) => (
                                          <div key={officer.officerId}>{officer.officerName}</div>
                                      ))
                                    : "No officers assigned"}
                            </div>
                            <div>{complaint.status}</div>
                            <button className="col_btn" onClick={() => handleSubmit(complaint.incidentId)}>
                                View Details
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Complaints









