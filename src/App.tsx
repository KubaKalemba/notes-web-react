import { useState } from 'react'
import './App.css'
import NewNote from "./components/NewNote";
import NotesList from "./components/NotesList";
import LoginPage from "./components/LoginPage";
import NoteHeading from "./components/NoteHeading";

function App() {
  const [count, setCount] = useState(0)

    const [loggedIn, setLoggedIn] = useState(false)

  return (
    <div className={'App'}>
        {
            loggedIn ? <NotesList/> : <LoginPage setLoggedIn={setLoggedIn}/>
        }
    </div>
  )
}

export default App
