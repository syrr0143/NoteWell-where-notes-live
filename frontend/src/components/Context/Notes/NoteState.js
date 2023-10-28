// import NoteItem from '../../NoteItem';
import NoteContext from './NoteContext';
import { useState, useEffect } from 'react';// useref is removed 


const NoteState = (props) => {
  const host = "http://localhost:3001"
  const notesinitial = []; // Your initial notes

  const [notes, setNotes] = useState(notesinitial);

  // ADD A NOTE
  // http://localhost:3001/api/notes/addnotes
  const addNote = async (newNote) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        'content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyZWQyYTE4NWEwNWMyMTVkNjkxYWI2In0sImlhdCI6MTY5NzY1NDIzMX0.x7T70P0zxSpDyXsGFNhG8S5c54ZgxjIClR7dMf4gUDA' // Replace with your actual auth token
      },
      body: JSON.stringify(newNote) // Use newNote parameter
    });

    setNotes([...notes, newNote]);
  };


  // Function to fetch notes from the backend
  const fetchNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyZWQyYTE4NWEwNWMyMTVkNjkxYWI2In0sImlhdCI6MTY5NzY1NDIzMX0.x7T70P0zxSpDyXsGFNhG8S5c54ZgxjIClR7dMf4gUDA' // Replace with your actual auth token
        },
      });
      if (response.ok) {
        const data = await response.json();
        setNotes(data.notes);
      } else {
        
        console.error('Failed to fetch notes from the server');
      }
    } catch (error) {
      console.error('An error occurred while fetching notes:', error);
    }
  };
  useEffect(() => {
    fetchNotes();
  }, []);



 //Updatenote
 //http://localhost:3001/api/notes/updatenote/65302605665e223f0b4545e7
 const updateNote = async (id, updatedData) => {
  try {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyZWQyYTE4NWEwNWMyMTVkNjkxYWI2In0sImlhdCI6MTY5NzY1NDIzMX0.x7T70P0zxSpDyXsGFNhG8S5c54ZgxjIClR7dMf4gUDA' // Replace with your actual auth token
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      // Handle success
      // ...
    } else {
      // console.error(error)
      // Handle error if the request is not successful
      console.error('Failed to update the note');
    }
  } catch (error) {
    console.error('An error occurred while updating the note:', error);
  }
}
// const updateNote = (note) => {
//   // Set the state with the data from the current note
//   setState({
//       title: note.title,
//       description: note.description,
//       tag: note.tag,
//   });

//   // Open the modal if it's not already open
//   if (!ref.current.classList.contains('show')) {
//       ref.current.click();
//   }

//   setCurrentNote(note);
// };

  // DELETE A NOTE
  //http://localhost:3001/api/notes/deletenote/65302605665e223f0b4545e7
  const deleteNote = async (id) => {
    // Implement deleteNote logic
    const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
      method:'DELETE',
      headers:{
        "content-type":"application/json",
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyZWQyYTE4NWEwNWMyMTVkNjkxYWI2In0sImlhdCI6MTY5NzY1NDIzMX0.x7T70P0zxSpDyXsGFNhG8S5c54ZgxjIClR7dMf4gUDA' // Replace with your actual auth token
      }
    });
    const json = response.json();
    console.log(json);

    // console.log("deleting the note with id " + (id))
    const newNote = notes.filter((notes) => { return notes._id !== id })
   setNotes(newNote);
  };


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote, fetchNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
