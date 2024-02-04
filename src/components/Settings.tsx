import React, {useState} from 'react';
import "./Settings.scss"

const Settings = (props) => {
    const [newName, setNewName] = useState(props.name)

    const handleChange = (e) => {
        setNewName(e.target.value)
    }

    const handleSubmit = () => {
        props.goBack()
    }
    return (
        <div className={'settings-container'}>
            <label form={'new-name-input'}>New name</label>
            <input type={'text'} className={'new-name-input'} onChange={handleChange} value={newName}/>
            <button className={'settings-submit'} onClick={handleSubmit}>SUBMIT</button>
            <button id={'goback-button'} onClick={props.goBack}>Go back</button>
            <button id={'logout-button'} onClick={props.logout}>LOGOUT</button>
        </div>
    );
};

export default Settings;