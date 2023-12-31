import React, { useState } from 'react'
import Sign from '../components/Auth/Sign'

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
                <button onClick={clickHandler} className='btn info solid'>1.Email & Password Authentication</button>
                <button onClick={clickHandler} className='btn danger solid'>2.Authentication Link</button>
                <button onClick={clickHandler} className='btn success solid'>3.Google Authentication</button>
                <button onClick={clickHandler} className='btn bw solid'>4.Github Authentication</button>
            </div>
            <div>
                {options === 1 && <Sign />}
            </div>
        </div>
    )
}

export default Auth