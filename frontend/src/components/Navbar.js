import React from 'react';
import {Link, NavLink } from 'react-router-dom';

function Navbar() {
  // let location = useLocation();
  // useEffect(() => {
  //   // Google Analytics
  //   // ga('send', 'pageview');
  //   console.log(location);
  // }, [location]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/AddNote">NoteWell</NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                <NavLink className="nav-link" to="/" exact="true">
                  Home
                </NavLink>
              </li> */}
              <li className="nav-item">
                <NavLink className="nav-link" to="/Notes">
                  Notes
                </NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink className="nav-link" to="/Profile">
                  Profile
                </NavLink>
              </li> */}
              {/* <li className="nav-item">
                <NavLink className="nav-link" to="/Upgrade">
                  Upgrade
                </NavLink>
              </li> */}
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>

              {/* Add similar NavLink components for other links */}
            </ul>
            <form className="d-flex" role="search">
              {/* <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button> */}
              
                <Link to="/"><button className="btn btn-outline-danger mx-4" type="submit">LogOut </button></Link>
             
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
// import React, { useState } from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap'; // Import Reactstrap components

// function Navbar() {
//     const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // State for opening/closing the logout modal

//     const openLogoutModal = () => {
//         setIsLogoutModalOpen(true);
//     };

//     const closeLogoutModal = () => {
//         setIsLogoutModalOpen(false);
//     };

//     return (
//         <>
//             <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
//                 <div className="container-fluid">
//                     <NavLink className="navbar-brand" to="/AddNote">NoteWell</NavLink>
//                     <button
//                         className="navbar-toggler"
//                         type="button"
//                         data-bs-toggle="collapse"
//                         data-bs-target="#navbarSupportedContent"
//                         aria-controls="navbarSupportedContent"
//                         aria-expanded="false"
//                         aria-label="Toggle navigation"
//                     >
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                             <li className="nav-item">
//                                 <NavLink className="nav-link" to="/Notes">
//                                     Notes
//                                 </NavLink>
//                             </li>
//                             <li className="nav-item">
//                                 <NavLink className="nav-link" to="/Profile">
//                                     Profile
//                                 </NavLink>
//                             </li>
//                             <li className="nav-item">
//                                 <NavLink className="nav-link" to="/Upgrade">
//                                     Upgrade
//                                 </NavLink>
//                             </li>
//                             <li className="nav-item">
//                                 <NavLink className="nav-link" to="/about">
//                                     About
//                                 </NavLink>
//                             </li>
//                         </ul>
//                         <form className="d-flex" role="search">
//                             <Link to="/">
//                                 <button className="btn btn-outline-danger mx-4" type="button" onClick={openLogoutModal}>LogOut</button>
//                             </Link>
//                         </form>
//                     </div>
//                 </div>
//             </nav>

//             {/* Logout Success Modal */}
//             <Modal isOpen={isLogoutModalOpen} toggle={closeLogoutModal}>
//                 <ModalBody>
//                     <div className="alert-container">
//                         <div className="alert-box success">
//                             <div className="alert-content">
//                                 <div className="alert-icon">
//                                     <img src="https://s2.svgbox.net/hero-outline.svg?ic=check" width="32" height="32" alt="Success Icon" />
//                                 </div>
//                                 <div className="text">
//                                     <h3>Logout Successful</h3>
//                                     <p>You have been successfully logged out.</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </ModalBody>
//                 <ModalFooter>
//                     <Button color="primary" onClick={closeLogoutModal}>Close</Button>
//                 </ModalFooter>
//             </Modal>
//         </>
//     );
// }

// export default Navbar;
