import { useState } from 'react'
import './App.css'
import NewNote from "./components/NewNote";
import NotesList from "./components/NotesList";
import LoginPage from "./components/LoginPage";
import NoteHeading from "./components/NoteHeading";
import Header from "./components/Header";

function App() {

    const [loggedIn, setLoggedIn] = useState(!localStorage.getItem('token'))

    const logout = () => {
        setLoggedIn(false)
        localStorage.clear()
    }


  return (
    <div className={'App'}>
      <Header/>
      <div className="content">
        {
            loggedIn ? <NotesList logout={logout}/> : <LoginPage setLoggedIn={setLoggedIn}/>
        }
      </div>
      <div className="footer"></div>
    </div>
  )
}

export default App
