import React from 'react';
import "./NoteHeading.scss"

const NoteHeading = (props) => {

    return (
        <div className={'note-heading'}>
            <div className={'title'} onClick={() => {
                props.selectNote(props.noteid)
            }}>{props.title}</div>
            <button id={'delete-note-button'} onClick={() => {
                props.delete(props.noteid)
            }}>delete</button>
        </div>
    );
};

export default NoteHeading;