import React from 'react';
import "./NewNote.css"

const NewNote = () => {

    const [note, setNote] = React.useState("")

    const handleChange = (e) => {
        setNote(e.target.value)
    }

    const submit = () => {

    }

    return (
        <div className={'new-note-container'}>
                <textarea value={note} onChange={handleChange} className={'new-note'}/>
                <button
                    onClick={submit}
                    className={'submit-note-button'}>SUBMIT</button>
        </div>
    );
};

export default NewNote;