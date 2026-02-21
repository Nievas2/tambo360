import React, { useState, useEffect } from 'react';
import { MapPin, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Usamos export const para evitar problemas de exportación
export const Navbar: React.FC = () => {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date: Date) => {
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const dayNumber = date.getDate();
    const year = date.getFullYear();

    // Formatear hora AM/PM
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // la hora '0' debería ser '12'

    return `${dayName}, ${monthName} ${dayNumber}, ${year} | ${hours}:${minutes} ${ampm}`;
  };

  return (
    <nav className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-8 shadow-sm">
      <div className="flex flex-col">
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate max-w-[150px] sm:max-w-none">
          ¡Hola, {user?.name?.split(' ')[0] || 'Raul Maidana'}!
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden md:flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm">
          <MapPin className="h-4 w-4 text-gray-400" />
          <div className="flex flex-col leading-none">
            <span className="text-sm font-semibold text-gray-700">Córdoba, AR</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 rounded-xl border border-gray-200 bg-white px-3 sm:px-4 py-2 sm:py-2.5 shadow-sm">
          <Clock className="h-4 w-4 text-gray-400" />
          <div className="flex flex-col leading-none">
            <span className="text-xs sm:text-sm font-semibold text-gray-700">
              {formatDateTime(currentTime)}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};