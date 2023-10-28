
import React, { useContext } from 'react';
import NoteContext from './Context/Notes/NoteContext';

function NoteItem(props) {
    const context = useContext(NoteContext);
    const { deleteNote } = context;

    const { notes, updateNote } = props;

    // Assuming notes.date is a valid date string or timestamp
    const backendDate = new Date(notes.date); // Convert notes.date to a Date object
    const currentDate = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = currentDate - backendDate;

    // Calculate the number of days
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return (
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
                        <div className="d-flex  align-items-end">
                            {/* <i className="fa-regular fa-trash-can" onClick={() => deleteNote(notes._id)}></i> */}
                            <i className="fa-regular fa-trash-can" onClick={() => deleteNote(notes._id)}></i>
                            
                            <i className="fa-regular fa-pen-to-square mx-2" onClick={() => updateNote(notes)}></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default NoteItem;
