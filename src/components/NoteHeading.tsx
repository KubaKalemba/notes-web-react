import React from 'react';
import "./NoteHeading.scss"

const NoteHeading = (props) => {

    const deleteNote = async () => {
        try {
            const response = await fetch(`http://localhost:8080/notes/all/${props.noteid}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Include the JWT token if required
                },
            });

            if (response.ok) {
                console.log(`Note with ID ${props.noteid} deleted successfully`);
                props.refresh()
                // You can perform additional actions if needed, such as updating state
            } else {
                console.error(`Failed to delete note with ID ${props.noteid}`);
            }
        } catch (error) {
            console.error('Error during note deletion:', error);
        }
    }

    return (
        <div className={'note-heading'}>
            <div className={'title'} onClick={() => {
                props.selectNote(props.noteid)
            }}>{props.title}</div>
            <button id={'delete-note-button'} onClick={deleteNote}>delete</button>
        </div>
    );
};

export default NoteHeading;