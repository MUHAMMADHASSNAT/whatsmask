import { useState } from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import SetupPanel from './SetupPanel'
import ToastContainer from './ToastContainer'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [isSetupOpen, setIsSetupOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background-grey overflow-hidden">
      <Sidebar 
        onSetupClick={() => setIsSetupOpen(true)} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
      <SetupPanel isOpen={isSetupOpen} onClose={() => setIsSetupOpen(false)} />
      <ToastContainer />
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  )
}

