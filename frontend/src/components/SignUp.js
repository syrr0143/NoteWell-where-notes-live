// import React, { useState } from 'react';


// export default function Signup() {
//     const [name, setName] = useState(''); // Add state for full name
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [registrationStatus, setRegistrationStatus] = useState(null); // Add a state variable for registration status
//     const navigate = useNavigate();
//     // const handleSignup = async (e) => {
//     //     e.preventDefault();

//     //     const userData = {
//     //         name,
//     //         email,
//     //         password,
//     //     };

//     //     // You should add validation for password and confirm password here

//     //     try {
//     //         const response = await fetch("http://localhost:3001/api/auth/createuser", {
//     //             method: "POST",
//     //             headers: {
//     //                 "Content-Type": "application/json",
//     //             },
//     //             body: JSON.stringify(userData),
//     //         });

//     //         if (response.ok) {
//     //             const data = await response.json();
//     //             console.log(data);

//     //             // You can add logic to navigate to a success page or handle successful signup.
//     //         } else {
//     //             console.error('Signup failed');
//     //         }
//     //     } catch (error) {
//     //         console.error('Error during signup:', error);
//     //     }
//     // };
//     const handleSignup = async (e) => {
//         e.preventDefault();


//         if (password !== confirmPassword) {
//             // Password and Confirm Password do not match, display an error or alert
//             console.error("Password and Confirm Password do not match");
//             return;
//         }

//         const userData = {
//             name,
//             email,
//             password,
//         };

//         try {
//             const response = await fetch("http://localhost:3001/api/auth/createuser", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(userData),
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 console.log(data);
//                 setRegistrationStatus('success');

//                 // You can add logic to navigate to the login page on successful signup
//                 // For example, you can use the useNavigate function from React Router
//                 navigate('/'); // Replace with your login page path
//             } else {
//                 console.error('Signup failed');
//             }
//         } catch (error) {
//             console.error('Error during signup:', error);
//         }
//     };


