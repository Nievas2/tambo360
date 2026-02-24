// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState<string>("Córdoba, AR");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
          );
          const data = await response.json();
          const addr = data.address;
          
          // Ajuste de lógica para "Ciudad, Provincia/Estado"
          // Buscamos el nombre de la ciudad o municipio
          const ciudad = addr.city || addr.town || addr.municipality || addr.village || "Córdoba";
          // Buscamos la provincia o el estado
          const provincia = addr.state || addr.region || "AR";
          
          setLocation(`${ciudad}, ${provincia}`);
        } catch (error) {
          console.error("Error obteniendo ubicación", error);
        }
      });
    }
  }, []);

  const formatDateTime = (date: Date) => {
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} | ${date.getHours() % 12 || 12}:${date.getMinutes().toString().padStart(2, '0')} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
  };

  return (
    <nav className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 rounded-lg transition-colors duration-200 hover:bg-[#4A4A4A] hover:text-white text-[#4A4A4A]"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-lg sm:text-xl font-bold text-black truncate">
          {/* Usamos user.name si existe, sino 'Raul' por defecto como tenías */}
          ¡Hola, {user?.name?.split(' ')[0] || 'Raul'}!
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden md:flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5">
          <MapPin className="h-4 w-4 text-black" />
          <span className="text-xs font-semibold text-gray-700">{location}</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5">
          <Clock className="h-4 w-4 text-black" />
          <span className="text-[10px] sm:text-xs font-semibold text-gray-700">
            {formatDateTime(currentTime)}
          </span>
        </div>
      </div>
    </nav>
  );
};