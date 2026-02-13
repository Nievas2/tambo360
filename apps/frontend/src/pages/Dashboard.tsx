import React from 'react'
import Navbar from '@/src/components/Navbar'

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 lg:p-10">
        <header className="mb-10">
          <p className="text-slate-400">Hello word</p>
        </header>
      </main>
    </div>
  )
}

export default Dashboard
