import React, { useState, useEffect } from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Actualizar la hora cada minuto
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Formato de fecha: Lun, Feb 16, 2026 | 8:00 AM
  const formatDateTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };

    const formatted = new Intl.DateTimeFormat('es-ES', options).format(date);
    
    return formatted
      .replace(/^\w/, (c) => c.toUpperCase()) 
      .replace(/\./g, '')                     
      .replace(',', ' |');                    
  };

  return (
    <nav className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-gray-200 bg-white px-8 shadow-sm">
      {/* Izquierda: Bienvenida personalizada */}
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-gray-900">
          ¡Bienvenido, {user?.name?.split(' ')[0] || 'Raul Maidana'}!
        </h1>
      </div>

      {/* Derecha: Ubicación y Fecha/Hora dentro de rectángulos */}
      <div className="flex items-center gap-4">
        {/* Rectángulo de Ubicación */}
        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm">
          <MapPin className="h-5 w-5 text-gray-400" />
          <div className="flex flex-col leading-none">
            <span className="text-sm font-semibold text-gray-700">
              Córdoba, Argentina
            </span>
          </div>
        </div>

        {/* Rectángulo de Fecha y Hora */}
        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm">
          <Calendar className="h-5 w-5 text-gray-400" />
          <div className="flex flex-col leading-none">
            <span className="text-sm font-semibold text-gray-700">
              {formatDateTime(currentTime)}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;