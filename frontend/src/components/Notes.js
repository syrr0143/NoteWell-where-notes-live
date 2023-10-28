

import React, { useContext, useState, useRef, useEffect } from 'react';
import NoteContext from './Context/Notes/NoteContext';
import NoteItem from './NoteItem';
import Navbar from './Navbar';

function Notes() {
    const context = useContext(NoteContext);
    const [state, setState] = useState({ title: "", description: "", tag: "" });
    const [error, setError] = useState(null); // State to track errors
    const [currentNote, setCurrentNote] = useState(null); // Add state to track the current note
    const [loading, setLoading] = useState(true); // Add loading state
    const { notes } = context;

    useEffect(() => {
        // Fetch notes when the component is initially mounted
        context.fetchNotes()
            .then(() => setLoading(false))
            .catch((error) => {
                console.error('Failed to fetch notes:', error);
                setLoading(false);
            });
    }, [context]);
    

    const loadNoteData = (note) => {
        ref.current.click();
        setCurrentNote(note);
        setState({
            title: note.title,
            description: note.description,
            tag: note.tag,
        });
    };
    

    const ref = useRef(null);

    const handleUpdate = async (e) => {
    e.preventDefault();
    if (!currentNote || !currentNote._id) {
        setError("No note selected for update");
        return;
    }

    // Declare newNote here
    const newNote = {
        "_id": currentNote._id,
        "title": state.title,
        "description": state.description,
        "tag": state.tag,
    };

    if (!newNote.title || !newNote.description) {
        setError("Title and Description are required");
        return;
    }

    await context.updateNote(newNote._id, newNote);

    // Fetch the latest notes after the update
    await context.fetchNotes();

    // Close the modal and reset the input fields
    ref.current.click();
    setState({ title: "", description: "", tag: "" });
};


    const onchange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
        <Navbar/>
            <button style={{ display: "none" }} type="button" className="btn btn-primary" ref={ref} data-bs-toggle="modal" data-bs-target="#staticBackdrop"></button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Notes</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
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


                            </form>
                        </div>
                        <div className="modal-footer">
                            {error && <p className="text-danger">{error}</p>}
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleUpdate}
                                disabled={state.title.length < 3 || state.description.length < 5}
                            >
                                Update Note
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: "10vh" }} className='container'>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <h2 style={{ textDecoration: "underline" }}>Your Notes</h2>
                        {notes.length === 0 ? (
                            <h4 style={{ marginTop: "5vh", marginBottom: "7vh" }}>You have not created any notes, Let's create some Notes.</h4>
                        ) : (
                            notes.map((note) => (
                                <NoteItem key={note._id} updateNote={() => loadNoteData(note)} deleteNote={() => context.deleteNote(note._id)} notes={note} />
                            ))
                        )}
                    </>
                )}
            </div>
        </>
    );
}

export default Notes;
