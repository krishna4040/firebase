import React, { useState } from 'react'
import { sendSignInLinkToEmail } from 'firebase/auth'
import { auth, actionCodeSettings } from '../../config/firebase'

const EmailLinkAuthentication = () => {

    const [email, setEmail] = useState("");

    const sumbitHandler = async (e) => {
        e.preventDefault();
        try {
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            setEmail("");
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className='p-4 border-8 w-[400px]'>
            <form onSubmit={sumbitHandler} className='flex flex-col items-start justify-center gap-2'>
                <label htmlFor="email" className='text-xs uppercase'>Email:</label>
                <input type="email" placeholder='Enter Email...' value={email} onChange={(e) => { setEmail(e.target.value) }} className='input danger solid' />
                <button className='btn solid success'>Send Link</button>
            </form>
        </div>
    )
}

export default EmailLinkAuthentication