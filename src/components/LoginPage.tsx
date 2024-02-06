import React, { useState } from 'react';
import './LoginPage.scss';

const LoginPage = (props) => {

    const [signUp, setSignUp] = useState(false);
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });

    const [signUpData, setSignUpData] = useState({
        signupUsername: '',
        signupPassword: '',
        signupName: ''
    })

    const submitLogin = async (e) => {
        if(loginData.username.length < 1 || loginData.password.length < 1) {
            return;
        }
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

    const submitRegister = async (e) => {
        if(signUpData.signupUsername.length < 2 || signUpData.signupPassword.length < 2 || signUpData.signupName.length < 2) {
            console.log("wrong credentials")
            return;
        }
        if(!confirm("Do you want to create account for " + loginData.username + "?")) {
            return;
        }

        e.preventDefault();

        const data = {
            username: signUpData.signupUsername,
            name: signUpData.signupName,
            password: signUpData.signupPassword
        }

        try {
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Authentication successful');
                console.log(responseData)
                localStorage.setItem('token', responseData.token);
                props.setLoggedIn(true);
            } else {
                console.error('Authentication failed');
            }
        } catch (error) {
            console.error('Error during authentication:', error);
        }
    }

    const handleChange = (e) => {
        setLoginData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
        setSignUpData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    const toggleSignUp = () => {
        setSignUp(!signUp)
    }


    return (
        <div className={'login-container'}>
            {
                signUp ?
                        <>
                            <label className={'form-label'}>SIGN UP</label>
                            <label form={'signupUsername'}>Username</label>
                            <input type={'text'} name={'signupUsername'} onChange={handleChange} />
                            <label form={'signupName'}>Name</label>
                            <input type={'text'} name={'signupName'} onChange={handleChange} />
                            <label form={'signupPassword'}>Password</label>
                            <input type={'text'} name={'signupPassword'} onChange={handleChange} />
                            <button type={'submit'} onClick={submitRegister} className={'submit-button'}>Sign up</button>
                        </>
                    :
                        <>
                            <label className={'form-label'}>LOGIN</label>
                            <label form={'username'}>Username</label>
                            <input type={'text'} name={'username'} onChange={handleChange} />
                            <label form={'password'}>Password</label>
                            <input type={'password'} name={'password'} onChange={handleChange} />
                            <button type={'submit'} onClick={submitLogin} className={'submit-button'}>Login</button>
                        </>
            }
            <button onClick={toggleSignUp}>{signUp ? "Login": "Sign up"}</button>
        </div>
    );
};

export default LoginPage;
