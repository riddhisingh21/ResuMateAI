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
            <img src="/image.png" alt="Logo" className="h-10" />

            {isSignedIn ? (
                <div className='flex gap-2 items-center'>
                    <Button 
                        variant="outline" 
                        onClick={() => window.open('https://atsresumateai.streamlit.app/', '_blank')}
                        className="text-foreground hover:bg-accent"
                    >
                        Test your Resume
                    </Button>
                    <Button 
                        variant="outline" 
                        onClick={() => window.open('https://ai-mock-interview-react-4a69d.web.app', '_blank')}
                        className="text-foreground hover:bg-accent"
                    >
                        Take a Mock Interview
                    </Button>
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
