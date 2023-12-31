import React, { useState } from 'react'
import PasswordAuthentication from '../components/Auth/PasswordAuthentication'
import EmailLinkAuthentication from '../components/Auth/EmailLinkAuthentication';
import PhoneNumberAuthentication from '../components/Auth/PhoneNumberAuthentication';
import Google from '../components/Auth/Google';

const Auth = () => {

    const [options, setOptions] = useState(0);

    const clickHandler = (e) => {
        setOptions(parseInt(e.target.innerText[0]));
    }

    return (
        <div className='flex flex-col items-start justify-center gap-3 ml-3'>
            <h1 className='text-xl uppercase'>Authentication Page</h1>
            <h2>Select Authentication Options:</h2>
            <div className='flex items-center justify-start gap-7'>
                <button onClick={clickHandler} className='btn info solid'>1.Password Authentication</button>
                <button onClick={clickHandler} className='btn danger solid'>2.Email Link Authentication</button>
                <button onClick={clickHandler} className='btn success solid'>3.Google Authentication</button>
                <button onClick={clickHandler} className='btn bw solid'>4.Phone-Number Authenntication</button>
            </div>
            <div>
                {options === 1 && <PasswordAuthentication />}
                {options === 2 && <EmailLinkAuthentication />}
                {options === 3 && <Google />}
                {options === 4 && <PhoneNumberAuthentication />}
            </div>
        </div>
    )
}

export default Auth