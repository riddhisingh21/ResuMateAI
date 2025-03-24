
import './App.css'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import Header from './components/ui/custom/Header'
import { Toaster } from 'sonner'

function App() {
  const {user, isLoaded, isSignedIn} = useUser();

  if(!isSignedIn && isLoaded){
    return <Navigate to={"/auth/sign-in"}/>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <main className="flex-1">
        <Outlet />
      </main>
      <Toaster/>
    </div>
  )
}

export default App
