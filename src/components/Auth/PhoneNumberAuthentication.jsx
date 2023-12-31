import React, { useRef, useState, useEffect } from 'react';
import { auth } from '../../config/firebase';
import { setUser } from '../../store/slice/user';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const PhoneNumberAuthentication = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [captchaSolved, setCaptchSolved] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');

    const container = useRef(null);
    const recaptchaVerifier = useRef(null);
    const confirmationResultRef = useRef(null);

    useEffect(() => {
        recaptchaVerifier.current = new RecaptchaVerifier(auth, container.current, {
            'size': 'normal', //invisible
            'callback': (res) => {
                //
            },
            'expired-callback': () => {
                //
            }
        });
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            confirmationResultRef.current = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier.current);
            setPhoneNumber('');
        } catch (error) {
            console.log(error);
        }
    };

    const signInHandler = async () => {
        try {
            const { user } = await confirmationResultRef.current.confirm(code);
            dispatch(setUser(user));
            navigate('/profile');
        } catch (error) {
            toast.error('Incorrect code');
            console.log(error);
        }
    };

    return (
        <div className='flex flex-col items-start justify-center gap-3 p-4 ml-3 border-8'>
            <div ref={container}></div>
            <form className="flex flex-col items-start justify-center gap-2" onSubmit={submitHandler}>
                <label htmlFor="phone">Phone Number:</label>
                <input
                    type="tel"
                    placeholder="Enter Number..."
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="input danger solid"
                />
                <button type="submit" className="btn info solid">
                    Get SMS
                </button>
            </form>
            {captchaSolved && (
                <div>
                    <input
                        type="text"
                        placeholder="Enter code..."
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="input danger solid"
                    />
                    <button className="btn success solid" onClick={signInHandler}>
                        Sign in
                    </button>
                </div>
            )}
        </div>
    );
};

export default PhoneNumberAuthentication;
