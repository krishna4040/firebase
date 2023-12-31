import React, { useRef } from 'react'
import { auth } from '../../config/firebase'
import { setUser } from '../../store/slice/user'
import { signInWithCustomToken } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CustomAuthentication = () => {

    const token = useRef(null);
    const dispacth = useDispatch();
    const navigate = useNavigate();

    const sumbitHandler = async (e) => {
        e.preventDefault();
        try {
            const { user } = await signInWithCustomToken(auth, token);
            dispacth(setUser(user));
            navigate('/profile');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>CustomAuthentication which i have not designed but sumbithndler is coded</div>
    )
}

export default CustomAuthentication