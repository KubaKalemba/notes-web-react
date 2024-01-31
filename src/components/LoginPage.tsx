import React, { useState } from 'react';
import './LoginPage.scss';

const LoginPage = (props) => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });

    const submit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Authentication successful');
                localStorage.setItem('token', responseData.token);
                props.setLoggedIn(true);
            } else {
                console.error('Authentication failed');
            }
        } catch (error) {
            console.error('Error during authentication:', error);
        }
    };

    const handleChange = (e) => {
        setLoginData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    return (
        <form className={'login-container'} onSubmit={submit}>
            <input type={'text'} name={'username'} onChange={handleChange} />
            <input type={'password'} name={'password'} onChange={handleChange} />
            <button type={'submit'}>Login</button>
        </form>
    );
};

export default LoginPage;
