import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#252525]">Dashboard</h1>
        <p className="text-[#959595]">Bienvenido al panel de control de Tambo360.</p>
      </div>

      {/* Aquí puedes agregar tus tarjetas o estadísticas después */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white border border-[#EAEAEA] rounded-xl shadow-sm">
          <h3 className="font-semibold text-[#252525]">Estado General</h3>
          <p className="text-2xl font-bold text-[#252525] mt-2">Activo</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;