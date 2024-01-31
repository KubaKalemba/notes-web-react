import React, { useState, useEffect } from 'react';
import NoteHeading from "./NoteHeading";

const NotesList = () => {
    const [notes, setNotes] = useState([]);

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
    }, []); // Empty dependency array to run the effect only once when the component mounts

    const noteDivs = notes.map((note) => {
        return <NoteHeading key={note.id} title={note.content} />;
    });

    return (
        <div className={'notes-container'}>
            {noteDivs}
        </div>
    );
};

export default NotesList;
