import React, { useContext, useState } from 'react';
import NoteContext from './Context/Notes/NoteContext';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';

function NoteItem(props) {
    const context = useContext(NoteContext);
    const { deleteNote } = context;

    const { notes, updateNote } = props;

    const [isModalOpen, setIsModalOpen] = useState(false); // State for opening/closing the modal

    const handleDelete = () => {
        // Show the confirmation modal when the trash can icon is clicked
        setIsModalOpen(true);
    };

    const closeSuccessModal = () => {
        // Close the confirmation modal
        setIsModalOpen(false);
    };

    // Assuming notes.date is a valid date string or timestamp
    const backendDate = new Date(notes.date);
    const currentDate = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = currentDate - backendDate;

    // Calculate the number of days
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return (
        <>
            <div className="card-group">
                <div className="card" style={{ margin: "2vh" }}>
                    <div className="card-body" style={{ overflow: "auto", maxHeight: "200px" }}>
                        <div className="d-flex justify-content-between align-items-start">
                            <div>
                                <h5 style={{ textTransform: "uppercase" }} className="card-title">
                                    {notes.title}
                                </h5>
                                <hr />
                                <p className="card-text" style={{ whiteSpace: "pre-line" }}>
                                    {notes.description}
                                </p>
                                <p className="card-text">
                                    <small className="text-body-secondary">
                                        Last updated {daysAgo} days ago
                                    </small>
                                </p>
                            </div>
                            <div className="d-flex align-items-end">
                                <i className="fa-regular fa-trash-can" onClick={handleDelete}></i>
                                <i className="fa-regular fa-pen-to-square mx-2" onClick={() => updateNote(notes)}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Delete Confirmation Modal */}
            <Modal isOpen={isModalOpen} toggle={closeSuccessModal}>
                <ModalBody>
                    <div className="alert-container">
                        <div className="alert-box success">
                            <div className="alert-content">
                                <div className="alert-icon">
                                    <img src="https://s2.svgbox.net/hero-outline.svg?ic=check" width="32" height="32" alt="Success Icon" />
                                </div>
                                <div className="text">
                                    <h3>Delete Note?</h3>
                                    <p>Do you really want to delete this note?</p>
                                    <p style={{color:"red"}}>This can't be undone.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={closeSuccessModal}>CANCEL</Button>
                    <Button color="danger" onClick={() => deleteNote(notes._id)}>DELETE</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default NoteItem;


// import React, { useContext } from 'react';
// import NoteContext from './Context/Notes/NoteContext';

// function NoteItem(props) {
//     const context = useContext(NoteContext);
//     const { deleteNote } = context;

//     const { notes, updateNote } = props;

//     // Assuming notes.date is a valid date string or timestamp
//     const backendDate = new Date(notes.date); // Convert notes.date to a Date object
//     const currentDate = new Date();

//     // Calculate the time difference in milliseconds
//     const timeDifference = currentDate - backendDate;

//     // Calculate the number of days
//     const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

//     return (
//         <div className="card-group">
//             <div className="card" style={{ margin: "2vh" }}>
//                 <div className="card-body" style={{ overflow: "auto", maxHeight: "200px" }}>
//                     <div className="d-flex justify-content-between align-items-start">
//                         <div>
//                             <h5 style={{ textTransform: "uppercase" }} className="card-title">
//                                 {notes.title}
//                             </h5>
//                             <hr />
//                             <p className="card-text" style={{ whiteSpace: "pre-line" }}>
//                                 {notes.description}
//                             </p>
//                             <p className="card-text">
//                                 <small className="text-body-secondary">
//                                     Last updated {daysAgo} days ago
//                                 </small>
//                             </p>
//                         </div>
//                         <div className="d-flex  align-items-end">
//                             {/* <i className="fa-regular fa-trash-can" onClick={() => deleteNote(notes._id)}></i> */}
//                             <i className="fa-regular fa-trash-can" onClick={() => deleteNote(notes._id)}></i>
                            
//                             <i className="fa-regular fa-pen-to-square mx-2" onClick={() => updateNote(notes)}></i>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     );
// }

// export default NoteItem;
