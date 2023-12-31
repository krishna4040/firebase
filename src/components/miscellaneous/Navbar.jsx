import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <ul className='flex items-center justify-start gap-5 p-4'>
                <NavLink to={'/profile'}><li className='btn ghost success'>Profile</li></NavLink>
                <NavLink to={'/settings'}><li className='btn ghost info'>Settings</li></NavLink>
            </ul>
        </div>
    )
}

export default Navbar