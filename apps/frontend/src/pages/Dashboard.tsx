import React from 'react'
import Navbar from '@/src/components/Navbar'
import DailyProductionLog from '@/src/components/shared/dashboard/DailyProductionLog'

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 lg:p-10">
        <header className="mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">hello word</h2>
        </header>
      </main>

      <section>
        <DailyProductionLog />
      </section>
    </div>
  )
}

export default Dashboard