//     return (
//         <div className='login-background'>
//             <div className="wrap-login">
//                 <form onSubmit={handleSignup} method="POST">
//                     <div className="card-body">
//                         <p className="loginformtitle"><h3><strong>Sign Up</strong></h3></p>
//                         <div className="wrapinput">
//                             <input
//                                 type="text"
//                                 className={`form-control`}
//                                 name="name"
//                                 placeholder="Full name"
//                                 aria-label="Full Name"
//                                 aria-describedby="basic-addon1"
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div className="wrapinput">
//                             <input
//                                 type="email"
//                                 className={`form-control`}
//                                 name="email"
//                                 placeholder="Email Address"
//                                 aria-label="Email Address"
//                                 aria-describedby="basic-addon1"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 required
//                                 pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
//                             />
//                         </div>
//                         <div className="wrapinput">
//                             <input
//                                 type="password"
//                                 className={`form-control`}
//                                 name="password"
//                                 placeholder="Password"
//                                 aria-label="Password"
//                                 aria-describedby="basic-addon2"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div className="wrapinput">
//                             <input
//                                 type="password"
//                                 className={`form-control`}
//                                 name="confirmPassword"
//                                 placeholder="Confirm Password"
//                                 aria-label="Confirm Password"
//                                 aria-describedby="basic-addon2"
//                                 value={confirmPassword}
//                                 onChange={(e) => setConfirmPassword(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         {/* <div className='signinbutton'>
//                        <button
//                                 type="submit"
//                                 id='signinbutton'
//                                 className={`btn btn-primary`}
//                             >
//                                 Sign Up
//                             </button>
//                         </div> */}
//                         <div className='signinbutton'>
//                         {registrationStatus === 'success' ? (
//                             <>
//                                 <p style={{ color: 'green' }}>User registration is successful!</p>
//                                 <Link to="/login">
//                                     <button className={`btn btn-primary`}>
//                                         Go to Sign In
//                                     </button>
//                                 </Link>
//                             </>
//                         ) : (
//                             <button
//                                 type="submit"
//                                 id='signinbutton'
//                                 className={`btn btn-primary`}
//                             >
//                                 Sign Up
//                             </button>
//                         )}
//                     </div>
//                         <div style={{ marginTop: "6vh" }} className='textbelowbutton'>
//                             <span className='txt1'>Already have an account?</span>
//                         </div>
//                         <div className='signinbutton'>
//                             <Link to="/">
//                                 <button
//                                     id='signinbutton'
//                                     className={`btn btn-primary`}
//                                 >
//                                     Sign In
//                                 </button>
//                             </Link>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailExistsError, setEmailExistsError] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [registrationStatus, setRegistrationStatus] = useState(null);
    const navigate = useNavigate();

    const clearErrors = () => {
        setEmailExistsError(false);
        setPasswordMatchError(false);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        clearErrors(); // Clear any previous errors before submitting

        if (password !== confirmPassword) {
            setPasswordMatchError(true);
            return;
        }

        const userData = {
            name,
            email,
            password,
        };

        try {
            const response = await fetch("http://localhost:3001/api/auth/createuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);

                if (data.error === "User with the same email already exists") {
                    setEmailExistsError(true);
                } else {
                    setRegistrationStatus('success');
                }
            } else {
                console.error('Signup failed');
                setEmailExistsError(true);
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    return (
        <div className='login-background'>
            <div className="wrap-login">
                <form onSubmit={handleSignup} method="POST">
                    <div className="card-body">
                        <p className="loginformtitle">
                            <h3>
                                <strong>Sign Up</strong>
                            </h3>
                        </p>
                        <div className="wrapinput">
                            <input
                                id='inputbox3'
                                type="text"
                                className={`form-control`}
                                name="name"
                                placeholder="Full name"
                                aria-label="Full Name"
                                aria-describedby="basic-addon1"
                                value={name}
                                minLength={3}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="wrapinput">
                            <input
                                id='inputbox4'
                                type="email"
                                className={`form-control`}
                                name="email"
                                placeholder="Email Address"
                                aria-label="Email Address"
                                aria-describedby="basic-addon1"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                            />
                        </div>
                        <div className="wrapinput">
                            <input
                                type="password"
                                id='inputbox5'
                                className={`form-control`}
                                name="password"
                                placeholder="Password"
                                aria-label="Password"
                                aria-describedby="basic-addon2"
                                value={password}
                                minLength={5}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="wrapinput">
                            <input
                                type="password"
                                className={`form-control`}
                                name="confirmPassword"
                                id='inputbox6'
                                placeholder="Confirm Password"
                                aria-label="Confirm Password"
                                aria-describedby="basic-addon2"
                                value={confirmPassword}
                                minLength={5}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        {passwordMatchError && (
                            <div className="error-message" style={{ alignItems: "center" }}>
                                <p style={{ color: 'red' }}>Password and Confirm Password do not match.</p>
                                <p style={{ color: 'red' }}> Enter them carefully.</p>
                            </div>
                        )}
                        {emailExistsError && (
                            <div className="error-message">
                                <p style={{ color: 'red' }}>An account with this email already exists.</p>
                            </div>
                        )}
                        {registrationStatus === 'success' ? (
                            <><div className="error-message">
                                <p style={{ color: 'green' }}>User registration is successful!</p>
                                <p style={{ color: 'green' }}>Sign In now to start creating notes</p>
                                </div>
                            </>
                        ) : (
                            <div className='signinbutton'>
                                <button
                                    type="submit"
                                    id='signinbutton4'
                                    className={`btn btn-primary`}
                                >
                                    Sign Up
                                </button>
                            </div>
                        )}
                        <div style={{ marginTop: "6vh" }} className='textbelowbutton'>
                            <span className='txt1'>Already have an account?</span>
                        </div>
                        <div className='signinbutton'>
                            <Link to="/">
                                <button
                                    id='signinbutton3'
                                    className={`btn btn-primary`}
                                >
                                    Sign In
                                </button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
