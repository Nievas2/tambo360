import React, { useState } from 'react'
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
import {
  User,
  Store,
  HelpCircle,
  LogOut,
  Mail,
  CheckCircle,
} from 'lucide-react'
import { useAuth } from '@/src/context/AuthContext'
import { Button } from '@/src/components/common/Button'
import { Label } from '@/src/components/common/label'
import { Input } from '@/src/components/common/Input'
import { useUpdateEstablishmentName } from '@/src/hooks/establishment/useUpdateEstablishmentName'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpdateEstablishmentSchema } from '@/src/types/establishment'
import { useErrorMessage } from '@/src/hooks/useErrorMessage'

const Perfil: React.FC = () => {
  const [finished, setFinished] = useState(false)
  const { logout, user, setUser } = useAuth()
  const { mutateAsync } = useUpdateEstablishmentName()
  const { showErrorMessage } = useErrorMessage()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: user?.establecimientos[0].nombre,
    },
    resolver: zodResolver(UpdateEstablishmentSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutateAsync(data.nombre)
      setFinished(true)
      setUser({
        ...user,
        establecimientos: [
          {
            ...user.establecimientos[0],
            nombre: data.nombre,
          },
        ],
      })
    } catch (error) {
      showErrorMessage(error.response.data.message)
    }
  })

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="flex flex-col items-center mb-8">
        <Avatar className="h-24 w-24 mb-4 shadow-sm">
          <AvatarImage src="" />
          <AvatarFallback className="text-2xl bg-[#D7ECAF] text-[#669213] font-bold">
            {user?.nombre?.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold text-gray-900">{user?.nombre}</h1>
        <p className="text-gray-500 font-medium">
          {user?.establecimientos[0].nombre}
        </p>
      </div>

      <Card className="w-full max-w-md border-none shadow-lg">
        <CardContent className="p-2 space-y-2">
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem value="datos" className="border-none">
              <AccordionTrigger className="hover:no-underline py-3 px-4 bg-[#F1F1F1] hover:bg-[#BABABA] rounded-t-lg group">
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="p-2 bg-[#E2E8F0] group-hover:bg-[#E2E8F0]/80 rounded-md transition-colors">
                    <User size={20} className="text-[#94A3B8]" />
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

            <AccordionItem value="config" className="border-none">
              <AccordionTrigger className="hover:no-underline py-3 px-4 bg-[#F1F1F1] hover:bg-[#BABABA] group">
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="p-2 bg-[#E2E8F0] group-hover:bg-[#E2E8F0]/80 rounded-md transition-colors">
                    <Store size={20} className="text-[#94A3B8]" />
                  </div>
                  <span className="font-medium">
                    Configuración del establecimiento
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className=" flex flex-col gap-3 px-4 py-4 bg-white">
                <form onSubmit={onSubmit}>
                  <div className="flex flex-col gap-2">
                    <Label className="font-light">
                      Nombre del establecimiento
                    </Label>
                    <Input
                      {...register('nombre')}
                      className={`${finished && 'border border-[#669213]'}`}
                    />

                    {finished && (
                      <div className="flex items-center gap-2">
                        <CheckCircle size={20} className="text-[#669213]" />
                        <span className="text-[#669213]">
                          Actualizado con exito
                        </span>
                      </div>
                    )}
                    {errors.nombre && (
                      <span className="text-red-main">
                        {errors.nombre.message}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-4">
                    <Button type="submit" className="h-12">
                      Actualizar
                    </Button>
                  </div>
                </form>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="ayuda" className="border-none">
              <AccordionTrigger className="hover:no-underline py-3 px-4 bg-[#F1F1F1] hover:bg-[#BABABA] group">
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="p-2 bg-[#E2E8F0] group-hover:bg-[#E2E8F0]/80 rounded-md  transition-colors">
                    <HelpCircle size={20} className="text-[#94A3B8]" />
                  </div>
                  <span className="font-medium">Ayuda y soporte</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className=" flex flex-col gap-3 px-4 py-4 bg-white">
                <span className="font-light flex items-center gap-2">
                  <Mail size={24} /> Soporte:
                  <b className="font-bold"> t360.arg@gmail.com</b>
                </span>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button
            className="w-full flex items-center justify-between py-4 px-4 bg-alert-bg hover:bg-[#BABABA]  transition-colors rounded-b-lg group h-15"
            onClick={logout}
          >
            <div className="flex items-center gap-4 text-gray-900">
              <div className="p-2 bg-[#BABABA] group-hover:bg-[#E2E8F0]/80 rounded-md transition-colors">
                <LogOut size={20} className="text-red-main" />
              </div>
              <span className="font-bold text-red-main">Cerrar sesion</span>
            </div>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default Perfil
