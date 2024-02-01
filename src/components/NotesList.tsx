import React, { useState, useEffect } from 'react';
import NoteHeading from "./NoteHeading";
import './NotesList.scss'
import NewNote from "./NewNote";

const NotesList = () => {
    const [selectedNote, setSelectedNote] = useState(-1);
    const [notes, setNotes] = useState([]);
    const [refresh, setRefresh] = useState(0)
    const [userData, setUserData] = useState({
        username: '',
        name: ''
    })
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('No token available. User not logged in.');
            return;
        }

        fetch('http://localhost:8080/notes/all', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                console.log(res)
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setNotes(data);
            })
            .catch((error) => {
                console.error('Error fetching notes:', error);
            });

        fetch('http://localhost:8080/users/data', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                console.log(res)
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setUserData({
                    username: data[0],
                    name: data[1]
                });
            })
            .catch((error) => {
                console.error('Error fetching notes:', error);
            });

    }, [editMode, refresh]); // Empty dependency array to run the effect only once when the component mounts

    const toggleEditMode = () => {
        setEditMode(!editMode);
    }

    const refreshNotesList = () => {
        setRefresh(refresh+1)
    }

    const selectNote = (id) => {
        for(const n of notes) {
            if(n.id === id) {
                setSelectedNote(n);
                console.log("oj")
                toggleEditMode();
            }
        }
    }

    const noteDivs = notes.map((note) => {
        return <NoteHeading key={note.id} title={note.content} noteid={note.id} refresh={refreshNotesList} selectNote={selectNote}/>;
    });



    return (
        <div className={'notes-container'}>
            {
                editMode
                    ?
                        <>
                            <NewNote goBack={toggleEditMode} username={userData.username} selectedNote={selectedNote}/>
                        </>
                    :
                        <>
                            <div className={"welcome-message"}>WELCOME {userData.name.toUpperCase()}</div>
                            {noteDivs}
                            <button className={"new-note-button"} onClick={toggleEditMode}>+</button>
                        </>

            }
        </div>
    );
};

export default NotesList;
