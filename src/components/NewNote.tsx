import React from 'react';
import "./NewNote.css"
import axios from "axios";

const NewNote = (props) => {

    console.log('\n\n\n')
    console.log(props.selectedNote)

    const [note, setNote] = React.useState(props.selectedNote !== -1 ? props.selectedNote.content : "")
    const [updating] = React.useState(props.selectedNote !== - 1)

    const handleChange = (e) => {
        setNote(e.target.value)
    }

    const saveNote = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('No token available. User not logged in.');
                return;
            }

            let response;
            if(updating) {
                response = await axios.put(
                    `http://localhost:8080/notes/all/${props.selectedNote.id}`,
                    { content: note },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
            } else {
                response = await axios.post(
                    'http://localhost:8080/notes/all',
                    {content: note, username: props.username},
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
            }

            if (response.status === 200) {
                console.log('Note added successfully:', response.data);
                props.goBack();
                return response.data;
            } else {
                console.error('Failed to add note:', response.statusText);
                return null;
            }
        } catch (error) {
            console.error('Error adding note:', error.message);
            return null;
        }
    }

    return (
        <div className={'new-note-container'}>
                <textarea value={note} onChange={handleChange} className={'new-note'}/>
                <button
                    onClick={saveNote}
                    className={'submit-note-button'}>SAVE</button>
                <button onClick={() => {
                    props.goBack
                    props.delete(props.selectedNote.id)
                }}>DELETE</button>
        </div>
    );
};

export default NewNote;