import { Button } from '@/src/components/common/Button'
import { Card, CardContent } from '@/src/components/common/card'
import { Input } from '@/src/components/common/Input'
import { Label } from '@/src/components/common/label'
import { useCreateEstablishment } from '@/src/hooks/establishment/useCreateEstablishment'
import { EstablishmentSchema } from '@/src/types/establishment'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'

const Establishment = () => {
  const {
    mutateAsync: createEstablishment,
    error: createEstablishmentError,
    isPending,
  } = useCreateEstablishment()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: '',
      localidad: '',
      provincia: '',
    },
    resolver: zodResolver(EstablishmentSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const values = {
        ...data,
        fechaCreacion: new Date().toISOString(),
      }
      const response = await createEstablishment(values)
      console.log(response)

      window.location.href = '/dashboard'
    } catch (err) {
      console.error('Error al iniciar sesión:', err)
    }
  })

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#e5e5e5]">
      <div className="hidden md:flex md:w-1/3 xl:w-1/2 items-center justify-center">
        <div className="w-full h-full max-w-lg flex items-center justify-center">
          <div className="rounded-2xl w-full aspect-square flex flex-col items-center justify-center">
            <img
              src="/isotipo_tambo 1.svg"
              alt="Logo"
              className="w-3/4 h-auto"
            />
            <img
              src="/logotipo 1.svg"
              alt="Tambo"
              className="w-1/2 h-auto mt-4"
            />
          </div>
        </div>
      </div>

      <div className="w-full md:w-2/3 xl:w-1/2 flex items-center justify-center md:justify-end p-4 md:p-8">
        <Card className="w-full max-w-125 border-none shadow-none md:shadow-sm py-8 bg-white rounded-xl">
          <CardContent className="space-y-8">
            <div className="flex flex-col items-center justify-start text-center space-y-4 h-full">
              <div className="h-12 lg:h-28 w-auto flex items-start gap-2">
                <img src="/isotipo_tambo 1.svg" alt="logo" className="h-12" />

                <img src="/logotipo 1.svg" alt="tambo" className="h-6" />
              </div>

              <section className="min-h-[50vh] flex flex-col items-center justify-center gap-6">
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold tracking-tight text-[#1a1c1e]">
                    Crear establecimiento*
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Ingresá la información básica de tu establecimiento <br />
                    para comenzar a gestionar la producción.
                  </p>

                  <form className="space-y-4" onSubmit={onSubmit}>
                    <div className="space-y-4">
                      <Label>Nombre del establecimiento*</Label>
                      <Input
                        placeholder="Ingrese el nombre del establecimiento"
                        data-test-id="nombre-establecimiento"
                        {...register('nombre')}
                        disabled={isPending}
                      />
                      {errors.nombre && (
                        <small className="text-red-700">
                          {errors.nombre.message}
                        </small>
                      )}
                    </div>

                    <div className="space-y-4">
                      <Label>Provincia*</Label>
                      <Input
                        placeholder="Ingrese la provincia del establecimiento"
                        data-test-id="provincia"
                        {...register('provincia')}
                        disabled={isPending}
                      />
                      {errors.provincia && (
                        <small className="text-red-700">
                          {errors.provincia.message}
                        </small>
                      )}
                    </div>

                    <div className="space-y-4">
                      <Label>Localidad*</Label>
                      <Input
                        placeholder="Ingrese la localidad del establecimiento"
                        data-test-id="localidad"
                        {...register('localidad')}
                        disabled={isPending}
                      />
                      {errors.localidad && (
                        <small className="text-red-700">
                          {errors.localidad.message}
                        </small>
                      )}

                      {createEstablishmentError && (
                        <small className="text-red-700">
                          {createEstablishmentError.message ||
                            'Error al crear el establecimiento'}
                        </small>
                      )}
                    </div>

                    <Button
                      className="w-full h-14 mt-4"
                      type="submit"
                      data-test-id="comenzar"
                      disabled={isPending}
                    >
                      Comenzar
                      <ArrowRight className="ml-2 size-5" />
                    </Button>
                  </form>
                </div>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
export default Establishment
