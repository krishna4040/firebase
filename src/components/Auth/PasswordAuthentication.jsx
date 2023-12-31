import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../../config/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { setUser } from '../../store/slice/user'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

// Signup && Signin

const PasswordAuthentication = () => {

    const dispacth = useDispatch();
    const navigation = useNavigate();

    const [toogle, setToogle] = useState("signup");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signupHandler = async () => {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            dispacth(setUser(user));
        } catch (error) {
            toast.error("unable to signin");
            console.log(error);
        }
    }
    const signinHandler = async () => {
        try {
            const { user } = await signInWithEmailAndPassword(auth, email, password);
            dispacth(setUser(user));
            toast.success("signed in successfully");
        } catch (error) {
            toast.error("unable to signin");
            console.log(error);
        }
    }

    const sumbitHandler = async (e) => {
        e.preventDefault();
        setEmail("");
        setPassword("");
        if (toogle === 'signup') signupHandler();
        else signinHandler();
        navigation('/profile');
    }

    const clickHandler = () => {
        if (toogle === 'signup') setToogle('signin');
        else setToogle('signup');
    }


    return (
        <div className='flex flex-col items-start justify-center gap-3 border-8 w-fit'>
            <h1 className='text-xl uppercase'>{toogle} Page</h1>
            <form onSubmit={(e) => { sumbitHandler(e) }} className='flex flex-col items-start justify-center gap-3 p-3 border w-72'>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter Email...' className='input danger solid' value={email} />

                <label htmlFor="password">Password</label>
                <input type="text" name='password' onChange={(e) => { setPassword(e.target.value) }} placeholder='Enter Password...' className='input danger solid' value={password} />

                <button className='btn info solid'>{toogle}</button>
            </form>

            <div className='flex items-center justify-start gap-3'>
                <button onClick={clickHandler} className='btn success solid'>{toogle === 'signin' ? 'signup' : 'signin'} Instead</button>
                <button className='btn bw solid' onClick={() => { console.log(auth.currentUser) }}>see user</button>
            </div>


        </div>
    )
}

export default PasswordAuthentication