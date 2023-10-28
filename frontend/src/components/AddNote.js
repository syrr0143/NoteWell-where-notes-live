// import React, { useContext, useState } from 'react';
// import NoteContext from './Context/Notes/NoteContext';
// import Notes from './Notes';
// import Navbar from './Navbar';

// function AddNote() {
//     const context = useContext(NoteContext);
//     const { addNote } = context;
//     const [state, setState] = useState({ title: "", description: "", tag: "" });
//     const [error, setError] = useState(null); // State to track errors
   
//     const isAddButtonDisabled = state.title.length < 3 || state.description.length < 5;
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const newNote = {
//             "_id": Notes._id,
//             "user": "652ed2a185a05c215d691ab6",
//             "title": state.title,
//             "description": state.description,
//             "tag": state.tag,
//             "date": new Date().toISOString(),
//             "__v": 0
//         };

//         // Simulate an error condition for demonstration
//         // In your actual code, validate the input and handle errors appropriately
//         if (!newNote.title || !newNote.description) {
//             setError("Title and Description are required");
//             return;
//         }

//         // Clear any previous errors
//         setError(null);

//         // Call the addNote function to add the new note to the context
//         addNote(newNote);

//         // Clear the input fields after adding the note
//         setState({ title: "", description: "", tag: "" });
//     };

//     const onchange = (e) => {
//         setState({
//             ...state,
//             [e.target.name]: e.target.value,
//         });
//     };

//     return (
//         <div>
//             <Navbar/>
//             <div className="container my-3 align-content-left">
//                 <h2 style={{ marginBlock: "10vh" }}>Add a Note</h2>
//                 <form method='POST'>
//                     <div className="mb-3">
//                         <label htmlFor="title" className="form-label"><h4>Title</h4></label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="title"
//                             name="title"
//                             placeholder="Enter your title here"
//                             onChange={onchange}
//                             value={state.title}
//                         />
//                     </div>
//                     <label htmlFor="description" className="form-label"><h4>Description</h4></label>
//                     <input
//                         type="text"
//                         id="description"
//                         className="mb-3 form-control"
//                         name="description"
//                         placeholder="Description of note"
//                         aria-describedby="passwordHelpBlock"
//                         onChange={onchange}
//                         value={state.description}
//                     />
//                     <label htmlFor="description" className=" form-label"><h4>Tag</h4></label>
//                     <input 
//                         type="text"
//                         id="description"
//                         className="mb-3 form-control"
//                         name="tag"
//                         placeholder="Tag something here"
//                         aria-describedby="passwordHelpBlock"
//                         onChange={onchange}
//                         value={state.tag}
//                     />
//                     {error && <p className="text-danger">{error}</p>}
//                     <button
//                         style={{ marginTop: "5vh" }}
//                         type="button"
//                         className='btn btn-success'
//                         onClick={handleSubmit}
//                         disabled={isAddButtonDisabled} // Disable the button based on conditions
//                     >Add Note</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default AddNote;

import React, { useContext, useState } from 'react';
import Notes from './Notes';
import NoteContext from './Context/Notes/NoteContext';
import Navbar from './Navbar';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap'; // Import Reactstrap components

function AddNote() {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [state, setState] = useState({ title: "", description: "", tag: "" });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false); // State for success message
    const [isModalOpen, setIsModalOpen] = useState(false); // State for opening/closing the modal

    const isAddButtonDisabled = state.title.length < 3 || state.description.length < 5;
    const handleSubmit = (e) => {
        e.preventDefault();
        const newNote = {
            "_id": Notes._id,
            "user": "652ed2a185a05c215d691ab6",
            "title": state.title,
            "description": state.description,
            "tag": state.tag,
            "date": new Date().toISOString(),
            "__v": 0
        };

        if (!newNote.title || !newNote.description) {
            setError("Title and Description are required");
            return;
        }

        setError(null);
        addNote(newNote);

        // Clear the input fields after adding the note
        setState({ title: "", description: "", tag: "" });

        // Show success modal
        setSuccess(true);
        setIsModalOpen(true);
    };

    const onchange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const closeSuccessModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <Navbar/>
            <div className="container my-3 align-content-left">
                <h2 style={{ marginBlock: "10vh" }}>Add a Note</h2>
                <form method='POST'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label"><h4>Title</h4></label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            placeholder="Enter your title here"
                            onChange={onchange}
                            value={state.title}
                        />
                    </div>
                    <label htmlFor="description" className="form-label"><h4>Description</h4></label>
                    <input
                        type="text"
                        id="description"
                        className="mb-3 form-control"
                        name="description"
                        placeholder="Description of note"
                        aria-describedby="passwordHelpBlock"
                        onChange={onchange}
                        value={state.description}
                    />
                    <label htmlFor="description" className=" form-label"><h4>Tag</h4></label>
                    <input 
                        type="text"
                        id="description"
                        className="mb-3 form-control"
                        name="tag"
                        placeholder="Tag something here"
                        aria-describedby="passwordHelpBlock"
                        onChange={onchange}
                        value={state.tag}
                    />
                    {error && <p className="text-danger">{error}</p>}
                    <button
                        style={{ marginTop: "5vh" }}
                        type="button"
                        className='btn btn-success'
                        onClick={handleSubmit}
                        disabled={isAddButtonDisabled}
                    >Add Note</button>
                </form>
            </div>

            {/* Success Modal */}
            <Modal isOpen={isModalOpen} toggle={closeSuccessModal}>
                <ModalBody>
                    <div className="alert-container">
                        <div className="alert-box success">
                            <div className="alert-content">
                                <div className="alert-icon">
                                    <img src="https://s2.svgbox.net/hero-outline.svg?ic=check" width="32" height="32" alt="Success Icon" />
                                </div>
                                <div className="text">
                                    <h3>Success Title</h3>
                                    <p>Note added successfully!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={closeSuccessModal}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default AddNote;
