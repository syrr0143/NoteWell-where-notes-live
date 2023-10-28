// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import google from "../images/icon-google.webp";
// import fb from "../images/fb.svg";

// export default function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [isInvalid, setIsInvalid] = useState(false);
//     const [loginSuccess, setLoginSuccess] = useState(false); // State for login success
//     const [loginError, setLoginError] = useState(false); // State for login error
//     const navigate = useNavigate();

//     const handlesubmit = async (e) => {
//         e.preventDefault();

//         const userData = {
//             email,
//             password,
//         };

//         if (!email || !password) {
//             setIsInvalid(true);
//             return;
//         }

//         try {
//             // Reset isInvalid state on successful submission
//             setIsInvalid(false);

//             const response = await fetch("http://localhost:3001/api/auth/login", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(userData),
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 console.log(data);
                
//                 navigate('/AddNote');
//             } else {
//                 console.error('Login failed');
//                 setLoginError(true); // Set login error state to true
//             }
//         } catch (error) {
//             console.error('Error during login:', error);
//         }
//     };

//     // Handle input changes and reset error states
//     const handleEmailChange = (e) => {
//         setEmail(e.target.value);
//         setLoginError(false);
//         setIsInvalid(false);
//     };

//     const handlePasswordChange = (e) => {
//         setPassword(e.target.value);
//         setLoginError(false);
//         setIsInvalid(false);
//     };

//     const isEmailValid = email.match("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");

//     return (
//         <div className='login-background'>
//             <div className="wrap-login">
//                 <form onSubmit={handlesubmit} action="POST">
//                     <div className="card-body">
//                         <p className="loginformtitle"><h3><strong>Sign In</strong></h3></p>
//                         <div className="wrapinput">
//                             <input
//                                 id="inputbox1"
//                                 type="email"
//                                 className={`form-control ${isInvalid || (email && !isEmailValid) ? 'is-invalid' : ''}`}
//                                 name="email"
//                                 placeholder="Username or email"
//                                 aria-label="Username"
//                                 aria-describedby="basic-addon1"
//                                 value={email}
//                                 onChange={handleEmailChange} // Handle email input change
//                                 required
                                
//                                 pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
//                             />
//                             <div className="invalid-feedback">
//                                 {email && !isEmailValid ? "Please enter a valid email address." : "Email is required."}
//                             </div>
//                         </div>
//                         <div className="wrapinput">
//                             <input
//                                 id='inputbox2'
//                                 type="password"
//                                 className={`form-control ${isInvalid ? 'is-invalid' : ''}`}
//                                 name="password"
//                                 placeholder="Password"
//                                 aria-label="Recipient's email"
//                                 aria-describedby="basic-addon2"
//                                 value={password}
                               
//                                 onChange={handlePasswordChange} // Handle password input change
//                                 required
//                             />
//                             <div className="invalid-feedback">
//                                 Password is required.
//                             </div>
//                         </div>
//                         {loginError && (
//                             <div className="error-message">
//                                 <p style={{ color: "red" }}> Invalid credentials. Please check your username and password.</p>
//                             </div>
//                         )}
//                         <div className='signinbutton'>
//                             <button
//                                 type="submit"
//                                 id='signinbutton'
//                                 disabled={!email || !isEmailValid}
//                                 className={`btn btn-primary ${!email || !isEmailValid ? 'disabled-btn' : ''}`}
//                             >
//                                 Sign in
//                             </button>
//                         </div>
//                         <div className='textbelowbutton'>
//                             <span className='txt1'>or login with</span>
//                         </div>
//                         <div className='signinoption'>
//                             <img id='googlegap' src={google} alt="" />
//                             <img src={fb} alt="" />
//                         </div>
//                         <div className='signinbutton'>
//                             <div className='textbelowbutton2'>
//                                 <span className='txt1'>Don't have an account?</span>
//                             </div>
//                             <Link to="/SignUp">
//                                 <button id='signinbutton' className={`btn btn-primary`}> Sign up </button>
//                             </Link>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import google from "../images/icon-google.webp";
import fb from "../images/fb.svg";
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap'; // Import Reactstrap components

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();

        const userData = {
            email,
            password,
        };

        if (!email || !password) {
            setIsInvalid(true);
            return;
        }

        try {
            setIsInvalid(false);

            const response = await fetch("http://localhost:3001/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setLoginSuccess(true);
                // Don't navigate immediately here, wait for user to close the modal
            } else {
                console.error('Login failed');
                setLoginError(true);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setLoginError(false);
        setIsInvalid(false);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setLoginError(false);
        setIsInvalid(false);
    };

    const isEmailValid = email.match("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");

    const closeSuccessModal = () => {
        setLoginSuccess(false);
        navigate('/AddNote');
    };

    return (
        <div className='login-background'>
            <div className="wrap-login">
                <form onSubmit={handlesubmit} action="POST">
                    <div className="card-body">
                        <p className="loginformtitle"><h3><strong>Sign In</strong></h3></p>
                        <div className="wrapinput">
                            <input
                                id="inputbox1"
                                type="email"
                                className={`form-control ${isInvalid || (email && !isEmailValid) ? 'is-invalid' : ''}`}
                                name="email"
                                placeholder="Username or email"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value={email}
                                onChange={handleEmailChange}
                                required
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                            />
                            <div className="invalid-feedback">
                                {email && !isEmailValid ? "Please enter a valid email address." : "Email is required."}
                            </div>
                        </div>
                        <div className="wrapinput">
                            <input
                                id='inputbox2'
                                type="password"
                                className={`form-control ${isInvalid ? 'is-invalid' : ''}`}
                                name="password"
                                placeholder="Password"
                                aria-label="Recipient's email"
                                aria-describedby="basic-addon2"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                            <div className="invalid-feedback">
                                Password is required.
                            </div>
                        </div>
                        {loginError && (
                            <div className="error-message">
                                <p style={{ color: "red" }}> Invalid credentials. Please check your username and password.</p>
                            </div>
                        )}
                        <div className='signinbutton'>
                            <button
                                type="submit"
                                id='signinbutton'
                                disabled={!email || !isEmailValid}
                                className={`btn btn-primary ${!email || !isEmailValid ? 'disabled-btn' : ''}`}
                            >
                                Sign in
                            </button>
                        </div>
                        <div className='textbelowbutton'>
                            <span className='txt1'>or login with</span>
                        </div>
                        <div className='signinoption'>
                            <img id='googlegap' src={google} alt="" />
                            <img src={fb} alt="" />
                        </div>
                        <div className='signinbutton'>
                            <div className='textbelowbutton2'>
                                <span className='txt1'>Don't have an account?</span>
                            </div>
                            <Link to="/SignUp">
                                <button id='signinbutton' className={`btn btn-primary`}> Sign up </button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
            {/* Success Modal */}
            <Modal isOpen={loginSuccess} toggle={closeSuccessModal}>
                <ModalBody>
                    <div className="alert-container">
                        <div className="alert-box success">
                            <div className="alert-content">
                                <div className="alert-icon">
                                    <img src="https://s2.svgbox.net/hero-outline.svg?ic=check" width="32" height="32" alt="Success Icon" />
                                </div>
                                <div className="text">
                                    <h3>Success Title</h3>
                                    <p>Login Successful! You can now access your notes.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button id='signinbutton'  onClick={closeSuccessModal}>Continue</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
