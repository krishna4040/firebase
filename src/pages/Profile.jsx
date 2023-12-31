import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../store/slice/user'
import {
    signOut,
    reauthenticateWithCredential,
    reauthenticateWithPhoneNumber,
    reauthenticateWithRedirect,
    reauthenticateWithPopup,
} from 'firebase/auth'
import { auth } from '../config/firebase'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Profile = () => {

    const { user } = useSelector(state => state.user);
    const dispacth = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        await signOut(auth);
        dispacth(removeUser());
        toast.success('Logout Success');
        navigate('/');
    }

    // we also get meta data but do not get password
    return (
        user ?
            <>
                <div className='flex flex-col items-start justify-center gap-3 p-4 mt-4 border-8'>
                    <div className={`${user?.photoURL ? 'avatar' : null}`}>
                        {
                            user?.photoURL ?
                                <img src={user?.photoURL} alt="photo" /> :
                                <h2>PhotoURL Not Provided</h2>
                        }
                    </div>
                    <div className='flex items-center justify-start w-full gap-5'>
                        <h2>Display Name</h2>
                        <p className='input success solid'>{user?.displayName ? user?.displayName : "No Display Name"}</p>
                    </div>
                    <div className='flex items-center justify-start w-full gap-3'>
                        <div className='flex items-center justify-start w-1/2 gap-5'>
                            <h2>Email</h2>
                            <p className='input success solid'>{user?.email ? user?.email : 'Not Provided'}</p>
                        </div>
                        <div className='flex items-center justify-start w-1/2 gap-5'>
                            <h2>Is Email Verified:</h2>
                            <p className='input success solid'>{user?.emailVerified ? 'Verified' : 'Not Verified'}</p>
                        </div>
                    </div>
                    <div className='flex items-center justify-start w-full gap-3'>
                        <div className='flex items-center justify-start w-1/2 gap-5'>
                            <h2>Phone</h2>
                            <p className='input success solid'>{user?.phoneNumber ? user?.phoneNumber : 'Not Provided'}</p>
                        </div>
                        <div className='flex items-center justify-start w-1/2 gap-5'>
                            <h2>Id</h2>
                            <p className='input success solid'>{user?.uid}</p>
                        </div>
                    </div>
                    <div className='flex items-center justify-start gap-2'>
                        <button className='btn light info' onClick={() => { console.log(user) }}>See User In Console</button>
                        <button className='btn light danger' onClick={logoutHandler}>Logout</button>
                    </div>
                </div>
            </> :
            <>
                <div>Loading...</div>
            </>
    )
}

export default Profile