import React from "react";
import {
  BrowserRouter as Router, // Use BrowserRouter here
  Route,
  Routes
} from "react-router-dom";
import './App.css';
import NoteState from './components/Context/Notes/NoteState';
import AddNote from './components/AddNote';
import About from './components/About';
import Alert from './components/Alert';
import Notes from './components/Notes';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Profile from './components/Profile';
import Upgrade from './components/Upgrade';


function App() {
  return (
    <NoteState>
      <Router> {/* Wrap your component with Router */}
      <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/Profile" element={<Profile/>} />
      <Route path="/Upgrade" element={<Upgrade/>} />
      <Route path="/About" element={<About/>} />
      <Route path="/SignUp" element={<SignUp/>} />
      <Route path="/Notes" element={<Notes/>} />
      <Route path="/AddNote" element={<AddNote/>} />
      </Routes>
      </Router>
    </NoteState>
   
  );
}

export default App;

