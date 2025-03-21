import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignIn from './auth/sign-in/index.jsx'
import Home from './home/index.jsx'
import Dashboard from './dashboard/index.jsx'
import EditResume from './dashboard/resume/[resumeId]/edit/index.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import ViewResume from './my-resume/[resume-id]/view'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'dashboard',
        children: [
          {
            index: true,
            element: <Dashboard />
          },
          {
            path: 'resume/:resumeId/edit',
            element: <EditResume />
          }
        ]
      },
      {
        path: 'my-resume/:resumeId/view',
        element: <ViewResume />
      }
    ]
  },
  {
    path: 'auth/sign-in',
    element: <SignIn />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
)
