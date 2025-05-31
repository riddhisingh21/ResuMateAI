import React from 'react'
import { useUser } from '@clerk/clerk-react'
import { UserButton } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'

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
                    <button 
                        style={{ background: 'white', color: '#222', border: '1px solid #ccc', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer' }}
                        onClick={() => window.open('https://atsresumateai.streamlit.app/', '_blank')}
                    >
                        Test your Resume
                    </button>
                    <button 
                        style={{ background: 'white', color: '#222', border: '1px solid #ccc', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer' }}
                        onClick={() => window.open('https://ai-mock-interview-react-4a69d.web.app', '_blank')}
                    >
                        Take a Mock Interview
                    </button>
                    <button 
                        style={{ background: 'white', color: '#222', border: '1px solid #ccc', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer' }}
                        onClick={handleDashboardClick}
                    >
                        Dashboard
                    </button>
                    <UserButton />
                </div>
            ) : (
                <Link to={'/auth/sign-in'}>
                    <button style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer' }}>
                        Get Started
                    </button>
                </Link>
            )}
        </div>
    )
}

export default Header;
