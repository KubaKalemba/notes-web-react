import React from 'react';
import "./NoteHeading.css"

const NoteHeading = (props) => {
    return (
        <div className={'note-heading'}>
            {props.title}
        </div>
    );
};

export default NoteHeading;