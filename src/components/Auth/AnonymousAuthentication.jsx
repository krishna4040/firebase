import React from 'react'
import { signInAnonymously } from 'firebase/auth'
import { setUser } from '../../store/slice/user'
import { useDispatch } from 'react-redux'
import { auth } from '../../config/firebase'
import { useNavigate } from 'react-router-dom'

const AnonymousAuthentication = () => {

    // is user ki profile details nhi hongi pn pr
    const dispacth = useDispatch();
    const navigate = useNavigate();

    const clickHandler = async () => {
        try {
            const { user } = await signInAnonymously(auth);
            dispacth(setUser(user));
            navigate('/profile');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <button className='btn solid success' onClick={clickHandler}>
            bhai bina information ke login krna hai
            kr le koi dikkat nhi
        </button>
    )
}

export default AnonymousAuthentication