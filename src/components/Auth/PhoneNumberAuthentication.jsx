import React, { useRef, useState } from 'react'
import { auth } from '../../config/firebase'
import { setUser } from '../../store/slice/user'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const PhoneNumberAuthentication = () => {

    const dispacth = useDispatch();
    const navigate = useNavigate();

    const [capcthaSolved, setCapcthaSolved] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [code, setCode] = useState('');
    const conatiner = useRef();

    window.recaptchaVerifier = new RecaptchaVerifier(auth, conatiner.current, {
        'size': 'normal',
        'callBack': () => {
            setCapcthaSolved(true);
        },
        'expired-callback': () => {
            setCapcthaSolved(false);
        }
    });

    const sumbitHandler = async (e) => {
        e.preventDefault();
        try {
            const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
            window.confirmationResult = confirmationResult;
        } catch (error) {
            console.log(error);
        }
    }

    const signinHandler = async () => {
        try {
            const { user } = await window.confirmationResult.confirm(code);
            dispacth(setUser(user));
            navigate('/profile');
        } catch (error) {
            toast.error("incorrect code");
            console.log(error);
        }
    }

    return (
        <div>
            <div ref={conatiner}></div>
            <form className='flex flex-col items-start justify-center' onSubmit={sumbitHandler}>
                <label htmlFor="phone">Phone Number:</label>
                <input type="number" placeholder='Enter Number...' value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} className='input danger solid' />
                <button className='btn info solid'>get SMS</button>
            </form>
            {
                capcthaSolved &&
                <div>
                    <input type="text" placeholder='Enter code...' value={code} onChange={(e) => { setCode(e.target.value) }} className='input danger solid' />
                    <button className='btn success solid' onClick={signinHandler}>Signin</button>
                </div>
            }
        </div>
    )
}

export default PhoneNumberAuthentication