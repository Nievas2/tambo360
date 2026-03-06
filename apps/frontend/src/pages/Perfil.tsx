import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/src/components/common/accordion'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/components/common/avatar'
import { Card, CardContent } from '@/src/components/common/card'
import { User, Store, Lock, HelpCircle, LogOut } from 'lucide-react'
import { useAuth } from '@/src/context/AuthContext'
import { Button } from '@/src/components/common/Button'

const Perfil: React.FC = () => {
  const { logout, user } = useAuth()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      {/* Cabecera del Perfil */}
      <div className="flex flex-col items-center mb-8">
        <Avatar className="h-24 w-24 mb-4 border-4 border-white shadow-sm">
          <AvatarImage src="" />
          <AvatarFallback className="text-2xl bg-white text-black font-bold">
            {user?.nombre?.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold text-gray-900">{user?.nombre}</h1>
        <p className="text-gray-500 font-medium">
          {user?.establecimientos[0].nombre}
        </p>
      </div>

      {/* Contenedor Principal */}
      <Card className="w-full max-w-md border-none shadow-lg">
        <CardContent className="p-2 space-y-1">
          <Accordion type="single" collapsible className="w-full">
            {/* Datos Personales */}
            <AccordionItem value="datos" className="border-none">
              <AccordionTrigger className="hover:no-underline py-3 px-4 bg-[#F1F1F1] hover:bg-[#BABABA] rounded-t-lg group">
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="p-2 bg-[#BABABA] group-hover:bg-gray-300 rounded-md transition-colors">
                    <User size={20} />
                  </div>
                  <span className="font-medium">Datos personales</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className=" flex flex-col gap-3 px-4 py-4 bg-white">
                <span className="font-light">
                  Nombre: <b className="font-bold">{user?.nombre}</b>
                </span>
                <span className="font-light">
                  Correo: <b className="font-bold">{user?.correo}</b>
                </span>
                <span className="font-light">
                  Provincia:{' '}
                  <b className="font-bold">
                    {user?.establecimientos[0].provincia}
                  </b>
                </span>
                <span className="font-light">
                  Localidad:{' '}
                  <b className="font-bold">
                    {user?.establecimientos[0].localidad}
                  </b>
                </span>
              </AccordionContent>
            </AccordionItem>

            {/* Configuración del establecimiento */}
            <AccordionItem value="config" className="border-none">
              <AccordionTrigger
                className="hover:no-underline py-3 px-4 bg-[#F1F1F1] hover:bg-[#BABABA] group"
                disabled={true}
              >
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="p-2 bg-[#BABABA] group-hover:bg-gray-300 rounded-md transition-colors">
                    <Store size={20} />
                  </div>
                  <span className="font-medium">
                    Configuración del establecimiento
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className=" flex flex-col gap-3 px-4 py-4 bg-white"></AccordionContent>
            </AccordionItem>

            {/* Seguridad y contraseña */}
            <AccordionItem value="seguridad" className="border-none">
              <AccordionTrigger
                className="hover:no-underline py-3 px-4 bg-[#F1F1F1] hover:bg-[#BABABA] group"
                disabled={true}
              >
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="p-2 bg-[#BABABA] group-hover:bg-gray-300 rounded-md transition-colors">
                    <Lock size={20} />
                  </div>
                  <span className="font-medium">Seguridad y contraseña</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className=" flex flex-col gap-3 px-4 py-4 bg-white"></AccordionContent>
            </AccordionItem>

            {/* Ayuda y soporte */}
            <AccordionItem value="ayuda" className="border-none">
              <AccordionTrigger
                className="hover:no-underline py-3 px-4 bg-[#F1F1F1] hover:bg-[#BABABA] group"
                disabled={true}
              >
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="p-2 bg-[#BABABA] group-hover:bg-gray-300 rounded-md  transition-colors">
                    <HelpCircle size={20} />
                  </div>
                  <span className="font-medium">Ayuda y soporte</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className=" flex flex-col gap-3 px-4 py-4 bg-white"></AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Botón Cerrar Sesión (No expandible) */}
          <Button
            className="w-full flex items-center justify-between py-4 px-4 bg-[#F1F1F1] hover:bg-[#BABABA]  transition-colors rounded-b-lg mt-1 group h-15"
            onClick={logout}
          >
            <div className="flex items-center gap-4 text-gray-900">
              <div className="p-2 bg-[#BABABA] group-hover:bg-gray-300 rounded-md transition-colors">
                <LogOut size={20} />
              </div>
              <span className="font-bold">Cerrar sesion</span>
            </div>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default Perfil
