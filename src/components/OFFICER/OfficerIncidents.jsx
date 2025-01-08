import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider.jsx'; // Assuming you have AuthContext to manage user auth
import OfficerService from '../../Services/OfficerService.jsx'; // Importing the OfficerService class
import '../../styles/OfficerIncidents.css'
import Navbar from './OfficerNavbar.jsx';

const OfficerIncidents = () => {
  console.log("Inside OfficerIncidents() Handler... ")
  const [assignedIncidents, setAssignedIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth } = useContext(AuthContext); // Assuming auth context is available
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect() Invoked..")
    // Function to fetch incidents
    const fetchIncidents = async () => {
      try {
        const response = await OfficerService.getAssignedIncidents(auth.accessToken); // Using the service method
        console.log("Response Received From getAssignedIncidents() API..", response.data)
        setAssignedIncidents(response.data); // Setting the incidents data in state
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setError(error.message); // Handle error
        setLoading(false);
      }
    };

    // Fetch incidents on component mount
    fetchIncidents();
  }, [auth.accessToken]); // Dependency array includes accessToken

  // If still loading, show loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there is an error, display it
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="officerincidents">
      {console.log("App rendered..")}
      <Navbar/>
      <h2 className="font-extrabold text-gray-800 mb-4 text-center">Assigned Incidents</h2>

      <div className="container">
        <ul className="responsive-table">
          <li className="table-header">
            <div className="head_col-1">Incident Id</div>
            <div className="head_col-2">Type</div>
            <div className="head_col-3">Details</div>
            <div className="head_col-4">Status</div>
          </li>
          {assignedIncidents.map((incident, key) => (
            <li key={key} className="table-row">
              <div className="col col-1" data-label="Incident id">
                {incident.incidentId}
              </div>
              <div className="col col-2" data-label="Incident Type">
                {incident.incidentType}
              </div>
              <div className="col col-3" data-label="Details">
                {incident.incidentDetails}
              </div>
              <div className="col col-4" data-label="Status">
                {incident.status}
              </div>
            </li>
          ))}
        </ul>

        {/* Button group for navigation */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => navigate('/updatestatustoclosed')}
            className="bg-blue-500 text-white font-semibold py-2 px-6 rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:bg-blue-700 transition duration-150">
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfficerIncidents;
















// import React, { useContext, useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import AuthContext from '../context/AuthProvider'
// import OfficerService from '../Services/OfficerService'

// const OfficerIncidents = () => {
//     const [assignedIncidents, setAssignedIncidents] = useState([])
//     const {auth} = useContext(AuthContext)
 
//     useEffect(()=>{
//         console.log("useEffect invoked.....")
//         OfficerService.getAssignedIncidents(auth.token).then((response)=>{
//             console.log("Response received from getAssignedIncidents() API...", response.data)
//             setAssignedIncidents(response.data)
//         }).catch((error)=>{
//             console.log("Error Received From getAssignedIncidents() API...", error)
//         })
//     },[])
//   return (
//     <div className="officerincidents">
//             <h2 className="font-extrabold text-gray-800 mb-4 text-center">Assigned Incidents</h2>
//             <div className="container">
//                 <ul className="responsive-table">
//                     <li className="table-header">
//                         <div className="head_col-1">Incident Id</div>
//                         <div className="head_col-2">Type</div>
//                         <div className="head_col-3">Details</div>
//                         <div className="head_col-4">Status</div>
//                     </li>
//                     {assignedIncidents.map((assigneIncidents, key) => (
//                         <li key={key} className="table-row">
//                             <div className="col col-1" data-label="Incident id">
//                                 {assigneIncidents.incidentId}
//                             </div>
//                             <div className="col col-2" data-label="Incident Type">
//                                 {assigneIncidents.incidentType}
//                             </div>
//                             <div className="col col-3" data-label="Details">
//                                 {assigneIncidents.incidentDetails}
//                             </div>
//                             <div className="col col-4" data-label="Status">
//                                 {assigneIncidents.incidentStatus}
//                             </div>
//                         </li>
//                     ))}
//                 </ul>

//                 {/* Button group for navigation */}
//                 <div className="flex justify-center gap-4 mt-6">
//                     <Link
//                         to="/updatestatustoclosed"
//                         className="bg-blue-500 text-white font-semibold py-2 px-6 rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:bg-blue-700 transition duration-150">
//                         Update Status
//                     </Link>
//                 </div>
//             </div>
//         </div>
//   )
  
// }

// export default OfficerIncidents
