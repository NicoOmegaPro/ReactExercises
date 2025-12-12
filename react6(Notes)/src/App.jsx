import { useState, useEffect } from 'react'
import './App.css'
import Header from "./components/Header.jsx"
import NotesList from "./components/NotesList.jsx"
import Search from "./components/Search.jsx"
import { nanoid } from 'nanoid'

  const initialNotesList = [
    {
      id: nanoid(),
      text: "This is my first note",
      date: "3/11/2021"
    },
    {
      id: nanoid(),
      text: "This is my first first note",
      date: "3/11/2022"
    },
    {
      id: nanoid(),
      text: "This is my first first first note",
      date: "3/11/2023"
    }
  ]


export default function App() {

  const [notes, setNotes] = useState(() => { 
    const savedNotes = JSON.parse(localStorage.getItem("notes-app-data"));
    return savedNotes || initialNotesList;
  });
  const [searchNote, setSearchNote] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes-app-data", JSON.stringify(notes));
  }, [notes]);

  // useEffect(() => {
  //   const savedNotes = JSON.parse(localStorage.getItem("notes-app-data"));
  //   if (savedNotes) {
  //     setNotes(savedNotes);
  //   }
  // }, []); //Este useEffect no funcionaba, con lo de arriba ahora si que va.

  function addNote(texto) {
    setNotes([...notes,
      {id: nanoid(),
      text: texto,
      date: new Date().toLocaleDateString()}
    ])
  }

  function deleteNote(id) {
    setNotes(notes.filter((note)=> note.id !== id));
  }


  return (
    <div className={darkMode ? "dark-mode":"randomUnsedClass"}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} darkMode={darkMode}/>
        <Search handleSearchNote={setSearchNote}/>
        <NotesList notes={notes.filter(note => note.text.toLowerCase().includes(searchNote.toLowerCase()))}
          handleAddNote = {addNote}
          handleDeleteNote = {deleteNote}/>
      </div>
    </div>
  )
}
