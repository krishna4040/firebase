import React from 'react'
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth'
import { setUser } from '../../store/slice/user'
import { useDispatch } from 'react-redux'
import { auth } from '../../config/firebase'
import { useNavigate } from 'react-router-dom'

// FaceBookAuthProvider, OAuthProvider(apple,microsoft,yaaho), TwitterAuthProvider, GithubAuthProvider, 

const Google = () => {

    const dispacth = useDispatch();
    const navigate = useNavigate();

    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    const popupHandler = async () => {
        try {
            const { user } = await signInWithPopup(auth, provider);
            dispacth(setUser(user));
            navigate('/profile');
        } catch (error) {
            console.log(error);
        }
    }

    const redirectHandler = async () => {
        try {
            await signInWithRedirect(auth, provider);
            const { user } = await getRedirectResult(auth);
            dispacth(setUser(user));
            navigate('/profile');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex items-center justify-start gap-2'>
            <button className='success btn solid' onClick={popupHandler}>Google se sign in krega popup ke sath</button>
            <button className='bw btn solid' onClick={redirectHandler}>Google se sign in krega redirect ho kr</button>
        </div>
    )
}

export default Google