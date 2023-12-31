import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../config/firebase'
import { updateProfile, updateEmail, sendEmailVerification, updatePassword, sendPasswordResetEmail, reauthenticateWithCredential, deleteUser } from 'firebase/auth'
import { updateDisplayNameLocal, updatePhotoURLLocal, updateEmailLocal, updatePasswordLocal, updateEmailVerified } from '../context/hooks/user'

const Settings = () => {
    const dispacth = useDispatch();
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const clickHandler = async (e) => {
        try {
            switch (e.target.innerText) {
                case 'Update DisplayName':
                    await updateProfile(auth.currentUser, { displayName });
                    dispacth(updateDisplayNameLocal(displayName));
                    setDisplayName("");
                    break;
                case 'Update Email':
                    await updateEmail(auth.currentUser, email);
                    dispacth(updateEmailLocal(email));
                    setEmail("");
                    break;
                case 'Update Password':
                    await updatePassword(auth.currentUser, password);
                    await sendPasswordResetEmail(auth.currentUser);
                    dispacth(updatePasswordLocal(password));
                    setPassword("");
                    break;
                case 'Send Email Verification':
                    await sendEmailVerification(auth.currentUser);
                    dispacth(updateEmailVerified());
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const logoutHandler = async () => {
        reauthenticateWithCredential(auth.currentUser, Credential);
        console.log("trying to log out");
    }

    const deleteHandler = async () => {
        console.log("trying to delete");
    }

    return (
        <div className='mt-3 border-8 w-[300px]'>
            <h1 className='text-xl uppercase'>User Details Update</h1>
            <div className='flex flex-col items-start justify-center gap-3'>
                <div className='flex flex-col items-start justify-center gap-2'>
                    <label htmlFor="displayName">Display Name</label>
                    <input type="text" value={displayName} placeholder='Enter Display Name...' className='input danger solid' onChange={(e) => { setDisplayName(e.target.value) }} />
                    <button onClick={clickHandler} className='btn bw solid'>Update DisplayName</button>
                </div>

                <div className='flex flex-col items-start justify-center gap-2'>
                    <label htmlFor="email">Email</label>
                    <input type="text" value={email} placeholder='Enter Email...' className='input danger solid' onChange={(e) => { setEmail(e.target.value) }} />
                    <button onClick={clickHandler} className='btn bw solid'>Update Email</button>
                </div>

                <div className='flex flex-col items-start justify-center gap-2'>
                    <label htmlFor="password">Password</label>
                    <input type="text" value={password} placeholder='Enter Password...' className='input danger solid' onChange={(e) => { setPassword(e.target.value) }} />
                    <button onClick={clickHandler} className='btn bw solid'>Update Password</button>
                </div>

                <div className='flex flex-col items-start justify-center gap-2'>
                    <h2 className='text-lg uppercase'>Email Verification</h2>
                    <button className='success btn solid' onClick={clickHandler}>Send Email Verification</button>
                </div>

                <div className='flex flex-col items-start justify-center gap-2'>
                    <button className='btn info solid' onClick={logoutHandler}>Logout</button>
                    <button className='btn danger solid' onClick={deleteHandler}>Delete Acc</button>
                </div>

            </div>


        </div>
    )
}

export default Settings