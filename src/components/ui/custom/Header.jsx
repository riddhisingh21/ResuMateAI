import React from 'react'
import { useUser } from '@clerk/clerk-react'
import { UserButton } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../button'

function Header() {
    const { user, isSignedIn } = useUser()
    const navigate = useNavigate()

    const handleDashboardClick = () => {
        navigate('/dashboard')
    }

    return (
        <div className='p-3 px-5 flex justify-between bg-background border-b border-border'>
            <img src="../../../../logo.svg" alt="Logo" className="h-8" />

            {isSignedIn ? (
                <div className='flex gap-2 items-center'>
                    <Button 
                        variant="outline" 
                        onClick={handleDashboardClick}
                        className="text-foreground hover:bg-accent"
                    >
                        Dashboard
                    </Button>
                    <UserButton />
                </div>
            ) : (
                <Link to={'/auth/sign-in'}>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Get Started
                    </Button>
                </Link>
            )}
        </div>
    )
}

export default Header
