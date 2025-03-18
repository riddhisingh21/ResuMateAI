import React from 'react'
import { useUser } from '@clerk/clerk-react'
import { UserButton } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { Button } from '../button'

function Header() {
    const { user, isSignedIn } = useUser()

    return (
        <div className='p-3 px-5 flex justify-between shadow-md'>
            <img src="" alt="Logo" />

            {isSignedIn ? (
                <div className='flex gap-2 items-center'>
                    <Button variant="outline">DashBoard</Button>
                    <UserButton />
                </div>
            ) : (
                <Link to={'/auth/sign-in'}>
                    <Button>Get Started</Button>
                </Link>
            )}
        </div>
    )
}

export default Header