import React, { useState, useEffect } from 'react';
import NoteHeading from "./NoteHeading";
import './NotesList.scss'
import NewNote from "./NewNote";
import {DiAptana} from "react-icons/di";
import Settings from "./Settings";

const NotesList = (props) => {
    const [selectedNote, setSelectedNote] = useState(-1);
    const [notes, setNotes] = useState([]);
    const [refresh, setRefresh] = useState(0)
    const [userData, setUserData] = useState({
        username: '',
        name: ''
    })
    const [editMode, setEditMode] = useState(false)
    const [settingsMode, setSettingsMode] = useState(false)

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

    const deleteNote = async (noteid: string) => {
        try {
            const response = await fetch(`http://localhost:8080/notes/all/${noteid}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Include the JWT token if required
                },
            });

            if (response.ok) {
                console.log(`Note with ID ${noteid} deleted successfully`);
                refreshNotesList()
                // You can perform additional actions if needed, such as updating state
            } else {
                console.error(`Failed to delete note with ID ${noteid}`);
            }
        } catch (error) {
            console.error('Error during note deletion:', error);
        }
    }

    const toggleEditMode = () => {
        setEditMode(!editMode);
    }

    const toggleSettingsMode = () => {
        setSettingsMode(!settingsMode)
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
        return <NoteHeading key={note.id} title={note.content} noteid={note.id} refresh={refreshNotesList} selectNote={selectNote} delete={deleteNote}/>;
    });



    return (
        <div className={'notes-container'}>
            {
                editMode
                    ?
                        <>
                            <NewNote goBack={toggleEditMode} username={userData.username} selectedNote={selectedNote} delete={deleteNote}/>
                        </>
                    :
                    settingsMode
                        ?
                            <>
                                <Settings name={userData.name} logout={props.logout} goBack={toggleSettingsMode}/>
                            </>
                            :
                            <>
                                <div className={'notes-header'}>
                                <div className={"welcome-message"}>WELCOME {userData.name.toUpperCase()}</div>
                                    <button className={'settings'} onClick={toggleSettingsMode}><DiAptana/></button>
                                </div>
                                <div className="notes">
                                    {noteDivs}
                                </div>
                                <div className="notes-footer">
                                    <button className={"new-note-button"} onClick={toggleEditMode}>+</button>
                                </div>
                            </>

            }
        </div>
    );
};

export default NotesList;
